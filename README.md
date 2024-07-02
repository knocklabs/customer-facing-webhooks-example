# Building customer-facing webhooks with Knock

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

In this section, we will explore how to model webhook connections using objects in Knock. By leveraging the power of objects, we can easily manage and organize our webhook connections, making our code more maintainable and scalable.

## Triggering Test Events in Next.js with Knock Workflows

In this section, we will learn how to trigger test events in Next.js by utilizing Knock workflows. Knock provides a seamless integration with Next.js, allowing us to simulate webhook events and test our application's behavior.

## Examining Webhook Requests and Responses with Message Delivery Logs

In this section, we will dive into the importance of message delivery logs and how they can help us examine webhook requests and responses. By analyzing these logs, we can gain valuable insights into the communication between our application and external services.

Remember to refer to the official documentation of Knock for detailed instructions and examples.
