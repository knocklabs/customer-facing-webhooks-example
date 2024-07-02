import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { GripVertical } from "lucide-react";

import { Knock } from "@knocklabs/node";
export const dynamic = "force-dynamic";
export default async function Logs() {
  const knock = new Knock(process.env.KNOCK_API_KEY);
  let messageLogs = null;
  try {
    messageLogs = await knock.messages.list({
      tenant: process.env.KNOCK_TENANT_ID as string,
      source: process.env.KNOCK_WEBHOOK_WORKFLOW_KEY as string,
      channel_id: process.env.KNOCK_WEBHOOK_CHANNEL_ID as string,
    });
    console.log(messageLogs);
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
                <BreadcrumbLink href="/logs">Logs</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Event Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event type</TableHead>
                  <TableHead>Message ID</TableHead>

                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messageLogs?.items && messageLogs.items.length > 0 ? (
                  messageLogs.items.map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge variant="outline">{item.data.eventType}</Badge>
                        </TableCell>
                        <TableCell>{item.id}</TableCell>

                        <TableCell>
                          {new Date(
                            item.data.payload.timestamp
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge>{item.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Link href={`/logs/${item.id}`}>
                            <GripVertical></GripVertical>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell>No logs found</TableCell>
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
