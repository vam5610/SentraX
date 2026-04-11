# 🔐 SentraX – Zero Trust Security Simulation Platform

## 🧠 Overview

**CipherGate** is a cloud-native, microservices-based **Zero Trust Security Simulation Platform** designed to demonstrate how modern systems detect, validate, and block malicious database activities in real-time.

It provides an **interactive attack lab**, **live monitoring dashboard**, and **risk analysis engine**, allowing users to simulate real-world cyber attacks and observe how a zero-trust architecture handles them.

---

## 🎯 Why This Project?

Traditional systems:

* Allow direct DB access ❌
* Lack real-time monitoring ❌
* Cannot detect advanced attacks ❌

CipherGate solves this by:

✔ Enforcing **Zero Trust principles**
✔ Routing all queries through a **secure proxy layer**
✔ Detecting threats using a **risk engine**
✔ Providing **real-time visibility** via dashboard

---

## 🏗️ Architecture (High-Level)

```
Frontend (React + shadcn UI)
        ↓
API Gateway
        ↓
-----------------------------------------
|         Backend Microservices         |
|---------------------------------------|
| Auth Service       (JWT)              |
| Proxy Service ⭐   (Core Engine)      |
| Policy Engine      (RBAC/ABAC)        |
| Risk Engine        (Threat Detection) |
| Logging Service    (Audit Logs)       |
-----------------------------------------
        ↓
PostgreSQL Database (via Prisma ORM)
```

---

## 🔄 Request Flow

```
User Action (Attack Lab)
        ↓
API Call (/proxy/execute)
        ↓
Proxy Service
   ├── JWT Validation
   ├── Policy Check
   ├── Query Parsing
   ├── Risk Analysis
        ↓
Allowed → Execute Query
Blocked → Reject Request
        ↓
Log Stored
        ↓
Dashboard Updates
```

---

## 🧩 Frontend Architecture

### ⚛️ Tech Stack

* React (Vite)
* Tailwind CSS
* shadcn/ui
* Recharts / Chart.js

---

### 🖥️ UI Modules

#### 🧪 Attack Lab

* Simulate:

  * SQL Injection
  * Mass Delete
  * Brute Force
  * Normal Queries
* Custom query input
* Generates system traffic

---

#### 📡 Live Monitor (Logs)

* Real-time logs table
* Shows:

  * Action
  * Status (ALLOWED / BLOCKED)
  * Risk level
* Auto-refresh

---

#### 📊 Dashboard Analytics

* Total queries
* Blocked attacks
* Active users
* Risk distribution charts

---

#### 🔐 Admin / Policy Control

* Manage roles (Admin/User)
* Define permissions
* Enforce access rules

---

## ⚙️ Backend Architecture

### 🧠 Core Tech Stack

* Node.js (Express)
* PostgreSQL
* Prisma ORM
* JWT Authentication
* Rate Limiting Middleware

---

### 🧩 Microservices

---

#### 🔐 Auth Service

* Login / Register
* JWT generation & validation

---

#### ⭐ Proxy Service (CORE)

* Main entry point
* Endpoint: `/proxy/execute`
* Responsibilities:

  * Validate JWT
  * Parse queries
  * Call policy engine
  * Apply security checks
  * Forward safe queries to DB

---

#### 🧠 Policy Engine

* Implements:

  * RBAC (Role-Based Access Control)
  * ABAC (Attribute-Based)
* Example:

  * User → SELECT only
  * Admin → Full access

---

#### ⚠️ Risk Engine

* Detects threats based on query patterns

Example rules:

```
DROP TABLE → HIGH
DELETE without WHERE → HIGH
OR 1=1 → CRITICAL
SELECT → LOW
```

---

#### 📜 Logging Service

* Stores all activity
* Fields:

  * User
  * Action
  * Status
  * Risk
  * Timestamp

---

## 🗄️ Database Design

### Users Table

* id
* name
* email
* password
* role

---

### Logs Table

* id
* userId
* action
* status
* riskLevel
* timestamp

---

## 🔐 Security Features

✔ Zero Trust Architecture
✔ JWT Authentication
✔ Query Validation
✔ SQL Injection Detection
✔ Role-Based Access Control
✔ Rate Limiting
✔ Full Audit Logging

---

## ☁️ Cloud-Native Features

* Microservices architecture
* Scalable services
* API-based communication
* Container-ready (Docker)

---

## 🚀 Key Features

* Interactive Attack Simulation 🧪
* Real-time Monitoring 📡
* Threat Detection Engine 🚨
* Risk Analysis Dashboard 📊
* Secure Proxy-based DB Access 🔐

---

## 🎤 How to Explain in Viva

> “CipherGate is a zero-trust security simulation platform where all database interactions are routed through a secure proxy. It validates user identity, enforces policies, detects threats using a risk engine, and provides real-time monitoring and analysis through an interactive dashboard.”

---

## 📦 Installation (Basic)

### Backend

```
npm install
npx prisma migrate dev
npm run dev
```

---

### Frontend

```
npm install
npm run dev
```

---

## 🧠 Future Enhancements

* AI-based anomaly detection
* Real-time WebSocket updates
* Multi-database support
* Kubernetes deployment
* Advanced policy editor

---

## 🏁 Conclusion

CipherGate demonstrates how modern systems implement **Zero Trust security**, combining:

* Secure architecture
* Real-time monitoring
* Intelligent threat detection

It is designed as a **production-inspired system**, not just a demo.

---

## 👨‍💻 Author

Karthik Vamsi
