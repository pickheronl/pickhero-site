import { getPayload } from 'payload'
import config from '@payload-config'
import Header from './Header'

export default async function HeaderWrapper() {
  const payload = await getPayload({ config })

  let navigation = null
  try {
    navigation = await payload.findGlobal({
      slug: 'navigation' as 'navigation',
    })
  } catch {
    // Global not yet created
  }

  return <Header navigation={navigation} />
}
