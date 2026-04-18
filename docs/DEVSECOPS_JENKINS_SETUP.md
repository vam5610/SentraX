# DevSecOps with Jenkins for SentraX

This project now includes a Jenkins-based DevSecOps pipeline via `Jenkinsfile`.

## What Was Added

- `Jenkinsfile` at repository root:
  - install dependencies for backend and client
  - run quality checks
  - run `npm audit` (high/critical fail)
  - run Trivy filesystem scan (vulnerabilities, secrets, misconfig)
  - build backend/client Docker images
  - run Trivy image scan (high/critical fail)
- `backend/Dockerfile` (non-root runtime image)
- `client/Dockerfile` + `client/nginx.conf` (production static hosting)
- `.dockerignore` for smaller, cleaner image builds

## Prerequisites

Minimum (required):

1. Jenkins server (LTS recommended)
2. Git installed on Jenkins agent
3. Node.js 22.x and npm on Jenkins agent
4. Docker installed on Jenkins agent (or Docker-in-Docker setup)
5. Trivy installed on Jenkins agent

Optional but recommended:

1. SonarQube server for code quality gate
2. OWASP Dependency-Check plugin
3. Container registry (Docker Hub, GHCR, ECR) for image push
4. Kubernetes cluster for deployment stage

## Accounts: Do You Need to Create Any?

Required accounts:

1. Source code host account (GitHub/GitLab/Bitbucket) so Jenkins can clone your repo.
2. Jenkins user/admin account (or local Jenkins admin).

Optional accounts (only if you use these integrations):

1. Docker Hub/GHCR/ECR account if you plan to push images.
2. SonarCloud/SonarQube user if you add Sonar analysis.
3. Cloud account (AWS/Azure/GCP) only if deploying there.

You can run the current pipeline locally on Jenkins without Docker Hub or cloud accounts.

## Jenkins Job Setup (Simple)

1. Create a **Pipeline** job in Jenkins.
2. Point it to this repository.
3. Use `Jenkinsfile` from SCM.
4. Trigger build.

If using GitHub webhooks:

1. Add webhook in GitHub repo: `http://<jenkins-url>/github-webhook/`
2. Enable "GitHub hook trigger for GITScm polling" in Jenkins job.

## Credentials to Configure in Jenkins (as needed)

1. `git-credentials` for private repos
2. `docker-registry-credentials` for image push
3. cloud/kube credentials for deployment stage

## Suggested Next Upgrade

1. Add backend unit/integration tests and expose them via `npm test`.
2. Add SAST (Semgrep) stage.
3. Add IaC scan stage if you add Terraform/Kubernetes manifests.
4. Add a deployment stage (Helm/K8s) with approval gates.

## Local Validation Commands

Run from repository root:

```bash
# backend
cd backend && npm ci && npm audit --omit=dev --audit-level=high

# client
cd ../client && npm ci && npm run lint && npm run build && npm audit --omit=dev --audit-level=high

# docker build
cd ..
docker build -t sentrax-backend:local backend
docker build -t sentrax-client:local client

# trivy scan
trivy fs --scanners vuln,secret,misconfig --severity HIGH,CRITICAL --exit-code 1 .
trivy image --severity HIGH,CRITICAL --exit-code 1 sentrax-backend:local
trivy image --severity HIGH,CRITICAL --exit-code 1 sentrax-client:local
```