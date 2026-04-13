import React, { useState, useEffect } from 'react';
import { useFreighterWallet } from '../hooks/useFreighter';
import { formatAddress } from '../utils/formatters';
import WalletStatus from './WalletStatus';
import { Wallet, Zap, Users, TrendingUp } from 'lucide-react';

export default function Landing() {
  const { connected, publicKey, connect, disconnect } = useFreighterWallet();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all ${scrolled ? 'bg-slate-900/95 backdrop-blur' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">Creator Hub</span>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
            <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
          </div>

          <button
            onClick={connected ? disconnect : connect}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
              connected
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-white text-slate-900 hover:bg-gray-200'
            }`}
          >
            <Wallet className="w-4 h-4" />
            {connected ? `${formatAddress(publicKey)}` : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center px-4 py-2 bg-purple-900/50 rounded-full border border-purple-500/50">
            <span className="text-purple-300 text-sm font-semibold">Powered by Stellar Blockchain ✨</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Hire & Reward Creators
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              On Blockchain
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect your Freighter wallet, browse tasks, submit solutions, and get paid instantly in XLM or USDC. No intermediaries. No delays.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={connect}
              disabled={connected}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition disabled:opacity-50"
            >
              {connected ? '✓ Wallet Connected' : 'Get Started Now'}
            </button>
            <button className="px-8 py-4 border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 font-bold rounded-lg transition">
              Learn More
            </button>
          </div>

          {/* Status Bar */}
          <WalletStatus connected={connected} publicKey={publicKey} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Creator Hub?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Payments</h3>
              <p className="text-gray-300">Get paid in XLM or USDC instantly via Stellar blockchain. No delays, no hidden fees.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global Talent Pool</h3>
              <p className="text-gray-300">Connect with talented creators worldwide. Locations don't matter on blockchain.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gradient-to-br from-purple-900/30 to-slate-800/30 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Low Fees</h3>
              <p className="text-gray-300">2-5% platform fee instead of 15-30%. More money for creators and projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: 1, title: 'Connect', desc: 'Link your Freighter wallet' },
              { step: 2, title: 'Choose', desc: 'Browse and select tasks' },
              { step: 3, title: 'Submit', desc: 'Complete and submit work' },
              { step: 4, title: 'Earn', desc: 'Get paid instantly' }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white text-center">{item.title}</h3>
                  <p className="text-gray-400 text-center text-sm mt-2">{item.desc}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-7 -right-2 w-4 h-0.5 bg-purple-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">Connect your Freighter wallet and join the creator revolution on Stellar.</p>

          {!connected ? (
            <button
              onClick={connect}
              className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition text-lg"
            >
              Connect Wallet Now
            </button>
          ) : (
            <div className="text-purple-200 font-semibold">✓ Wallet connected! Explore the dashboard →</div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-purple-500/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-4">Creator Hub</h3>
            <p className="text-gray-400 text-sm">Decentralized creator economy on Stellar</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Discord</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/10 pt-8 text-center text-gray-500 text-sm">
          <p>© 2026 Creator Hub. Open Source. Built on Stellar.</p>
        </div>
      </footer>
    </div>
  );
}
