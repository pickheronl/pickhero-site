import type { CollectionConfig } from 'payload'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'isActive', 'sortOrder'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Naam',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categorie',
      options: [
        { label: 'Webshop Platform', value: 'webshop' },
        { label: 'Verzending', value: 'shipping' },
        { label: 'Boekhouding', value: 'accounting' },
        { label: 'ERP', value: 'erp' },
        { label: 'Marktplaats', value: 'marketplace' },
        { label: 'Overig', value: 'other' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Website URL',
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
