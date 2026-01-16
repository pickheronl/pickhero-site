import type { GlobalConfig, Field } from 'payload'

// Reusable link fields for internal/external links
const linkFields: Field[] = [
  {
    name: 'linkType',
    type: 'radio',
    label: 'Link type',
    defaultValue: 'internal',
    options: [
      { label: 'Interne pagina', value: 'internal' },
      { label: 'Externe URL', value: 'external' },
      { label: 'Anchor (op pagina)', value: 'anchor' },
    ],
    admin: {
      layout: 'horizontal',
    },
  },
  {
    name: 'internalLink',
    type: 'relationship',
    relationTo: 'pages',
    label: 'Pagina',
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'internal',
    },
  },
  {
    name: 'externalUrl',
    type: 'text',
    label: 'Externe URL',
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'external',
      description: 'Volledige URL inclusief https://',
    },
  },
  {
    name: 'anchor',
    type: 'text',
    label: 'Anchor',
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'anchor',
      description: 'Bijv. "functies" wordt "#functies"',
    },
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    label: 'Open in nieuw tabblad',
    defaultValue: false,
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'external',
    },
  },
]

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
        ...linkFields,
        {
          name: 'hasSubmenu',
          type: 'checkbox',
          label: 'Heeft submenu',
          defaultValue: false,
        },
        {
          name: 'submenuItems',
          type: 'array',
          label: 'Submenu items',
          admin: {
            condition: (_, siblingData) => siblingData?.hasSubmenu,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
            },
            {
              name: 'description',
              type: 'text',
              label: 'Beschrijving',
              admin: {
                description: 'Optionele korte beschrijving onder het label',
              },
            },
            ...linkFields,
          ],
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
