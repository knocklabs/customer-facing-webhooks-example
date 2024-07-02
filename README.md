# Designing customer-facing webhooks with Knock

This example app builds on [this guide](https://docs.knock.app/guides/customer-webhooks) from the official docs. It provides you an easy way to implement the steps outlined there and demonstrates how to create a debugging logs for developers using Knock's APIs. The app itself is built using Next.js and shadcn/ui.

## Getting started

To get started, you'll first want to create a new copy of the `.env.sample` file to use in your project:

```bash
cp .env.sample .env.local
```

From here, you'll need to provide values for the following environment variables. You may also need to create a few resources in Knock.:
| Env Var | Description |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| KNOCK_API_KEY | This value comes from Knock and is used to authenticate server-side API requests. You can find it listed as the secret key under "Developers" > "API keys." **This is a secret value and should not be exposed publicly.** |
| KNOCK_WEBHOOK_CHANNEL_ID | This value comes from Knock after you create a Webhook channel in the "Integrations" section of the dashboard. |
| KNOCK_WEBHOOK_COLLECTION | This value will provide the name for your collection of webhook configuration objects. You can use 'webhooks' as a default if you're using this as a PoC |
| KNOCK_WEBHOOK_WORKFLOW_KEY | This value comes from Knock after you create the workflow that will generate your webhook messages.  
| KNOCK_TENANT_ID | This value corresponds to a tenant in Knock, which may also be know as account or organization in your application data model. |

## Modeling webhook connections with objects in Knock

In this section, we will explore how to model webhook connections using objects in Knock. In Knock, you can think of [Objects](https://docs.knock.app/concepts/objects) as a NoSQL for non-user entities. In other words, you can create JSON-shaped entities inside of collections that map to parts of your application's data model.

In this app, we create an entity inside of the `webhooks` collection to store information about the webhook connection. Each `object` can have custom properties like a `url` or an array of `events` the webhook is subscribed to.

In this application, the `SetEndpointForm` component calls a server action that runs the following code to create or update our webhook endpoint entity:

```javascript
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
```

You can also use [objects to power subscriptions](https://docs.knock.app/concepts/objects#object-subscribers), which is a powerful pattern that simplifies triggering workflows.

## Triggering Test Events in Next.js with Knock Workflows

In this section, we will learn how to trigger test events in Next.js by utilizing Knock workflows. Knock provides a seamless integration with Next.js, allowing us to simulate webhook events and test our application's behavior.

## Examining Webhook Requests and Responses with Message Delivery Logs

In this section, we will dive into the importance of message delivery logs and how they can help us examine webhook requests and responses. By analyzing these logs, we can gain valuable insights into the communication between our application and external services.

Remember to refer to the official documentation of Knock for detailed instructions and examples.
