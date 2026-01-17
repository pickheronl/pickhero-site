import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { getCloudflareContext } from '@opennextjs/cloudflare'

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  type?: 'contact' | 'trial'
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Naam en e-mailadres zijn verplicht' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }

    const { env } = await getCloudflareContext({ async: true })
    const notificationEmail = env.NOTIFICATION_EMAIL || 'hello@pickhero.nl'

    const isTrialRequest = body.type === 'trial'
    const subjectPrefix = isTrialRequest ? 'Proefperiode aanvraag' : 'Contactformulier'

    // Send notification email to admin
    const adminEmailResult = await sendEmail({
      to: notificationEmail,
      subject: `${subjectPrefix}: ${body.name}`,
      replyTo: body.email,
      html: `
        <h2>${isTrialRequest ? 'Nieuwe proefperiode aanvraag' : 'Nieuw contactformulier bericht'}</h2>
        <p><strong>Naam:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(body.email)}</p>
        ${body.company ? `<p><strong>Bedrijf:</strong> ${escapeHtml(body.company)}</p>` : ''}
        ${body.message ? `<p><strong>Bericht:</strong></p><p>${escapeHtml(body.message).replace(/\n/g, '<br>')}</p>` : ''}
      `,
      text: `
${isTrialRequest ? 'Nieuwe proefperiode aanvraag' : 'Nieuw contactformulier bericht'}

Naam: ${body.name}
E-mail: ${body.email}
${body.company ? `Bedrijf: ${body.company}` : ''}
${body.message ? `Bericht:\n${body.message}` : ''}
      `.trim(),
    })

    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error)
      return NextResponse.json(
        { error: 'Er ging iets mis bij het versturen. Probeer het later opnieuw.' },
        { status: 500 },
      )
    }

    // Send confirmation email to the user
    await sendEmail({
      to: body.email,
      subject: isTrialRequest
        ? 'Bedankt voor je aanvraag - Pickhero'
        : 'Bedankt voor je bericht - Pickhero',
      html: `
        <h2>Bedankt voor je ${isTrialRequest ? 'aanvraag' : 'bericht'}, ${escapeHtml(body.name)}!</h2>
        <p>We hebben je ${isTrialRequest ? 'aanvraag voor een proefperiode' : 'bericht'} ontvangen en nemen zo snel mogelijk contact met je op.</p>
        ${isTrialRequest ? '<p>We nemen binnen 24 uur contact met je op om je op weg te helpen met Pickhero.</p>' : ''}
        <p>Met vriendelijke groet,<br>Het Pickhero Team</p>
      `,
      text: `
Bedankt voor je ${isTrialRequest ? 'aanvraag' : 'bericht'}, ${body.name}!

We hebben je ${isTrialRequest ? 'aanvraag voor een proefperiode' : 'bericht'} ontvangen en nemen zo snel mogelijk contact met je op.
${isTrialRequest ? '\nWe nemen binnen 24 uur contact met je op om je op weg te helpen met Pickhero.' : ''}

Met vriendelijke groet,
Het Pickhero Team
      `.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het verwerken van je aanvraag.' },
      { status: 500 },
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
