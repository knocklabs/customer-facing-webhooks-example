"use server";
import { z } from "zod";
import { formSchema } from "@/components/TestEventForm";
import { Knock } from "@knocklabs/node";
import { revalidatePath } from "next/cache";

export default async function testWebhookEvent(
  values: z.infer<typeof formSchema>
) {
  const knock = new Knock(process.env.KNOCK_API_KEY);
  const workflow_run_id = await knock.workflows.trigger(
    process.env.KNOCK_WEBHOOK_WORKFLOW_KEY as string,
    {
      recipients: [
        {
          id: values.webhookId,
          collection: process.env.KNOCK_WEBHOOK_COLLECTION as string,
        },
      ],
      data: {
        eventType: values.eventType,
        payload: {
          message: "This is a test message",
          timestamp: new Date().toISOString(),
        },
      },
      tenant: process.env.KNOCK_TENANT_ID as string,
    }
  );
  console.log(workflow_run_id);
  revalidatePath("/", "layout");
}
