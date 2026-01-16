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
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'Titel highlight',
              admin: {
                description: 'Deel van de titel met kleur accent',
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
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Dashboard afbeelding',
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
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'Titel highlight',
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
        // Integrations Section Block
        {
          slug: 'integrations',
          labels: {
            singular: 'Integraties Sectie',
            plural: 'Integraties Secties',
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
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'Titel highlight',
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
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'CTA tekst',
              defaultValue: 'Mis je een integratie? Laat het ons weten',
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
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'Titel highlight',
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
            },
            {
              name: 'titleHighlight',
              type: 'text',
              label: 'Titel highlight',
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
