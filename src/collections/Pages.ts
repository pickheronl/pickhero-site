import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL pad (bijv. "over-ons", "contact"). Laat leeg voor homepage.',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Pagina Inhoud',
      blocks: [
        // Hero Section Block
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Sectie',
            plural: 'Hero Secties',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge tekst',
              admin: {
                description: 'Kleine tekst boven de titel (bijv. "Logic4 integratie live")',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight (bijv. "Slimmer picken met *PickHero*")',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Beschrijving',
            },
            {
              name: 'benefits',
              type: 'array',
              label: 'Voordelen',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'CTA knop tekst',
              defaultValue: 'Start gratis proefperiode',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'CTA knop link',
              admin: {
                description: 'Optioneel: laat leeg om het formulier te openen, of vul een URL in',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Dashboard afbeelding',
            },
            {
              name: 'mobileImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Mobiele app afbeelding/GIF',
              admin: {
                description: 'Optioneel: afbeelding of GIF van de mobiele app die over de dashboard afbeelding zweeft',
              },
            },
          ],
        },
        // Features Section Block
        {
          slug: 'features',
          labels: {
            singular: 'Functies Sectie',
            plural: 'Functies Secties',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              defaultValue: 'Functies',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Ondertitel',
            },
            {
              name: 'features',
              type: 'relationship',
              relationTo: 'features',
              hasMany: true,
              label: 'Functies',
              admin: {
                description: 'Selecteer functies om te tonen',
              },
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'Knop tekst',
              admin: {
                description: 'Optioneel: laat leeg om geen knop te tonen',
              },
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'Knop link',
              admin: {
                description: 'Optioneel: laat leeg om het formulier te openen',
              },
            },
          ],
        },
        // Integrations Ticker Block
        {
          slug: 'integrationsTicker',
          labels: {
            singular: 'Integraties Ticker',
            plural: 'Integraties Tickers',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              defaultValue: 'Integraties',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Ondertitel',
            },
            {
              name: 'integrations',
              type: 'relationship',
              relationTo: 'integrations',
              hasMany: true,
              label: 'Integraties',
              admin: {
                description: 'Laat leeg om alle integraties te tonen',
              },
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'CTA tekst',
              defaultValue: 'Mis je een integratie?',
            },
            {
              name: 'ctaLinkText',
              type: 'text',
              label: 'CTA link tekst',
              defaultValue: 'Laat het ons weten',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'CTA link',
              defaultValue: '/contact',
            },
          ],
        },
        // Integrations Grid Block (for integrations page - with filters)
        {
          slug: 'integrationsGrid',
          labels: {
            singular: 'Integraties Grid',
            plural: 'Integraties Grids',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              defaultValue: 'Integraties',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Ondertitel',
            },
            {
              name: 'showFilters',
              type: 'checkbox',
              label: 'Toon categorie filters',
              defaultValue: true,
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'CTA knop tekst',
              defaultValue: 'Start gratis proefperiode',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'CTA knop link',
              admin: {
                description: 'Optioneel: laat leeg om het formulier te openen',
              },
            },
          ],
        },
        // Stats Section Block
        {
          slug: 'stats',
          labels: {
            singular: 'Statistieken Sectie',
            plural: 'Statistieken Secties',
          },
          fields: [
            {
              name: 'stats',
              type: 'array',
              label: 'Statistieken',
              minRows: 1,
              maxRows: 4,
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  label: 'Waarde',
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label',
                },
              ],
            },
          ],
        },
        // Testimonials Section Block
        {
          slug: 'testimonials',
          labels: {
            singular: 'Testimonials Sectie',
            plural: 'Testimonials Secties',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              defaultValue: 'The proof is in the pudding',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'testimonials',
              type: 'relationship',
              relationTo: 'testimonials',
              hasMany: true,
              label: 'Testimonials',
            },
          ],
        },
        // Pricing Section Block
        {
          slug: 'pricing',
          labels: {
            singular: 'Prijzen Sectie',
            plural: 'Prijzen Secties',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              defaultValue: 'Prijzen',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Ondertitel',
            },
            {
              name: 'plans',
              type: 'relationship',
              relationTo: 'pricing-plans',
              hasMany: true,
              label: 'Prijsplannen',
            },
          ],
        },
        // Callout Section Block (dark background with effects)
        {
          slug: 'callout',
          labels: {
            singular: 'Callout Sectie',
            plural: 'Callout Secties',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Beschrijving',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'Knop tekst',
              defaultValue: 'Start gratis proefperiode',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'Knop link',
              admin: {
                description: 'Optioneel: laat leeg om het formulier te openen',
              },
            },
          ],
        },
        // CTA Section Block (simple, no background)
        {
          slug: 'cta',
          labels: {
            singular: 'CTA Sectie',
            plural: 'CTA Secties',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Beschrijving',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'Knop tekst',
              defaultValue: 'Start gratis proefperiode',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'Knop link',
              admin: {
                description: 'Optioneel: laat leeg om het formulier te openen',
              },
            },
          ],
        },
        // Rich Text Block
        {
          slug: 'richText',
          labels: {
            singular: 'Tekst Blok',
            plural: 'Tekst Blokken',
          },
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Inhoud',
            },
          ],
        },
        // FAQ Section Block
        {
          slug: 'faq',
          labels: {
            singular: 'FAQ Sectie',
            plural: 'FAQ Secties',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              defaultValue: 'Veelgestelde vragen',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Ondertitel',
            },
            {
              name: 'items',
              type: 'relationship',
              relationTo: 'faq',
              hasMany: true,
              label: 'FAQ items',
            },
          ],
        },
        // Blog List Block
        {
          slug: 'blogList',
          labels: {
            singular: 'Blog Overzicht',
            plural: 'Blog Overzichten',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              defaultValue: 'Blog',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Ondertitel',
            },
            {
              name: 'showFeatured',
              type: 'checkbox',
              label: 'Toon uitgelichte post',
              defaultValue: true,
            },
            {
              name: 'postsPerPage',
              type: 'number',
              label: 'Posts per pagina',
              defaultValue: 9,
              min: 3,
              max: 24,
            },
          ],
        },
        // Contact Section Block (combined form + info in grid)
        {
          slug: 'contactSection',
          labels: {
            singular: 'Contact Sectie',
            plural: 'Contact Secties',
          },
          fields: [
            {
              name: 'formTitle',
              type: 'text',
              label: 'Formulier Titel',
              defaultValue: 'Stuur ons een bericht',
            },
            {
              name: 'formDescription',
              type: 'textarea',
              label: 'Formulier Beschrijving',
            },
            {
              name: 'submitButtonText',
              type: 'text',
              label: 'Verzendknop tekst',
              defaultValue: 'Verstuur bericht',
            },
            {
              name: 'infoTitle',
              type: 'text',
              label: 'Info Titel',
              defaultValue: 'Contactgegevens',
            },
            {
              name: 'showMap',
              type: 'checkbox',
              label: 'Toon Google Maps',
              defaultValue: true,
            },
          ],
        },
        // Icon Cards Block (for values, benefits, etc.)
        {
          slug: 'iconCards',
          labels: {
            singular: 'Icoon Kaarten',
            plural: 'Icoon Kaarten Blokken',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Sectie Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Ondertitel',
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Kaarten',
              minRows: 1,
              maxRows: 8,
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icoon',
                  required: true,
                  options: [
                    { label: 'Target (doel)', value: 'target' },
                    { label: 'Zap (bliksem)', value: 'zap' },
                    { label: 'Heart (hart)', value: 'heart' },
                    { label: 'Users (gebruikers)', value: 'users' },
                    { label: 'Shield (schild)', value: 'shield' },
                    { label: 'Clock (klok)', value: 'clock' },
                    { label: 'Check (vinkje)', value: 'check' },
                    { label: 'Star (ster)', value: 'star' },
                    { label: 'Truck (vrachtwagen)', value: 'truck' },
                    { label: 'Package (pakket)', value: 'package' },
                    { label: 'BarChart (grafiek)', value: 'bar-chart' },
                    { label: 'Globe (wereld)', value: 'globe' },
                  ],
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Titel',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  label: 'Beschrijving',
                },
              ],
            },
            {
              name: 'columns',
              type: 'select',
              label: 'Kolommen',
              defaultValue: '2',
              options: [
                { label: '2 kolommen', value: '2' },
                { label: '3 kolommen', value: '3' },
                { label: '4 kolommen', value: '4' },
              ],
            },
            {
              name: 'backgroundColor',
              type: 'select',
              label: 'Achtergrondkleur',
              defaultValue: 'muted',
              options: [
                { label: 'Geen', value: 'none' },
                { label: 'Licht grijs', value: 'muted' },
              ],
            },
          ],
        },
        // Intro Block (for about page header)
        {
          slug: 'intro',
          labels: {
            singular: 'Intro Sectie',
            plural: 'Intro Secties',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Beschrijving',
            },
          ],
        },
        // Story Block (for about page)
        {
          slug: 'story',
          labels: {
            singular: 'Verhaal Sectie',
            plural: 'Verhaal Secties',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Inhoud',
            },
          ],
        },
        // Pricing Page Block (full pricing page with filters and comparison)
        {
          slug: 'pricingPage',
          labels: {
            singular: 'Prijzen Pagina',
            plural: 'Prijzen Pagina\'s',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              defaultValue: 'Prijzen',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              admin: {
                description: 'Gebruik *tekst* voor gekleurde highlight',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Ondertitel',
            },
            {
              name: 'plans',
              type: 'relationship',
              relationTo: 'pricing-plans',
              hasMany: true,
              label: 'Prijsplannen',
            },
            {
              name: 'showFilters',
              type: 'checkbox',
              label: 'Toon filters (orders/gebruikers sliders)',
              defaultValue: true,
            },
            {
              name: 'showComparison',
              type: 'checkbox',
              label: 'Toon vergelijkingstabel',
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Titel',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Beschrijving',
        },
      ],
    },
  ],
}
