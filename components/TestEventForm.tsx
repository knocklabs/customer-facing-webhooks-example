"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import testWebhookEvent from "../app/actions/test-webhook-event";
import { ToastAction } from "./ui/toast";
import { revalidatePath } from "next/cache";

export const formSchema = z.object({
  webhookId: z.string().min(2, {}),
  eventType: z.enum(["server:alert", "server:warn", "server:info"], {
    required_error: "You need to select a notification type.",
  }),
});
interface webhook {
  id: string;
  properties: Record<string, any>;
}
export function TestEventForm({ webhooks }: { webhooks: webhook[] }) {
  // 1. Define your form.
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await testWebhookEvent(values);
    toast({
      title: "Test event sent",
      description: `The ${values.eventType} event was sent.`,
      action: (
        <ToastAction altText="View logs" onClick={() => router.push("/logs")}>
          View Logs
        </ToastAction>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="webhookId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a webhook to send a test event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {webhooks.map((webhook) => (
                    <SelectItem value={webhook.id} key={webhook.id}>
                      {webhook.properties.name} | {webhook.properties.url}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a webhook to send a test event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available events</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="server:alert" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Server alert (server:alert)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="server:warn" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Server warning (server:warn)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="server:info" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Server info (server:info)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
