"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from "@solana/web3.js";
import React, { useState, useEffect } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';


export function Header() {

  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) return;

    connection.getBalance(publicKey).then((balance) => {
      setBalance(balance / web3.LAMPORTS_PER_SOL);
    });
  }, [publicKey, connection]);

  return (
    <header>
      <nav className="max-w-6xl mx-auto py-2 flex items-center justify-between gap-2 h-16">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 22 1-1h3l9-9" /><path d="M3 21v-3l9-9" /><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z" /></svg>
          <a className="font-bold text-xl"> TeamDrop </a>
        </div>
        <div className="flex items-center gap-2">
          {publicKey && (
            <button style={{
              backgroundColor: 'hsl(222.2 47.4% 11.2%)',
              color: 'hsl(210 40% 98%)',
              height: '2.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid hsl(214.3 31.8% 91.4%)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              fontSize: '0.875rem',
              fontWeight: '500',
              lineHeight: '1.25rem',
              fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}> {balance.toFixed(2)} SOL </button>
          )}
          <WalletMultiButton style={{
            backgroundColor: 'hsl(222.2 47.4% 11.2%)',
            color: 'hsl(210 40% 98%)',
            height: '2.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: '1px solid hsl(214.3 31.8% 91.4%)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            fontSize: '0.875rem',
            fontWeight: '500',
            lineHeight: '1.25rem',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',

          }} />
        </div>
      </nav>
    </header>
  )
}
