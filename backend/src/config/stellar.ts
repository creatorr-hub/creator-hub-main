import StellarSDK from 'stellar-sdk';
import { config } from 'dotenv';

config();

const network = process.env.STELLAR_NETWORK || 'testnet';

// Stellar network config
export const STELLAR_CONFIG = {
  network: network as 'testnet' | 'mainnet' | 'standalone',
  networkPassphrase:
    network === 'mainnet'
      ? StellarSDK.Networks.PUBLIC_NETWORK_PASSPHRASE
      : StellarSDK.Networks.TESTNET_NETWORK_PASSPHRASE,
  horizonApiUrl:
    network === 'mainnet'
      ? 'https://horizon.stellar.org'
      : 'https://horizon-testnet.stellar.org',
  contractId: process.env.STELLAR_CONTRACT_ID || '',
};

/**
 * Stellar Server instance
 */
export const server = new StellarSDK.Server(STELLAR_CONFIG.horizonApiUrl);

/**
 * Get stellar account details
 */
export async function getAccountDetails(publicKey: string) {
  try {
    const account = await server.accounts().accountId(publicKey).call();
    return account;
  } catch (error) {
    console.error('Failed to get account details:', error);
    throw error;
  }
}

/**
 * Get account balance
 */
export async function getBalance(publicKey: string, asset: string = 'XLM') {
  try {
    const account = await getAccountDetails(publicKey);

    if (asset === 'XLM') {
      return account.balances.find((b) => b.asset_type === 'native')?.balance || '0';
    }

    return account.balances.find((b) => b.asset_code === asset)?.balance || '0';
  } catch (error) {
    console.error('Failed to get balance:', error);
    throw error;
  }
}

/**
 * Submit transaction to Stellar network
 */
export async function submitTransaction(transactionXdr: string) {
  try {
    const transaction = new StellarSDK.TransactionBuilder.fromXDR(
      transactionXdr,
      STELLAR_CONFIG.networkPassphrase,
    );

    const result = await server.submitTransaction(transaction);
    return result;
  } catch (error) {
    console.error('Failed to submit transaction:', error);
    throw error;
  }
}

export default STELLAR_CONFIG;
