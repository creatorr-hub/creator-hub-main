# Creator Hub - Stellar Edition

A decentralized platform enabling projects to hire and reward creators using the Stellar blockchain (XLM/USDC).

##  Overview

Creator Hub democratizes talent acquisition and compensation by leveraging blockchain technology. Projects list tasks, creators submit solutions, and winners receive instant payments in XLM or USDC on the Stellar network.

##  Project Structure

```
creator-hub/
├── frontend/              # React/Svelte landing page + wallet integration
├── backend/               # Node.js server + database
├── contracts/             # Stellar smart contracts (Soroban)
├── docs/                  # Documentation
├── PRD.md                 # Product Requirements Document
├── ARCHITECTURE.md        # System architecture
├── CONTRIBUTING.md        # Contribution guidelines
└── README.md             # This file
```

##  Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Stellar CLI (for contract development)
- Freighter Wallet (browser extension)

### Setup

```bash
# Clone repository
git clone <repo-url>
cd creator-hub

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup (in new terminal)
cd backend
npm install
npm run start:dev

# Contract deployment
cd contracts
stellar contract build
```

##  Features (Roadmap)

- [ ] Landing page with wallet connection
- [ ] Project dashboard
- [ ] Task creation and management
- [ ] Creator submission system
- [ ] Blockchain payment integration
- [ ] Admin panel
- [ ] Rating/review system

##  Technology Stack

### Frontend
- React/Astro
- Freighter Wallet SDK
- TailwindCSS

### Backend
- Node.js + Express
- PostgreSQL
- Stellar JS SDK

### Smart Contracts
- Soroban (Rust)
- Stellar Testnet

##  Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:
- Code standards
- Git workflow
- Pull request process
- Issue reporting

##  Documentation

- [PRD.md](./PRD.md) - Detailed product requirements
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design & architecture
- [API.md](./docs/API.md) - Backend API documentation (coming soon)


##  Community

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Discord**: []

---

**Live on Stellar Testnet** - Start building the future of creator economy!
