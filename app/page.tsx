import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { GripVertical, Plus, Webhook } from "lucide-react";
import { Knock } from "@knocklabs/node";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";
revalidatePath("/", "layout");
export default async function Dashboard() {
  const knock = new Knock(process.env.KNOCK_API_KEY);
  let webhooks = null;
  try {
    webhooks = await knock.objects.list(
      process.env.KNOCK_WEBHOOK_COLLECTION as string
    );
  } catch (e) {
    console.log(e);
  }
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <div className="grid grid-cols-2 mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Endpoints</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link className="max-w-[150px] place-self-end" href="/endpoints/new">
            <Button>
              <Plus></Plus> Add Endpoint
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>URLs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {webhooks && webhooks.entries.length > 0 ? (
                  webhooks.entries.map((webhookObject) => (
                    <TableRow key={webhookObject.id}>
                      <TableCell className="font-medium">
                        <Webhook></Webhook>
                      </TableCell>
                      <TableCell className="font-medium">
                        {webhookObject.properties.url}
                        <p className="mt-2 font-light">
                          {webhookObject.properties.description}
                        </p>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/endpoints/${webhookObject.id}`}>
                          <GripVertical></GripVertical>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No webhook found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
