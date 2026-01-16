import { getPayload } from 'payload'
import config from '@payload-config'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import type { Page } from '@/payload-types'

type ContactInfoBlockType = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'contactInfo' }
>

interface ContactInfoBlockProps {
  block: ContactInfoBlockType
}

export default async function ContactInfoBlock({ block }: ContactInfoBlockProps) {
  const payload = await getPayload({ config })

  const contactSettings = await payload.findGlobal({
    slug: 'contact-settings',
  })

  const { address, email, phone, openingHours, mapsEmbedUrl } = contactSettings

  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="bg-card p-8 rounded-2xl border border-border">
        {block.title && (
          <h2 className="text-2xl font-bold text-foreground mb-6">{block.title}</h2>
        )}

        <div className="space-y-6">
          {address && (address.street || address.city) && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Adres</h3>
                <p className="text-muted-foreground">
                  {address.street && (
                    <>
                      {address.street}
                      <br />
                    </>
                  )}
                  {address.postalCode && address.city && (
                    <>
                      {address.postalCode} {address.city}
                      <br />
                    </>
                  )}
                  {address.country}
                </p>
              </div>
            </div>
          )}

          {email && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">E-mail</h3>
                <a href={`mailto:${email}`} className="text-primary hover:underline">
                  {email}
                </a>
              </div>
            </div>
          )}

          {phone && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Telefoon</h3>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
                  {phone}
                </a>
              </div>
            </div>
          )}

          {openingHours && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Openingstijden</h3>
                <p className="text-muted-foreground">{openingHours}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      {block.showMap && mapsEmbedUrl && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden h-[300px]">
          <iframe
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Locatie"
          />
        </div>
      )}
    </div>
  )
}
