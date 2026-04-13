import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface WalletStatusProps {
  connected: boolean;
  publicKey: string | null;
}

export default function WalletStatus({ connected, publicKey }: WalletStatusProps) {
  if (!connected) {
    return (
      <div className="inline-flex items-center gap-2 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <AlertCircle className="w-5 h-5 text-yellow-400" />
        <span className="text-gray-300">Connect wallet to get started</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 p-4 bg-purple-900/30 rounded-lg border border-purple-500/50">
      <CheckCircle className="w-5 h-5 text-green-400" />
      <span className="text-gray-200">
        Connected: <span className="font-mono text-purple-300">{publicKey?.slice(0, 8)}...{publicKey?.slice(-8)}</span>
      </span>
    </div>
  );
}
