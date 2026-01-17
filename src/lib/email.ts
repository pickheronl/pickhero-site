import { getCloudflareContext } from '@opennextjs/cloudflare'

export interface SendEmailOptions {
  to: string
  subject: string
  html?: string
  text?: string
  from?: string
  replyTo?: string
}

export interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Send email using Postmark REST API
 * Compatible with Cloudflare Workers (no Node.js dependencies)
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const { env } = await getCloudflareContext({ async: true })
  
  const apiKey = env.POSTMARK_API_KEY
  const defaultFrom = env.EMAIL_FROM || 'hello@pickhero.nl'
  
  if (!apiKey) {
    console.error('POSTMARK_API_KEY is not configured')
    return { success: false, error: 'Email service not configured' }
  }

  const { to, subject, html, text, from = defaultFrom, replyTo } = options

  try {
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': apiKey,
      },
      body: JSON.stringify({
        From: from,
        To: to,
        Subject: subject,
        HtmlBody: html,
        TextBody: text,
        ReplyTo: replyTo,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Postmark API error:', response.status, errorData)
      return {
        success: false,
        error: (errorData as { Message?: string }).Message || `HTTP ${response.status}`,
      }
    }

    const data = (await response.json()) as { MessageID?: string }
    return { success: true, messageId: data.MessageID }
  } catch (error) {
    console.error('Failed to send email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
