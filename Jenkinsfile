pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    BACKEND_IMAGE = "sentrax-backend:${env.BUILD_NUMBER}"
    CLIENT_IMAGE = "sentrax-client:${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      parallel {
        stage('Backend Install') {
          steps {
            dir('backend') {
              sh 'npm ci'
            }
          }
        }

        stage('Client Install') {
          steps {
            dir('client') {
              sh 'npm ci'
            }
          }
        }
      }
    }

    stage('Code Quality') {
      parallel {
        stage('Backend Optional Checks') {
          steps {
            dir('backend') {
              script {
                runNpmScriptIfExists('lint')
                runNpmScriptIfExists('test')
              }
            }
          }
        }

        stage('Client Lint + Build') {
          steps {
            dir('client') {
              sh 'npm run lint'
              sh 'npm run build'
            }
          }
        }
      }
    }

    stage('Dependency Audit') {
      parallel {
        stage('Backend Audit') {
          steps {
            dir('backend') {
              sh 'npm audit --omit=dev --audit-level=high'
            }
          }
        }

        stage('Client Audit') {
          steps {
            dir('client') {
              sh 'npm audit --omit=dev --audit-level=high'
            }
          }
        }
      }
    }

    stage('Filesystem Vulnerability + Secret Scan') {
      steps {
        script {
          if (commandExists('trivy')) {
            sh '''
              trivy fs \
                --scanners vuln,secret,misconfig \
                --severity HIGH,CRITICAL \
                --exit-code 1 \
                --format table \
                .
            '''
          } else {
            echo 'Trivy is not installed on this Jenkins agent. Skipping filesystem scan and marking build UNSTABLE.'
            currentBuild.result = 'UNSTABLE'
          }
        }
      }
    }

    stage('Build Container Images') {
      steps {
        script {
          if (commandExists('docker')) {
            sh "docker build -t ${env.BACKEND_IMAGE} backend"
            sh "docker build -t ${env.CLIENT_IMAGE} client"
          } else {
            echo 'Docker is not installed on this Jenkins agent. Skipping image build and marking build UNSTABLE.'
            currentBuild.result = 'UNSTABLE'
          }
        }
      }
    }

    stage('Container Image Scan') {
      steps {
        script {
          if (commandExists('docker') && commandExists('trivy')) {
            sh "trivy image --severity HIGH,CRITICAL --exit-code 1 ${env.BACKEND_IMAGE}"
            sh "trivy image --severity HIGH,CRITICAL --exit-code 1 ${env.CLIENT_IMAGE}"
          } else {
            echo 'Docker and/or Trivy are missing. Skipping image scan and marking build UNSTABLE.'
            currentBuild.result = 'UNSTABLE'
          }
        }
      }
    }
  }

  post {
    always {
      cleanWs(deleteDirs: true, notFailBuild: true)
    }
  }
}

def runNpmScriptIfExists(String scriptName) {
  if (npmScriptExists(scriptName)) {
    sh "npm run ${scriptName}"
  } else {
    echo "npm script '${scriptName}' not found. Skipping."
  }
}

def npmScriptExists(String scriptName) {
  return sh(
    script: "node -e \"const p=require('./package.json'); process.exit((p.scripts && p.scripts['${scriptName}']) ? 0 : 1)\"",
    returnStatus: true
  ) == 0
}

def commandExists(String commandName) {
  return sh(script: "command -v ${commandName} >/dev/null 2>&1", returnStatus: true) == 0
}
