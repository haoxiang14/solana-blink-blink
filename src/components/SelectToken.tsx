'use client'

import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface TokenInfo {
    mint: string;
    balance: number;
    decimals: number;
}

export default function SelectToken() {
  
    const [tokens, setTokens] = useState<TokenInfo[]>([]);
    const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
    const { connection } = useConnection();
    const { publicKey } = useWallet();
  
    useEffect(() => {
      const fetchTokens = async () => {
        if (!publicKey) return;
  
        try {
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: TOKEN_PROGRAM_ID
          });
  
          const tokenData: TokenInfo[] = tokenAccounts.value.map(accountInfo => {
            const parsedInfo = accountInfo.account.data.parsed.info;
            return {
              mint: parsedInfo.mint,
              balance: parsedInfo.tokenAmount.uiAmount,
              decimals: parsedInfo.tokenAmount.decimals,
            };
          });
  
          setTokens(tokenData);
        } catch (error) {
          console.error('Error fetching token accounts:', error);
        }
      };
  
      fetchTokens();
    }, [connection, publicKey]);

    const handleSelectToken = (value: string) => {
        const token = tokens.find(t => t.mint === value);
        setSelectedToken(token || null);
    };
    
  return (
    <div>
      <Select onValueChange={handleSelectToken}>
        <SelectTrigger>
          <SelectValue placeholder="Select a token" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {tokens.map((token) => (
            <SelectItem 
              key={token.mint} 
              value={token.mint}
              className="py-3 px-2 hover:bg-accent cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Token" />
                  <AvatarFallback className="bg-primary text-primary-foreground">$</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{token.mint.slice(0, 4)}...{token.mint.slice(-4)}</span>
                  <span className="text-sm text-muted-foreground">Balance: {token.balance}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}   