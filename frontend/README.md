# Creator Hub - Frontend

Landing page and dashboard interface for Creator Hub, built with React and TypeScript.

## 🚀 Quick Start

```bash
npm install
npm run env:setup    # Setup environment variables
npm run dev
```

Runs at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── pages/           # Page components
├── components/      # Reusable components
├── hooks/           # Custom React hooks
├── services/        # API services
├── config.ts        # Configuration loader
├── utils/           # Utility functions
└── App.tsx         # Main app component
```

## ✨ Features

- ✅ Landing page with hero section
- ✅ Freighter Wallet integration
- ✅ Responsive design (Tailwind CSS)
- ✅ TypeScript support
- ✅ Zero-config setup (Vite)
- ✅ Environment variables configuration
- ✅ API service with interceptors

## 🔗 Wallet Integration

Uses Freighter wallet API for Stellar account connection:

```typescript
import { useFreighterWallet } from './hooks/useFreighter';

const { connected, publicKey, connect } = useFreighterWallet();
```

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Responsive**: Mobile-first approach

## 📦 Available Scripts

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview build locally
npm run lint          # Run ESLint
npm run lint:fix      # Fix linting issues
npm run format        # Format code with Prettier
npm run type-check    # Check TypeScript types
npm run env:setup     # Setup environment variables
npm run env:check     # Verify environment configuration
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
# Copy template to local
npm run env:setup

# Or manually
cp .env.example .env.local

# Edit .env.local with your values
```

See [ENV_VARIABLES.md](./ENV_VARIABLES.md) for detailed documentation on all available variables.

### 3. Start Development Server

```bash
npm run dev
```

Server will open at `http://localhost:5173`

### 4. Test Wallet Connection

- Open the app in your browser
- Click "Connect Wallet" button
- Freighter extension will prompt for permission
- Approve to connect your Stellar wallet

## 🛠️ Development

### Add New Page

```typescript
// src/pages/MyPage.tsx
export default function MyPage() {
  return <div>Page content</div>;
}
```

### Add New Component

```typescript
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}
```

### Add New Hook

```typescript
// src/hooks/useCustom.ts
import { useState } from 'react';

export function useCustom() {
  const [state, setState] = useState(null);
  return { state, setState };
}
```

### Use Configuration

```typescript
import config from '../config';

// Type-safe access to environment variables
console.log(config.apiUrl);          // http://localhost:3001
console.log(config.stellarNetwork);  // 'testnet' | 'public'
console.log(config.debug);           // true/false
```

### Make API Calls

```typescript
import { api } from '../services/api';

// All requests automatically use configured API endpoint
// and include authentication token if available
const tasks = await api.tasks.list();
```

## 📋 Environment Variables

All environment variables are documented in [ENV_VARIABLES.md](./ENV_VARIABLES.md)

### Required Variables for Development

```bash
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STELLAR_NETWORK=testnet
```

### Optional Variables

```bash
REACT_APP_DEBUG=true
REACT_APP_LOG_LEVEL=debug
REACT_APP_ENABLE_NOTIFICATIONS=true
```

## 🔐 Environment Security

- ✅ All vars in `.env.local` are in `.gitignore`
- ✅ Only commit `.env.example` (template)
- ✅ Never commit `.env.local`
- ✅ No secrets in environment variables
- ✅ Use CI/CD platform for production secrets

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Freighter Wallet API](https://docs.freighter.app)
- [Stellar Documentation](https://developers.stellar.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Environment Variables Guide](./ENV_VARIABLES.md)

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) in the root directory.

## 📄 License

Open Source - See LICENSE file
