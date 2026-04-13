# Creator Hub - Project Overview

## 🎯 Vision

Creator Hub is a decentralized platform on the Stellar blockchain that enables projects and organizations to post creative tasks and instantly reward creators with XLM or USDC, removing intermediaries and enabling frictionless global collaboration.

---

## 📊 Project Structure

```
creator-hub/
│
├── 📋 Documentation
│  ├── README.md                 # Project overview
│  ├── PRD.md                    # Product requirements
│  ├── ARCHITECTURE.md           # System design
│  └── CONTRIBUTING.md           # Contribution guidelines
│
├── 🎨 Frontend (React)
│  ├── src/
│  │  ├── pages/Landing.tsx     # Landing page with wallet integration
│  │  ├── components/           # Reusable UI components
│  │  ├── hooks/useFreighter.ts # Freighter wallet hook
│  │  └── utils/formatters.ts   # Utility functions
│  ├── package.json
│  └── README.md
│
├── 🔧 Backend (Node.js)
│  ├── src/
│  │  ├── app.ts                # Express server
│  │  ├── config/
│  │  │  ├── database.ts        # PostgreSQL setup
│  │  │  └── stellar.ts         # Stellar network config
│  │  ├── routes/               # API routes (coming soon)
│  │  ├── controllers/          # Request handlers (coming soon)
│  │  └── services/             # Business logic (coming soon)
│  ├── package.json
│  ├── .env.example
│  └── README.md
│
├── 📡 Smart Contracts (Rust/Soroban)
│  ├── src/lib.rs               # Contract implementation
│  ├── Cargo.toml               # Rust dependencies
│  ├── stellar-cli-config.toml
│  └── README.md
│
├── .gitignore
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Rust & Cargo (for contracts)
- Stellar CLI
- Freighter Wallet (browser extension)

### Installation & Setup

**1. Clone repository:**
```bash
git clone https://github.com/OWNER/creator-hub.git
cd creator-hub
```

**2. Install all dependencies:**
```bash
npm run install-all
```

Or manually:
```bash
# Root
npm install

# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install

# Contracts
cd ../contracts && cargo build
```

**3. Configure backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your PostgreSQL connection details
```

**4. Start development servers:**

Terminal 1 (Frontend):
```bash
cd frontend
npm run dev
# http://localhost:5173
```

Terminal 2 (Backend):
```bash
cd backend
npm run dev
# http://localhost:3001
```

Terminal 3 (Contracts - Optional):
```bash
cd contracts
stellar contract build
```

---

## 📋 Current Status

### ✅ Completed

- Project structure and configuration
- Landing page with hero section
- Freighter Wallet integration components
- PostgreSQL database schema and config
- Stellar network configuration
- Basic Soroban smart contract
- Comprehensive documentation (PRD, Architecture, Contributing)
- Environment setup files

### 🔄 In Progress / Planned

**Backend Routes & Controllers:**
- [ ] Authentication endpoints
- [ ] Project management endpoints
- [ ] Task creation & management
- [ ] Submission handling
- [ ] Payment processing

**Smart Contract Features:**
- [ ] Token transfer functionality
- [ ] Multi-sig support
- [ ] Event emissions
- [ ] Security audits

**Frontend Features:**
- [ ] Dashboard pages
- [ ] Task discovery & filtering
- [ ] Submission forms
- [ ] Payment status tracker
- [ ] User profiles

**Testing & Deployment:**
- [ ] Unit tests
- [ ] Integration tests
- [ ] Testnet deployment
- [ ] Mainnet readiness

---

## 🏗️ Architecture Highlights

### Frontend Stack
- **Framework**: React 18 + TypeScript
- **Styling**: TailwindCSS
- **Web3**: Freighter Wallet SDK, Stellar JS SDK
- **Build Tool**: Vite

### Backend Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + Freighter signature verification
- **Blockchain**: Stellar SDK

### Smart Contracts
- **Language**: Rust
- **Platform**: Soroban (Stellar smart contracts)
- **Features**: Escrow management, Payment distribution
- **Network**: Stellar Testnet → Mainnet

---

## 🔐 Security Features

- ✅ Freighter wallet-based authentication
- ✅ Signature verification for transactions
- ✅ Smart contract authorization checks
- ✅ PostgreSQL for secure data storage
- ✅ JWT token management
- ✅ CORS & Helmet middleware
- ⚠️ TODO: Smart contract security audit
- ⚠️ TODO: Rate limiting & DDoS protection

---

## 💰 Monetization Plan (Future)

- **Platform Fee**: 2-5% on successful transactions
- **Premium Features**: Creator verification badges, priority listing
- **Enterprise Plans**: Custom integrations, bulk API access

---

## 📈 Success Metrics (6-month targets)

- 500+ active creators
- 100+ active projects
- 1,000+ tasks posted
- $50K+ total transaction volume
- 50% creator return rate

---

## 🌐 Network & Deployment

### Testnet (Current)
- Frontend: Local dev server
- Backend: Local dev server
- Contracts: Stellar Testnet
- Database: Local PostgreSQL

### Mainnet (Future)
- Frontend: Vercel/Netlify/CloudFlare
- Backend: AWS/GCP/Railway
- Contracts: Stellar Mainnet
- Database: AWS RDS/CloudSQL

---

## 📚 Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `PRD.md` | Product requirements & features |
| `ARCHITECTURE.md` | System design & technical decisions |
| `CONTRIBUTING.md` | Developer contribution guidelines |
| `frontend/src/pages/Landing.tsx` | Main landing page UI |
| `frontend/src/hooks/useFreighter.ts` | Wallet connection logic |
| `backend/src/config/database.ts` | PostgreSQL connection & schema |
| `backend/src/config/stellar.ts` | Stellar network integration |
| `contracts/src/lib.rs` | Soroban smart contract |

---

## 🔗 Important Links

- **Stellar Docs**: https://developers.stellar.org
- **Soroban SDK**: https://soroban.stellar.org
- **Freighter API**: https://docs.freighter.app
- **React**: https://react.dev
- **Express**: https://expressjs.com

---

## 👥 Team Roles (To be Filled)

- **Product Manager**: Define features and priorities
- **Backend Lead**: Oversee API development
- **Frontend Lead**: UI/UX and React implementation
- **Contract Engineer**: Smart contract development
- **Security Lead**: Security reviews and audits
- **DevOps/Infrastructure**: Deployment and monitoring

---

## 📞 Communication

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: [Your Email]
- **Discord**: [Coming Soon]
- **Twitter**: [Coming Soon]

---

## 📄 License

Open Source - [Choose License - Suggested: MIT or Apache 2.0]

---

## 🙏 Acknowledgments

- Stellar Foundation for blockchain infrastructure
- Freighter team for wallet SDK
- Open source community

---

**Last Updated**: April 13, 2026
**Next Review**: May 13, 2026

For detailed technical specifications, see `ARCHITECTURE.md`
For feature requirements, see `PRD.md`
For contribution guidelines, see `CONTRIBUTING.md`
