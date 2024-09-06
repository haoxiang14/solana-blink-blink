'use client'

import { Button } from "@/components/ui/button";

// nextjs ffs not allowing onclick attr to button unless in client component is stupid
export function CopyButton({ url }: { url: string }) {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => navigator.clipboard.writeText(url).then()}
    >
      Share Blinks
    </Button>
  )
}
