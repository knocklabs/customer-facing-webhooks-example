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
    "webhook-event-stream",
    {
      recipients: [{ id: values.webhookId, collection: "webhooks" }],
      data: {
        eventType: values.eventType,
        payload: {
          message: "This is a test message",
          timestamp: new Date().toISOString(),
        },
      },
      tenant: "knock-projects",
    }
  );
  console.log(workflow_run_id);
  revalidatePath("/", "layout");
}
