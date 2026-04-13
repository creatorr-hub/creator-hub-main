# Contributing to Creator Hub

Thank you for your interest in contributing to Creator Hub! We welcome developers, designers, and community members to help build the future of decentralized creator economy.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Git Workflow](#git-workflow)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Security](#security)
- [Community Guidelines](#community-guidelines)

---

## 🚀 Getting Started

### Prerequisites

- Git
- Node.js 18.x or higher
- npm or yarn
- PostgreSQL 14+
- Stellar CLI
- Freighter Wallet (for testing)

### Fork & Clone

```bash
# Fork the repository on GitHub

# Clone your fork
git clone https://github.com/YOUR_USERNAME/creator-hub.git
cd creator-hub

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/creator-hub.git
```

---

## 💻 Development Setup

### 1. Install Dependencies

```bash
# Install root dependencies (if any)
npm install

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Smart Contracts
cd ../contracts
npm install
```

### 2. Environment Configuration

```bash
# Backend (.env)
cd backend
cp .env.example .env
# Edit .env with your values:
# DATABASE_URL=postgresql://user:pass@localhost:5432/creator_hub
# JWT_SECRET=your_secret_key
# STELLAR_NETWORK=testnet
# FREE_IGHTER_ENABLED=true

# Frontend (.env.local)
cd ../frontend
cp .env.example .env.local
# Edit .env.local:
# REACT_APP_API_URL=http://localhost:3001
# REACT_APP_STELLAR_NETWORK=testnet
```

### 3. Database Setup

```bash
cd backend
# Create PostgreSQL database
createdb creator_hub

# Run migrations
npm run migrate:latest

# Seed test data (optional)
npm run seed
```

### 4. Start Development Servers

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
# Opens at http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run start:dev
# Running at http://localhost:3001
```

**Terminal 3 - Smart Contract (optional):**
```bash
cd contracts
stellar contract build
stellar contract deploy --network testnet
```

---

## 📝 Code Standards

### TypeScript

We use TypeScript for type safety and better developer experience.

**Types:**
```typescript
// ✅ GOOD - Explicit types
interface User {
  id: string;
  publicKey: string;
  username: string;
  email?: string;
}

// ❌ BAD - Implicit any
function getUser(id) { ... }
```

### File Naming

```
Components:    PascalCase      (UserProfile.tsx)
Hooks:         camelCase       (useFreighter.ts)
Utils:         camelCase       (formatCurrency.ts)
Services:      PascalCase      (AuthService.ts)
Constants:     UPPER_SNAKE     (MAX_FILE_SIZE)
```

### Formatting & Linting

```bash
# Run ESLint
npm run lint

# Fix formatting issues
npm run lint:fix

# Format with Prettier
npm run format
```

**Configuration:**
- ESLint extends `eslint-config-airbnb-typescript`
- Prettier: 2-space indentation, single quotes, semicolons

### Comments & Documentation

```typescript
// ✅ GOOD - Clear, explains WHY not WHAT
// Wallet signature must be verified to prevent CSRF attacks
const isValidSignature = verifySignature(signature, challenge, publicKey);

// ❌ BAD - Obvious/redundant
// Get the user
const user = getUser(id);
```

**JSDoc for complex functions:**

```typescript
/**
 * Verifies Stellar wallet signature
 * @param {string} publicKey - Stellar account public key
 * @param {string} signature - Signed message
 * @param {string} message - Original message
 * @returns {boolean} Verification result
 * @throws {Error} If verification fails
 */
export function verifySignature(
  publicKey: string,
  signature: string,
  message: string
): boolean { ... }
```

### Error Handling

```typescript
// ✅ GOOD - Handle specific errors
try {
  await releasePayment(taskId);
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    throw new Error('Task has insufficient escrow balance');
  }
  throw error;
}

// ❌ BAD - Silent failure
try {
  await releasePayment(taskId);
} catch (error) {
  console.log('Error');
}
```

---

## 🌿 Git Workflow

### Branch Naming

```
feature/wallet-connection      # New feature
fix/payment-calculation        # Bug fix
docs/api-documentation        # Documentation
refactor/database-schema      # Refactoring
test/submission-validation    # Tests
chore/dependency-update       # Maintenance
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(wallet): add Freighter wallet connection
fix(payment): fix XLM decimals calculation
docs(api): update endpoint documentation
refactor(backend): simplify payment service
test(submissions): add validation tests
chore(deps): update stellar-sdk to v11
```

**Commit Message Template:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Creating a Pull Request

1. **Create feature branch:**
   ```bash
   git fetch upstream
   git checkout -b feature/your-feature upstream/main
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat(feature): description"
   ```

3. **Push to your fork:**
   ```bash
   git push origin feature/your-feature
   ```

4. **Create PR on GitHub:**
   - Link any related issues: `Closes #123`
   - Provide clear description
   - Reference architecture decisions

---

## 📬 Pull Request Process

### PR Description Template

```markdown
## Description
Brief summary of changes

## Related Issue
Closes #<issue-number>

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Tested on Testnet

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed my code
- [ ] Added/updated tests
- [ ] No breaking changes
- [ ] Documentation updated
```

### Review Process

1. **Automated Checks:**
   - ESLint passes
   - Tests pass
   - No security vulnerabilities

2. **Code Review:**
   - At least 2 approvals required
   - Maintainers check architecture alignment
   - Security review for blockchain code

3. **Merge:**
   - Squash commits (for feature branches)
   - Delete branch after merge

---

## 🐛 Reporting Issues

### Issue Template

**Title:** Clear, concise description

**Description:**
```markdown
## Environment
- OS: [e.g., macOS 14.6]
- Browser: [e.g., Chrome 125]
- Wallet: [Freighter v1.5.0]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots/Logs
```

### Issue Priority

| Priority | Response Time | Example |
|----------|---|---|
| Critical | 24 hours | Security vulnerability |
| High | 48 hours | Payment failure |
| Medium | 1 week | UI bug |
| Low | 2 weeks | Documentation typo |

---

## 🔐 Security

### Reporting Security Issues

**DO NOT** open a public issue for security vulnerabilities.

Instead, email: security@creatorhub.com

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Security Guidelines

- ✅ Validate all user inputs
- ✅ Never commit secrets or private keys
- ✅ Use parameterized queries (prevent SQL injection)
- ✅ Implement CORS properly
- ✅ Use HTTPS only
- ✅ Rotate sensitive credentials
- ✅ Keep dependencies updated

---

## 🎯 Testing Guidelines

### Unit Tests

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Structure:**
```typescript
describe('PaymentService', () => {
  describe('releasePayment', () => {
    it('should transfer funds to winner', async () => {
      // Arrange
      const taskId = 'task-123';
      const winner = 'GBTCBULKJSDDD...';

      // Act
      const result = await paymentService.releasePayment(taskId, winner);

      // Assert
      expect(result.status).toBe('completed');
      expect(result.recipient).toBe(winner);
    });

    it('should fail if insufficient funds', async () => {
      // Arrange - Setup insufficient balance

      // Act & Assert
      await expect(releasePayment(taskId, winner))
        .rejects
        .toThrow(InsufficientFundsError);
    });
  });
});
```

### Integration Tests

```bash
# Run integration tests (requires testnet)
npm run test:integration
```

### Manual Testing Checklist

- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test wallet connection/disconnection
- [ ] Test on Stellar Testnet
- [ ] Test mobile responsiveness
- [ ] Test slow network (DevTools throttling)

---

## 📚 Documentation

### Code Documentation

- JSDoc for public functions
- README in each folder
- Architecture decisions in ADR format

### Updating Docs

```markdown
# When making changes that affect users/developers:

1. Update relevant .md files
2. Update API documentation if endpoints changed
3. Add migration guide if breaking change
4. Update CHANGELOG.md
```

---

## 🏆 Contribution Types

### Code Contributions
- Features, bug fixes, refactoring
- Smart contract improvements
- Performance optimizations

### Non-Code Contributions
- Documentation
- Design/UI improvements
- Community support
- Bug reports
- Feature suggestions

### Recognition

Contributors are recognized in:
- CONTRIBUTORS.md
- GitHub releases
- Community channels (Discord/Twitter)

---

## 📞 Getting Help

- **Discord**: [Join Community](https://discord.gg/creatorhub)
- **Discussions**: GitHub Discussions
- **Issues**: Create GitHub issue with `[HELP]` tag
- **Team**: Reach out to maintainers

---

## 📄 Development Tips

### Debugging

**Backend:**
```bash
# Enable debug logging
DEBUG=creator-hub:* npm run start:dev

# Use Node debugger
node --inspect-brk src/app.ts
```

**Frontend:**
```bash
# React DevTools browser extension
# Check console for warnings in development
```

**Smart Contracts:**
```bash
# Use Stellar's local sandbox
docker pull stellar/quickstart:latest
docker run --rm -it -p 8000:8000 stellar/quickstart:latest /start testnet
```

### Common Issues

**Issue:** `EACCES: permission denied`
```bash
# Solution: Use sudo or fix npm permissions
npm install -g npm
```

**Issue:** `DATABASE_URL not found`
```bash
# Solution: Create .env file and add DATABASE_URL
cp .env.example .env
```

---

## 🎓 Learning Resources

- [Stellar Documentation](https://developers.stellar.org)
- [Soroban Development](https://soroban.stellar.org)
- [Freighter Wallet API](https://docs.freighter.app)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 📊 Contribution Statistics

Track your contributions:
```bash
# See your commits
git log --author="YOUR_NAME" --oneline

# See your PR count
# Visit: https://github.com/OWNER/creator-hub/pulls?q=author:YOUR_USERNAME
```

---

## 🙏 Code of Conduct

All participants must follow our [Code of Conduct](./CODE_OF_CONDUCT.md):

- Be respectful and inclusive
- No harassment or discrimination
- Constructive criticism only
- Report violations to: conduct@creatorhub.com

---

## 📝 License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

---

**Thank you for contributing to Creator Hub! 🚀**

For more questions, reach out to the maintainers or community.
