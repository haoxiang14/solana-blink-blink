import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <header>
        <nav className="max-w-6xl mx-auto py-2 flex items-center justify-between gap-2 h-16">
          <a>Logo</a>
          <Button>Connect wallet</Button>
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
