"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {

  return (
    <>
      <header>
        <nav className="max-w-6xl mx-auto py-2 flex items-center justify-between gap-2 h-16">
          <a>Solanong</a>
            {/* <Button> Select Wallet</Button> */}
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

            }}/>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto space-y-4">
        <h1>Title</h1>
        <div className="flex flex-wrap gap-4">
          <Card className="size-32 p-4">
            <p>Airdrop #1</p>
          </Card>
          <Card className="size-32 p-4">
            <p>Airdrop #2</p>
          </Card>
          <Button variant="secondary" className="size-32 text-6xl leading-none">+</Button>
        </div>
      </main>
    </>
  );
}
