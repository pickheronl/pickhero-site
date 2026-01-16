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
          ],
        },
        // Integrations Ticker Block (for homepage - animated slider)
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
        // CTA Section Block
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
