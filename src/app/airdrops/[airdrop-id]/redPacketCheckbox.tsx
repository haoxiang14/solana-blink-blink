'use client'

import { useState } from 'react'
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Input } from '@/components/ui/input';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function RedPacketToggle() {
  const [checked, setChecked] = useState(false)

  return (
    <>
      <div className="flex items-center gap-2">
        <Switch id="red-packet" checked={checked} onCheckedChange={setChecked} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label htmlFor="red-packet" className="flex items-center gap-2">
                Red Packet Mode?
                <QuestionMarkCircledIcon />
              </Label>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add explanation here...</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {checked && (
        <div className="space-y-1">
          <Label htmlFor="amount">Amount*</Label>
          <Input id="amount" type="number" required placeholder="100 SOL" />
        </div>
      )}
    </>
  )
}
