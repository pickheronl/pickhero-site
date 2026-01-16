import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'isActive', 'sortOrder'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: 'Icoon',
      options: [
        { label: 'Zap (Bliksem)', value: 'Zap' },
        { label: 'Package (Pakket)', value: 'Package' },
        { label: 'BarChart3 (Grafiek)', value: 'BarChart3' },
        { label: 'Smartphone', value: 'Smartphone' },
        { label: 'RefreshCw (Sync)', value: 'RefreshCw' },
        { label: 'Shield (Beveiliging)', value: 'Shield' },
        { label: 'Building2 (Bedrijf)', value: 'Building2' },
        { label: 'Clock (Klok)', value: 'Clock' },
        { label: 'ShoppingCart (Winkelwagen)', value: 'ShoppingCart' },
        { label: 'Hash (Serienummer)', value: 'Hash' },
        { label: 'Briefcase (Koffer)', value: 'Briefcase' },
        { label: 'Code (API)', value: 'Code' },
        { label: 'RotateCcw (Retour)', value: 'RotateCcw' },
        { label: 'Tag (Label)', value: 'Tag' },
        { label: 'Printer', value: 'Printer' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Korte beschrijving',
    },
    {
      name: 'extendedDescription',
      type: 'richText',
      label: 'Uitgebreide beschrijving',
      admin: {
        description: 'Wordt getoond in de popup/modal',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Afbeelding',
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
