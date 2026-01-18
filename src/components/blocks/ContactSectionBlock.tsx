'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import type { Page, ContactSetting } from '@/payload-types'

type ContactSectionBlockType = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'contactSection' }
>

interface ContactSectionBlockProps {
  block: ContactSectionBlockType
}

export default function ContactSectionBlock({ block }: ContactSectionBlockProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contactSettings, setContactSettings] = useState<ContactSetting | null>(null)

  useEffect(() => {
    async function fetchContactSettings() {
      try {
        const response = await fetch('/api/contact-settings')
        if (response.ok) {
          const data = (await response.json()) as ContactSetting
          setContactSettings(data)
        }
      } catch (err) {
        console.error('Failed to fetch contact settings:', err)
      }
    }
    fetchContactSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Er ging iets mis bij het versturen van je bericht.')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const { address, email, phone, openingHours, mapsEmbedUrl } = contactSettings || {}

  // Helper to render title with *highlighted* text
  const renderTitle = (title: string) => {
    const parts = title.split(/\*(.*?)\*/)
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <span key={index} className="text-gradient">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <section className="py-16 lg:py-24">
      {(block.badge || block.title || block.subtitle) && (
        <div className="text-center mb-16">
          {block.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              {block.badge}
            </div>
          )}
          {block.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {renderTitle(block.title)}
            </h2>
          )}
          {block.subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{block.subtitle}</p>
          )}
        </div>
      )}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact Form */}
          <div className="bg-card p-8 rounded-2xl border border-border">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Bericht verzonden!</h3>
                <p className="text-muted-foreground">
                  Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.
                </p>
              </div>
            ) : (
              <>
                {block.formTitle && (
                  <h2 className="text-2xl font-bold text-foreground mb-6">{block.formTitle}</h2>
                )}
                {block.formDescription && (
                  <p className="text-muted-foreground mb-6">{block.formDescription}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Naam *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mailadres *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Bedrijfsnaam</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Bericht *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Verzenden...' : block.submitButtonText || 'Verstuur bericht'}
                  </Button>
                </form>
              </>
            )}
          </div>

          {/* Right: Contact Details + Map */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-card p-8 rounded-2xl border border-border">
              {block.infoTitle && (
                <h2 className="text-2xl font-bold text-foreground mb-6">{block.infoTitle}</h2>
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
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="text-primary hover:underline"
                      >
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
        </div>
      </div>
    </section>
  )
}
