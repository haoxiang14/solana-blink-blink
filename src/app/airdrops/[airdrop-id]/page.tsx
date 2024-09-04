import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { RedPacketToggle } from "./redPacketCheckbox";
import { createClient } from "@/lib/supabase";

export default function Airdrop() {
  async function UpdateAirdrop(formData: FormData) {
    // TODO: update with formData. just skip input validation
    const supabase = createClient()
    const { error } = await supabase.from('airdrops').update({})
    if (error) {
      console.log(error)
      return {
        errors: 'Failed to update airdrop details'
      }
    }
    return { ok: true }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Link href="/airdrops">← Back to all airdrops</Link>
      <Card className="p-4 ">
        <form className="space-y-2">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-lg font-bold">Airdrop</h1>
            <Button variant="outline" type="button">Share Blinks</Button>
          </div>
          <form className="flex flex-col gap-4">
            <p className="text-muted-foreground">Airdrop Details</p>
            <div className="space-y-1">
              <Label htmlFor="name">Name*</Label>
              <Input id="name" required placeholder="APUBCC Event" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="total">Total*</Label>
              <Input id="total" type="number" required placeholder="5000 SOL" />
            </div>
            <RedPacketToggle />
            <hr className="border-dotted border-muted-foreground" />
            <p className="text-muted-foreground">Extra options</p>
            <div className="space-y-1">
              <Label htmlFor="password">Secret phrase</Label>
              <Input id="password" required placeholder="••••••••••••" />
            </div>
            {/* TODO: implement this when core features work */}
            <div className="space-y-1">
              <Label htmlFor="expiry">Expires at</Label>
              <Input id="expiry" required />
              <p className="text-sm text-muted-foreground">
                Leave this empty to not expire the airdrop
              </p>
            </div>
            <Button className="self-start">Update</Button>
          </form>
        </form>
      </Card>
    </div>
  )
}
