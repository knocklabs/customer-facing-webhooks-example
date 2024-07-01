"use server";
import { z } from "zod";
import slugify from "slugify";
import { formSchema } from "@/components/SetEndpointForm";
import { Knock } from "@knocklabs/node";
import { revalidatePath } from "next/cache";

export default async function setKnockEndpointObject(
  values: z.infer<typeof formSchema>
) {
  const knock = new Knock(process.env.KNOCK_API_KEY);
  await knock.objects.set(
    process.env.KNOCK_WEBHOOK_COLLECTION as string,
    slugify(values.id),
    {
      name: values.id,
      description: values.description,
      url: values.endpointURL,
      signingKey: values.signingKey,
      events: values.events,
    }
  );
  revalidatePath("/", "layout");
}
