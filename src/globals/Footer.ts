import type { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '@/hooks/revalidateCache'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  admin: {
    description: 'Beheer de footer inhoud',
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      label: 'Bedrijfsomschrijving',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Adres',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefoonnummer',
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-mailadres',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Menu kolommen',
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Kolom titel',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social media links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: 'Platform',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright tekst',
      admin: {
        description: 'Gebruik {{year}} voor het huidige jaar',
      },
    },
  ],
}
