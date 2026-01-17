// Augment Cloudflare environment types with email-related variables
// POSTMARK_API_KEY must be set as a secret: wrangler secret put POSTMARK_API_KEY

declare namespace Cloudflare {
  interface Env {
    // Email configuration (set via vars in wrangler.jsonc)
    EMAIL_FROM?: string
    NOTIFICATION_EMAIL?: string
    // Postmark API key (set via `wrangler secret put POSTMARK_API_KEY`)
    POSTMARK_API_KEY?: string
  }
}
