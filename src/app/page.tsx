import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";
import { PlusIcon } from '@radix-ui/react-icons'

async function fetchAirdrops() {
  const supabase = createClient()
  const { data, error } = await supabase.from('airdrops').select()
  if (error) {
    console.log(error)
    return []
  }
  return data
}

export default async function Home() {
  const airdrops = await fetchAirdrops()

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto space-y-4">
        <h1>Your airdrops</h1>
        <div className="grid grid-cols-3 gap-4">
          {airdrops.map((airdrop) => (
            <a href="#">
              <Card className="h-32">
                <p>{airdrop.name}</p>
              </Card>
            </a>
          ))}
          <form>
            <Button variant="secondary"
              className="h-32 text-2xl leading-none gap-4">
              <PlusIcon className="size-10" />
              New Airdrop
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
