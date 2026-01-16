import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigatie',
  admin: {
    description: 'Beheer het hoofdmenu',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Menu items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Link',
          admin: {
            description: 'Bijv. "#functies" of "/contact"',
          },
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA knop tekst',
      defaultValue: 'Gratis proberen',
    },
    {
      name: 'loginText',
      type: 'text',
      label: 'Login tekst',
      defaultValue: 'Inloggen',
    },
    {
      name: 'loginUrl',
      type: 'text',
      label: 'Login URL',
      defaultValue: 'https://app.pickhero.nl',
    },
  ],
}
