# Frontend Environment Variables Guide

## 📋 Overview

Environment variables are used to configure the frontend application for different environments (development, staging, production). They control API endpoints, feature flags, and application behavior.

---

## 🚀 Quick Setup

```bash
# Use the setup script
npm run env:setup

# Or manually copy
cp .env.example .env.local

# Verify configuration
npm run env:check
```

---

## 📝 Required Variables

### API Configuration

#### `REACT_APP_API_URL`
- **Description**: Base URL for the backend API
- **Type**: `string`
- **Default**: `http://localhost:3001`
- **Example**:
  - Development: `http://localhost:3001`
  - Production: `https://api.creatorhub.com`

#### `REACT_APP_API_BASE_URL`
- **Description**: Full API endpoint path (usually `{API_URL}/api/v1`)
- **Type**: `string`
- **Default**: `http://localhost:3001/api/v1`
- **Auto-generated from**: `REACT_APP_API_URL`

#### `REACT_APP_API_TIMEOUT`
- **Description**: API request timeout in milliseconds
- **Type**: `number`
- **Default**: `30000` (30 seconds)
- **Example**: `30000`

---

### Stellar Network Configuration

#### `REACT_APP_STELLAR_NETWORK`
- **Description**: Stellar network to connect to
- **Type**: `'testnet' | 'public'`
- **Default**: `testnet`
- **Options**:
  - `testnet` - For development and testing
  - `public` - For production (mainnet)

#### `REACT_APP_FREIGHTER_ENABLED`
- **Description**: Enable/disable Freighter wallet integration
- **Type**: `boolean`
- **Default**: `true`
- **Example**: `REACT_APP_FREIGHTER_ENABLED=true`

---

## 📦 Optional Variables

### Application Info

#### `REACT_APP_APP_NAME`
- **Description**: Application name
- **Type**: `string`
- **Default**: `Creator Hub`

#### `REACT_APP_APP_VERSION`
- **Description**: Application version
- **Type**: `string`
- **Default**: `0.1.0`

---

### Debug & Logging

#### `REACT_APP_DEBUG`
- **Description**: Enable debug mode
- **Type**: `boolean`
- **Default**: `false` (production), `true` (development)
- **When enabled**:
  - Console logs environment configuration
  - Detailed error messages
  - Verbose API logging

#### `REACT_APP_LOG_LEVEL`
- **Description**: Logging verbosity level
- **Type**: `'debug' | 'info' | 'warn' | 'error'`
- **Default**: `info`
- **Options**:
  - `debug` - Most verbose (development)
  - `info` - Normal operations
  - `warn` - Warnings only
  - `error` - Only errors

---

### Feature Flags

#### `REACT_APP_ENABLE_NOTIFICATIONS`
- **Description**: Enable toast/push notifications
- **Type**: `boolean`
- **Default**: `false`

#### `REACT_APP_ENABLE_ANALYTICS`
- **Description**: Enable analytics tracking (e.g., Google Analytics)
- **Type**: `boolean`
- **Default**: `false`

---

### Timeouts

#### `REACT_APP_TRANSACTION_TIMEOUT`
- **Description**: Stellar transaction timeout in milliseconds
- **Type**: `number`
- **Default**: `120000` (2 minutes)
- **Note**: Stellar transactions can take time, increase for slower networks

---

### Cache Configuration

#### `REACT_APP_CACHE_ENABLED`
- **Description**: Enable response caching
- **Type**: `boolean`
- **Default**: `true`

#### `REACT_APP_CACHE_TTL`
- **Description**: Cache time-to-live in seconds
- **Type**: `number`
- **Default**: `3600` (1 hour)

---

### Payment Configuration

#### `REACT_APP_DEFAULT_PAYMENT_TOKEN`
- **Description**: Default payment currency
- **Type**: `'XLM' | 'USDC'`
- **Default**: `XLM`
- **Options**:
  - `XLM` - Stellar Lumens
  - `USDC` - USD Coin

#### `REACT_APP_MIN_PAYMENT_AMOUNT`
- **Description**: Minimum payment amount (in base units)
- **Type**: `number`
- **Default**: `1`
- **Note**: 1 XLM = 10,000,000 stroops

#### `REACT_APP_MAX_PAYMENT_AMOUNT`
- **Description**: Maximum payment amount (in base units)
- **Type**: `number`
- **Default**: `1000000`

---

## 🔧 Environment-Specific Examples

### Development (.env.local)

```bash
# Development configuration
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STELLAR_NETWORK=testnet
REACT_APP_DEBUG=true
REACT_APP_LOG_LEVEL=debug
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_CACHE_TTL=600
```

### Staging (.env.staging)

