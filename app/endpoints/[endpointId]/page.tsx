import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { SetEndpointForm } from "@/components/SetEndpointForm";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";
export default async function NewEndpoint({
  params,
}: {
  params: { endpointId: string };
}) {
  const knock = new Knock(process.env.KNOCK_API_KEY);
  const endpoint = await knock.objects.get(
    process.env.KNOCK_WEBHOOK_COLLECTION as string,
    params.endpointId
  );
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <div className="grid grid-cols-2 mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Endpoints</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/endpoint/id">
                  Update endpoint
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Set an endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <SetEndpointForm
              id={endpoint.id}
              description={endpoint.properties.description}
              endpointURL={endpoint.properties.url}
              signingKey={endpoint.properties.signingKey}
              events={endpoint.properties.events}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
