import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config })

  const contactSettings = await payload.findGlobal({
    slug: 'contact-settings',
  })

  return Response.json(contactSettings)
}
