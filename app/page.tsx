import { Button } from "@/components/ui/button";
import { Knock } from "@knocklabs/node";

const knock = new Knock(process.env.KNOCK_API_KEY);

export default function Home() {
  async function callKnock() {
    "use server";
    const user = knock.users.identify("d544c09d-a028-4a43-85a6-f00463ec7125", {
      locale: "es",
    });
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={callKnock}>
        <Button type="submit">Run Knock</Button>
      </form>
    </main>
  );
}
