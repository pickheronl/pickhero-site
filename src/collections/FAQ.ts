import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'isActive', 'sortOrder'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Vraag',
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      label: 'Antwoord',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Categorie',
      admin: {
        description: 'Bijv. "Algemeen", "Prijzen", "Technisch"',
      },
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
