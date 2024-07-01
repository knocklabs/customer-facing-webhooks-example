import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CodeBlock from "@/components/CodeBlock";

import { Knock } from "@knocklabs/node";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";
interface Log {
  id: string;
  response: Record<string, any>;
  request: Record<string, any>;
}
export default async function LogDetails({
  params,
}: {
  params: { logId: string };
}) {
  console.log(params.logId);
  const knock = new Knock(process.env.KNOCK_API_KEY);
  let message = null;
  let content = null;
  let deliveryLogs = null;
  async function getMessageDeliveryLogs(id: string) {
    const results = await fetch(
      `https://api.knock.app/v1/messages/${id}/delivery_logs`,
      {
        headers: { Authorization: `Bearer ${process.env.KNOCK_API_KEY}` },
      }
    );
    return results.json();
  }
  try {
    const results = await Promise.all([
      knock.messages.get(params.logId),
      knock.messages.getContent(params.logId),
      getMessageDeliveryLogs(params.logId),
    ]);
    [message, content, deliveryLogs] = results;
    console.log(results);
  } catch (e) {
    console.log(e);
  }

  console.log(deliveryLogs.items[0]);

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <div className="grid grid-cols-2 mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/logs">Logs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>{params.logId}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{message?.data.eventType}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <div className="basis-3/4">
                <Card>
                  <CardHeader>
                    <CardTitle>Message content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={JSON.stringify(deliveryLogs.items[0].request.body)}
                    ></CodeBlock>
                  </CardContent>
                </Card>
              </div>
              <div className="px-6">
                <p>Created at</p>
                <p>
                  {new Date(message?.inserted_at as string).toLocaleString()}
                </p>
              </div>
            </div>
            <h3 className="mt-6 text-xl">Webhook attempts</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Response</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryLogs.items && deliveryLogs.items.length > 0 ? (
                  deliveryLogs.items.map((item: Log) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.response.status}</TableCell>
                        <TableCell>{`${item.request.host}${item.request.path}`}</TableCell>
                        <TableCell>
                          {new Date(
                            message?.inserted_at as string
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Collapsible>
                            <CollapsibleTrigger>
                              <Search></Search>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <CodeBlock
                                code={JSON.stringify(
                                  deliveryLogs.items[0].response
                                )}
                              ></CodeBlock>
                            </CollapsibleContent>
                          </Collapsible>
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
