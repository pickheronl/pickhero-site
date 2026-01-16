import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'company', 'rating', 'isActive'],
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote',
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Naam',
    },
    {
      name: 'authorRole',
      type: 'text',
      label: 'Functie',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Bedrijf',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Sterren',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Actief',
      defaultValue: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sorteervolgorde',
      defaultValue: 0,
    },
  ],
}
