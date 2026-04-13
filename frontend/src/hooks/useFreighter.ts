import { useState, useEffect } from 'react';
import * as freighter from '@freighterapp/freighter-api';

// Freighter hook for wallet connection and interactions
export function useFreighterWallet() {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [network, setNetwork] = useState<'testnet' | 'public'>('testnet');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isAllowed = await freighter.isAllowed();
        if (isAllowed) {
          const pk = await freighter.getPublicKey();
          setPublicKey(pk);
          setConnected(true);
        }
      } catch (err) {
        console.log('Wallet not connected');
      }
    };

    checkConnection();
  }, []);

  /**
   * Connect wallet
   */
  const connect = async () => {
    setLoading(true);
    setError(null);

    try {
      // Request permission from Freighter
      const pk = await freighter.getPublicKey();
      setPublicKey(pk);
      setConnected(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMsg);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Disconnect wallet
   */
  const disconnect = () => {
    setPublicKey(null);
    setConnected(false);
    setError(null);
  };

  /**
   * Sign a message/transaction
   */
  const signMessage = async (message: string): Promise<string> => {
    if (!connected || !publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await freighter.signMessage(message);
      return signature;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to sign message';
      setError(errorMsg);
      throw err;
    }
  };

  /**
   * Sign transaction
   */
  const signTransaction = async (xdr: string): Promise<string> => {
    if (!connected || !publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const signedXdr = await freighter.signTransaction(xdr, {
        network: 'TESTNET_NETWORK_PASSPHRASE', // Will use testnet by default
      });
      return signedXdr;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to sign transaction';
      setError(errorMsg);
      throw err;
    }
  };

  return {
    connected,
    publicKey,
    network,
    error,
    loading,
    connect,
    disconnect,
    signMessage,
    signTransaction,
  };
}
