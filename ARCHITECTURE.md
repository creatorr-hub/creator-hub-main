# System Architecture Document
## Creator Hub - Stellar Blockchain Platform

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
├─────────────────────────────────────────────────────────────────┤
│  React App + Freighter Wallet Integration (Web3)               │
│  - Landing Page                                                  │
│  - Task Discovery Dashboard                                      │
│  - Submission Management UI                                      │
│  - Payment Status Tracker                                        │
└────────────────────────┬──────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌─────────────┐  ┌──────────────────┐
│  REST API    │  │  Freighter  │  │  Stellar JS SDK  │
│  Endpoints   │  │  Wallet SDK │  │  (Read/Write)    │
└──────────────┘  └─────────────┘  └──────────────────┘
        │                                │
        └────────────────┬───────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────────┐ ┌────────────────┐ ┌──────────────────┐
│  Node.js Backend │ │  PostgreSQL DB │ │ Stellar Network  │
│  - Auth Service  │ │  - Projects    │ │ - Smart Contract │
│  - Task Service  │ │  - Creators    │ │ - Account Ledger │
│  - Payment Svc   │ │  - Submissions │ │ - Transaction    │
│  - Verification  │ │  - Payments    │ └──────────────────┘
└──────────────────┘ └────────────────┘
        │
        └─────────────────┬──────────────────┐
                          │                  │
                    ┌─────▼─────┐    ┌──────▼─────────┐
                    │  Soroban   │    │  Stellar API   │
                    │  Contract  │    │  (Horizon)     │
                    │(Escrow/Pay)│    │                │
                    └────────────┘    └────────────────┘
```

---

## 2. Component Architecture

### 2.1 Frontend Layer

**Technology**: React + TypeScript + TailwindCSS

```
frontend/
├── src/
│  ├── pages/
│  │  ├── Landing.tsx        # Home page with wallet connection
│  │  ├── Dashboard.tsx      # Main dashboard
│  │  ├── Tasks.tsx          # Task discovery
│  │  ├── ProjectTasks.tsx   # Project manager view
│  │  └── Profile.tsx        # User profile
│  ├── components/
│  │  ├── WalletConnect.tsx  # Freighter integration
│  │  ├── TaskCard.tsx       # Task display card
│  │  ├── SubmissionForm.tsx # Submission component
│  │  └── WalletStatus.tsx   # Wallet display
│  ├── hooks/
│  │  ├── useFreighter.ts    # Wallet connection hook
│  │  ├── useTasks.ts        # Task data fetching
│  │  └── useStellar.ts      # Stellar blockchain interaction
│  ├── services/
│  │  ├── api.ts             # Backend API calls
│  │  ├── stellar.ts         # Stellar network interaction
│  │  └── auth.ts            # Authentication
│  └── utils/
│     ├── constants.ts       # App constants
│     ├── validators.ts      # Input validation
│     └── formatters.ts      # Data formatting
```

**Key Dependencies:**
```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "@freighterapp/freighter-api": "^latest",
  "stellar-sdk": "^11.0.0",
  "tailwindcss": "^3.0.0",
  "axios": "^1.0.0"
}
```

---

### 2.2 Backend Layer

**Technology**: Node.js + Express + TypeScript + PostgreSQL

```
backend/
├── src/
│  ├── config/
│  │  ├── database.ts        # PostgreSQL connection
│  │  ├── stellar.ts         # Stellar network config
│  │  ├── env.ts             # Environment variables
│  │  └── logger.ts          # Logging setup
│  ├── middleware/
│  │  ├── auth.ts            # JWT verification
│  │  ├── validator.ts       # Request validation
│  │  ├── errorHandler.ts    # Global error handling
│  │  └── rateLimit.ts       # Rate limiting
│  ├── routes/
│  │  ├── auth.ts            # /api/auth
│  │  ├── projects.ts        # /api/projects
│  │  ├── tasks.ts           # /api/tasks
│  │  ├── submissions.ts     # /api/submissions
│  │  ├── payments.ts        # /api/payments
│  │  └── users.ts           # /api/users
│  ├── controllers/
│  │  ├── AuthController.ts
│  │  ├── ProjectController.ts
│  │  ├── TaskController.ts
│  │  ├── PaymentController.ts
│  │  └── UserController.ts
│  ├── models/
│  │  ├── User.ts            # User table schema
│  │  ├── Project.ts         # Project schema
│  │  ├── Task.ts            # Task schema
│  │  ├── Submission.ts      # Submission schema
│  │  └── Payment.ts         # Payment schema
│  ├── services/
│  │  ├── AuthService.ts     # Auth logic
│  │  ├── StellarService.ts  # Stellar network calls
│  │  ├── PaymentService.ts  # Payment processing
│  │  ├── VerificationService.ts # Signature verification
│  │  └── NotificationService.ts # Email/notifications
│  ├── utils/
│  │  ├── validators.ts      # Data validation
│  │  ├── helpers.ts         # Utility functions
│  │  └── constants.ts       # Static constants
│  ├── migrations/           # Database migrations
│  └── app.ts                # Express app setup
```

**Key Dependencies:**
```json
{
  "express": "^4.18.0",
  "typescript": "^5.0.0",
  "pg": "^8.10.0",
  "stellar-sdk": "^11.0.0",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^16.0.0",
  "express-validator": "^7.0.0",
  "cors": "^2.8.5"
}
```

---

### 2.3 Smart Contract Layer

**Technology**: Rust + Soroban + Stellar

```
contracts/
├── src/
│  ├── lib.rs                # Main contract entry point
│  ├── escrow.rs             # Escrow logic (fund holding)
│  ├── payment.rs            # Payment distribution
│  ├── errors.rs             # Error definitions
│  ├── events.rs             # Event emissions
│  └── types.rs              # Custom types
├── Cargo.toml               # Rust dependencies
├── stellar-cli-config.toml  # CLI config
└── README.md                # Contract documentation
```

**Contract Functions:**
```rust
// Create escrow for task (project locks funds)
pub fn create_task_escrow(
    project: Address,
    amount: i128,
    recipient: Address,
) -> Result<(), Error>