```bash
# Staging configuration
REACT_APP_API_URL=https://api-staging.creatorhub.com
REACT_APP_STELLAR_NETWORK=testnet
REACT_APP_DEBUG=false
REACT_APP_LOG_LEVEL=info
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_CACHE_TTL=3600
```

### Production (.env.production)

```bash
# Production configuration
REACT_APP_API_URL=https://api.creatorhub.com
REACT_APP_STELLAR_NETWORK=public
REACT_APP_DEBUG=false
REACT_APP_LOG_LEVEL=warn
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_TRANSACTION_TIMEOUT=180000
```

---

## 💻 Using Environment Variables in Code

### In React Components

```typescript
// Import config (recommended)
import config from '../config';

export function MyComponent() {
  return (
    <div>
      <p>Network: {config.stellarNetwork}</p>
      <p>API: {config.apiUrl}</p>
    </div>
  );
}
```

### Direct Access (not recommended)

```typescript
// Using process.env directly
const apiUrl = process.env.REACT_APP_API_URL;
const network = process.env.REACT_APP_STELLAR_NETWORK;
```

### With API Service

```typescript
import { api } from '../services/api';

// Automatically uses REACT_APP_API_BASE_URL
api.tasks.list().then(tasks => {
  console.log('Tasks:', tasks);
});
```

---

## ⚠️ Important Notes

### Security

- ❌ **Never commit `.env.local`** - Only commit `.env.example`
- ❌ **Never add secrets** - No API keys, private keys, or passwords
- ✅ **Use `.gitignore`** - Ensure `.env.local` is in `.gitignore`
- ✅ **Use CI/CD secrets** - Store production secrets in your CI/CD platform

### Vite Specifics

- All variables must start with `REACT_APP_` to be included in the build
- Variables are injected at build time (not runtime)
- Only `REACT_APP_*` and `VITE_*` variables are available
- Changes to `.env.local` require dev server restart

### Type Safety

Use the config file for type-safe access:

```typescript
// ✅ Type-safe - TypeScript knows the type
import config from './config';
const network: 'testnet' | 'public' = config.stellarNetwork;

// ❌ Not type-safe
const network = process.env.REACT_APP_STELLAR_NETWORK; // type: string | undefined
```

---

## 🔍 Validation

The `config.ts` file validates and provides defaults for all variables:

```typescript
// Environment variables are validated in src/config.ts
// and defaults are applied if not provided

// Example: If REACT_APP_STELLAR_NETWORK is not set
// it defaults to 'testnet'
```

---

## 📋 Troubleshooting

### Variable not showing up in component?

```bash
# 1. Make sure variable name starts with REACT_APP_
# ✅ REACT_APP_API_URL
# ❌ API_URL

# 2. Restart dev server
npm run dev

# 3. Check .env.local exists
ls -la frontend/.env.local
```

### API calls to wrong endpoint?

```bash
# 1. Verify REACT_APP_API_URL in .env.local
cat .env.local | grep REACT_APP_API_URL

# 2. Check console for config log in debug mode
# Look for: 🔧 Creator Hub Frontend Configuration

# 3. Test API is running
curl http://localhost:3001/health
```

### Freighter not connecting?

```bash
# 1. Check if Freighter extension is installed
# Chrome: chrome://extensions/

# 2. Verify REACT_APP_FREIGHTER_ENABLED=true
cat .env.local | grep FREIGHTER

# 3. Check browser console (F12) for errors
```

---

## 🚀 Deployment

### Vercel

```bash
# Set environment variables in Vercel dashboard
# Settings → Environment Variables

REACT_APP_API_URL=https://api.creatorhub.com
REACT_APP_STELLAR_NETWORK=public
```

### Docker

```dockerfile
FROM node:18
ENV REACT_APP_API_URL=https://api.creatorhub.com
ENV REACT_APP_STELLAR_NETWORK=public
# ... rest of Dockerfile
```

### GitHub Actions

```yaml
env:
  REACT_APP_API_URL: https://api.creatorhub.com
  REACT_APP_STELLAR_NETWORK: public
```

---

## 📚 Related Files

- `src/config.ts` - Configuration loader and validator
- `src/services/api.ts` - API service using config
- `.env.example` - Environment variables template
- `.env.local` - Your local development variables (not in Git)

---

## ✅ Checklist Before Deploying

- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.example` is committed to Git
- [ ] Production values set in deployment platform
- [ ] `REACT_APP_STELLAR_NETWORK` set to `public` for mainnet
- [ ] All `REACT_APP_*` variables have correct values
- [ ] No secrets in environment variables
- [ ] Dev server restarted after `.env.local` changes

---

For more information, see:
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Create React App ENV Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Project Configuration](../src/config.ts)
