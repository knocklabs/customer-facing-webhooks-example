"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ToastAction } from "./ui/toast";
import router, { useRouter } from "next/navigation";
import setKnockEndpointObject from "../app/actions/set-endpoint-object";
import { Checkbox } from "./ui/checkbox";
import { revalidatePath } from "next/cache";

export const formSchema = z.object({
  id: z.string().min(2, {
    message: "Webhook ID should be a valid JSON property name",
  }),
  endpointURL: z.string().url({
    message: "endpoint URL must be a valid URL.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  signingKey: z.string().min(16, {
    message: "You signing key should be at least 16 characters.",
  }),
  events: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function SetEndpointForm({
  id,
  endpointURL,
  description,
  signingKey,
  events,
}: {
  id?: string;
  endpointURL?: string;
  description?: string;
  signingKey?: string;
  events?: string[];
}) {
  // 1. Define your form.
  const { toast } = useToast();
  const router = useRouter();
  const randomKey = uuidv4();
  const webhookEvents = [
    {
      id: "server:info",
      label: "Server info",
    },
    {
      id: "server:warn",
      label: "Server warn",
    },
    {
      id: "server:alert",
      label: "Server alert",
    },
  ] as const;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id || "test-webhook",
      endpointURL: endpointURL || "",
      description: description || "",
      signingKey: signingKey || randomKey,
      events: events || ["server:info", "server:warn", "server:alert"],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await setKnockEndpointObject(values);
    toast({
      title: "Endpoint data set",
      description: `The endpoint was created or updated.`,
      action: (
        <ToastAction altText="View endpoint" onClick={() => router.push("/")}>
          View endpoints
        </ToastAction>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook Id</FormLabel>
              <FormControl>
                <Input placeholder="test-webhook" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endpointURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint URL</FormLabel>
              <FormControl>
                <Input placeholder="https://knock.app" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about the endpoint"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signingKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signing key</FormLabel>
              <FormControl>
                <Input
                  placeholder="9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="events"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {webhookEvents.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="events"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
