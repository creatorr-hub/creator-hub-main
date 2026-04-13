/**
 * Frontend Environment Configuration
 * Central place to access all environment variables
 */

interface AppConfig {
  // API
  apiUrl: string;
  apiBaseUrl: string;
  apiTimeout: number;

  // Stellar
  stellarNetwork: 'testnet' | 'public';
  freighterEnabled: boolean;

  // App
  appName: string;
  appVersion: string;
  debug: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';

  // Features
  enableNotifications: boolean;
  enableAnalytics: boolean;

  // Timeouts
  transactionTimeout: number;

  // Cache
  cacheEnabled: boolean;
  cacheTTL: number;

  // Payment
  defaultPaymentToken: 'XLM' | 'USDC';
  minPaymentAmount: number;
  maxPaymentAmount: number;
}

/**
 * Load and validate configuration
 */
function loadConfig(): AppConfig {
  return {
    // API
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1',
    apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10),

    // Stellar
    stellarNetwork: (process.env.REACT_APP_STELLAR_NETWORK as 'testnet' | 'public') || 'testnet',
    freighterEnabled: process.env.REACT_APP_FREIGHTER_ENABLED !== 'false',

    // App
    appName: process.env.REACT_APP_APP_NAME || 'Creator Hub',
    appVersion: process.env.REACT_APP_APP_VERSION || '0.1.0',
    debug: process.env.REACT_APP_DEBUG === 'true',
    logLevel: (process.env.REACT_APP_LOG_LEVEL as any) || 'info',

    // Features
    enableNotifications: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',

    // Timeouts
    transactionTimeout: parseInt(process.env.REACT_APP_TRANSACTION_TIMEOUT || '120000', 10),

    // Cache
    cacheEnabled: process.env.REACT_APP_CACHE_ENABLED !== 'false',
    cacheTTL: parseInt(process.env.REACT_APP_CACHE_TTL || '3600', 10),

    // Payment
    defaultPaymentToken: (process.env.REACT_APP_DEFAULT_PAYMENT_TOKEN as 'XLM' | 'USDC') || 'XLM',
    minPaymentAmount: parseInt(process.env.REACT_APP_MIN_PAYMENT_AMOUNT || '1', 10),
    maxPaymentAmount: parseInt(process.env.REACT_APP_MAX_PAYMENT_AMOUNT || '1000000', 10),
  };
}

// Load configuration once at startup
const config = loadConfig();

// Log configuration in development
if (config.debug) {
  console.log('🔧 Creator Hub Frontend Configuration:', {
    api: config.apiUrl,
    network: config.stellarNetwork,
    debug: config.debug,
    version: config.appVersion,
  });
}

export default config;