// Release payment to winner
pub fn release_payment(
    task_id: u64,
    winner: Address,
) -> Result<(), Error>

// Refund if no winner (optional)
pub fn refund_project(
    task_id: u64,
) -> Result<(), Error>
```

**Key Dependencies:**
```toml
[dependencies]
soroban-sdk = "20.0.0"
soroban-token-sdk = "20.0.0"
```

---

## 3. Data Models

### 3.1 Database Schema (PostgreSQL)

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_key VARCHAR(56) UNIQUE NOT NULL,  -- Stellar public key
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    bio TEXT,
    avatar_url VARCHAR(500),
    role ENUM('creator', 'project', 'admin'),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    website VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tasks Table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    reward_amount DECIMAL(20, 7) NOT NULL,  -- XLM/USDC
    reward_token ENUM('XLM', 'USDC') DEFAULT 'XLM',
    category VARCHAR(50),
    status ENUM('draft', 'active', 'completed', 'cancelled') DEFAULT 'draft',
    deadline TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT reward_positive CHECK (reward_amount > 0)
);

-- Submissions Table
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id),
    creator_id UUID NOT NULL REFERENCES users(id),
    submission_url VARCHAR(500),
    submission_text TEXT,
    status ENUM('submitted', 'accepted', 'rejected') DEFAULT 'submitted',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id),
    recipient_id UUID NOT NULL REFERENCES users(id),
    amount DECIMAL(20, 7) NOT NULL,
    token ENUM('XLM', 'USDC'),
    tx_hash VARCHAR(64),  -- Stellar transaction hash
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    CONSTRAINT amount_positive CHECK (amount > 0)
);
```

---

## 4. API Endpoints

### 4.1 Authentication

```
POST   /api/auth/login           # Sign challenge (Freighter)
POST   /api/auth/verify          # Verify signature
POST   /api/auth/logout          # Logout
GET    /api/auth/me              # Current user
```

### 4.2 Projects

```
GET    /api/projects             # List all projects
POST   /api/projects             # Create project (auth required)
GET    /api/projects/:id         # Get project details
PUT    /api/projects/:id         # Update project (owner)
DELETE /api/projects/:id         # Delete project (owner)
```

### 4.3 Tasks

```
GET    /api/tasks                # List tasks (with filters)
POST   /api/tasks                # Create task (project)
GET    /api/tasks/:id            # Get task details
PUT    /api/tasks/:id            # Update task (project)
DELETE /api/tasks/:id            # Cancel task (project)
GET    /api/tasks/:id/submissions # List submissions
```

### 4.4 Submissions

