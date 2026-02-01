import * as Sentry from "@sentry/node";

let integrations = [];

try {
  const { nodeProfilingIntegration } = await import("@sentry/profiling-node");
  integrations.push(nodeProfilingIntegration());
} catch (e) {
  console.warn("Sentry profiling unavailable, continuing without it:", e.message);
}

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://af49cd78e34e869e5c3fcd47018a17dc@o4508646666141696.ingest.us.sentry.io/4508646670663680",
  integrations: [
    ...integrations,
    Sentry.mongoIntegration()
  ],
});
