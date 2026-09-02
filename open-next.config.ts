import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// The site is almost entirely prerendered; the only dynamic route is the
// contact form handler, so no incremental cache is configured.
export default defineCloudflareConfig();
