import { getPayload } from 'payload'
import config from '@payload-config'
import Footer from './Footer'

export default async function FooterWrapper() {
  const payload = await getPayload({ config })

  let footer = null
  try {
    footer = await payload.findGlobal({
      slug: 'footer' as const,
    })
  } catch {
    // Global not yet created
  }

  return <Footer footer={footer} />
}