```
POST   /api/submissions          # Create submission
GET    /api/submissions/:id      # Get submission
PUT    /api/submissions/:id      # Update submission (creator)
POST   /api/submissions/:id/accept # Accept winner (project)
POST   /api/submissions/:id/reject # Reject (project)
```

### 4.5 Payments

```
POST   /api/payments/initiate    # Create payment (calls contract)
GET    /api/payments/:id         # Get payment status
GET    /api/payments/history     # User's payment history
```

---

## 5. Authentication Flow

```
1. User clicks "Connect Wallet"
   ↓
2. Frontend calls Freighter SDK
   ↓
3. Freighter extension opens (user approves)
   ↓
4. Backend requests sign challenge (/auth/login)
   ↓
5. Frontend signs challenge with Freighter
   ↓
6. Frontend sends signature to /auth/verify
   ↓
7. Backend verifies signature using public key
   ↓
8. Backend generates JWT token
   ↓
9. Frontend stores token in localStorage
   ↓
10. All subsequent requests include Authorization header
```

---

## 6. Payment Flow

```
PROJECT              BACKEND              CONTRACT         CREATOR
   │                    │                     │                │
   ├─ Create task ─────>│                     │                │
   │                    ├─ Call contract ────>│ Lock funds      │
   │                    │                     │                │
   │  --- Task Active ---                     │                │
   │                                          │                │
   │                    <─ Creator submits    │                │
   │  --- Creator submits solution            │                │
   │                    │                     │                │
   │  --- Judge winner  │                     │                │
   │  Select winner ───>│                     │                │
   │                    ├─ Call contract ────>├─ Release ─────>│ Receive XLM/USDC
   │                    │ (release_payment)   │                │
   │                    │                     │ funds          │
   │                    <─ Confirm TX ────────┤                │
   │  <─ Payment done ──┤                     │                │
```

---

## 7. Deployment Architecture

### 7.1 Environment: Testnet

```
Frontend (Vercel/Netlify)           Backend (Heroku/Railway)
    ↓                                    ↓
React App ←────→ REST API ←────→ PostgreSQL
    ↓                                    ↓
Freighter SDK ←────→ Stellar Testnet ←────→ Soroban Contract
```

### 7.2 Environment: Mainnet (Future)

```
Frontend (CloudFlare/AWS)           Backend (AWS/GCP)
    ↓                                    ↓
React App ←────→ REST API ←────→ PostgreSQL (RDS)
    ↓                                    ↓
Freighter SDK ←────→ Stellar Mainnet ←────→ Soroban Contract
                                          ↓
                                    S3/Cache Layer
```

---

## 8. Security Considerations

| Layer | Security Measure |
|-------|-----------------|
| **Frontend** | HTTPS only, CSP headers, No private key storage |
| **Backend** | JWT expiration (1hr), Rate limiting, SQL injection prevention |
| **Database** | Encrypted passwords (bcrypt), Read replicas, Backups |
| **Blockchain** | Smart contract audit, Testnet validation, Multi-sig (future) |
| **Secrets** | Environment variables, Vault integration, Rotation |

---

## 9. Scalability Strategy

### Horizontal Scaling
- Backend: Load balancer + multiple instances
- Database: Read replicas + connection pooling
- Frontend: CDN + static site generation

### Caching Strategy
- Redis for session data
- Browser cache for static assets
- Database query caching (future)

---

## 10. Monitoring & Logging

```
Application Logs → CloudWatch/ELK
                ↓
            Dashboard (Grafana)
                ↓
        Alerts (PagerDuty/Slack)

Metrics:
- API response times
- Error rates
- User activity
- Transaction success rate
- Smart contract gas usage
```

---

## 11. Technology Rationale

| Component | Choice | Reason |
|-----------|--------|--------|
| Frontend | React | Large ecosystem, Freighter support |
| Backend | Node.js | Fast development, JS ecosystem |
| Database | PostgreSQL | ACID compliance, JSON support |
| Blockchain | Stellar | Low fees, Fast, XLM/USDC support |
| Contracts | Soroban | Rust safety, Stellar native |

---

## 12. Future Enhancements

- [ ] GraphQL API layer
- [ ] WebSocket support for real-time updates
- [ ] Microservices architecture
- [ ] IPFS integration for file storage
- [ ] Multi-chain bridge (Ethereum, Polygon)
- [ ] Advanced ML-based matching algorithm
