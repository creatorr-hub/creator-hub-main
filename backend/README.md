# Creator Hub - Backend API

RESTful API backend for Creator Hub built with Node.js, Express, and TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
npm run migrate:latest

# Start dev server
npm run dev
```

Runs at `http://localhost:3001`

## 📁 Project Structure

```
src/
├── config/           # Configuration files
│  ├── database.ts   # PostgreSQL config
│  └── stellar.ts    # Stellar network config
├── routes/          # API routes (coming soon)
├── controllers/     # Request handlers (coming soon)
├── services/        # Business logic (coming soon)
├── models/          # Data models (coming soon)
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── migrations/      # Database migrations
├── app.ts          # Express app setup
└── types.ts        # TypeScript types
```

## ⚙️ Configuration

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `STELLAR_NETWORK` - testnet or mainnet
- `JWT_SECRET` - Secret key for JWT tokens

## 📦 Available Scripts

```bash
npm run dev           # Start dev server with hot reload
npm run build         # Build TypeScript
npm run start         # Run production build
npm run lint          # Run ESLint
npm run lint:fix      # Fix linting issues
npm run format        # Format code
npm run migrate:latest # Run database migrations
npm run seed          # Seed test data
npm run test          # Run tests
npm run test:coverage # Test coverage report
```

## 🗄️ Database

### Schema Overview

- **users**: Stellar wallet accounts
- **projects**: Project/organization profiles
- **tasks**: Posted job tasks
- **submissions**: Creator submissions
- **payments**: Payment transactions

### Initialize Database

```bash
npm run migrate:latest
npm run seed  # Optional: seed sample data
```

## 🔐 Authentication

- Freighter wallet signature verification
- JWT token-based session management
- Public key stored as user ID

```typescript
// Request header
Authorization: Bearer <JWT_TOKEN>
```

## 📚 API Endpoints

### Authentication
```
POST   /api/v1/auth/login          # Request challenge
POST   /api/v1/auth/verify         # Verify signature
```

### Projects
```
GET    /api/v1/projects            # List projects
POST   /api/v1/projects            # Create project
GET    /api/v1/projects/:id        # Get project
PUT    /api/v1/projects/:id        # Update project
DELETE /api/v1/projects/:id        # Delete project
```

### Tasks
```
GET    /api/v1/tasks               # List tasks
POST   /api/v1/tasks               # Create task
GET    /api/v1/tasks/:id           # Get task
PUT    /api/v1/tasks/:id           # Update task
DELETE /api/v1/tasks/:id           # Cancel task
```

### Submissions
```
POST   /api/v1/submissions         # Create submission
GET    /api/v1/submissions/:id     # Get submission
PUT    /api/v1/submissions/:id     # Update submission
```

### Payments
```
POST   /api/v1/payments/initiate   # Create payment
GET    /api/v1/payments/:id        # Get payment status
```

## 🧪 Testing

```bash
npm run test              # Run all tests
npm run test:coverage     # Generate coverage report
```

## 🛠️ Development Tips

### Debug Mode

```bash
DEBUG=creator-hub:* npm run dev
```

### Database Queries

Enable query logging:

```bash
DEBUG=true npm run dev
```

### Common Issues

**Database connection error:**
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL is correct
```

**Port already in use:**
```bash
# Change PORT in .env
# Or kill process on port 3001: lsof -i :3001
```

## 📚 Resources

- [Express Documentation](https://expressjs.com)
- [Stellar SDK](https://developers.stellar.org/docs/building-apps/js-sdk)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) in the root directory.

## 📄 License

Open Source - See LICENSE file
