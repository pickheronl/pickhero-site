import type { CollectionConfig } from 'payload'

export const PricingPlans: CollectionConfig = {
  slug: 'pricing-plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'priceMonthly', 'isPopular', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Plan naam',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
    },
    {
      name: 'priceMonthly',
      type: 'number',
      label: 'Prijs per maand (€)',
    },
    {
      name: 'priceDiscounted',
      type: 'number',
      label: 'Actieprijs per maand (€)',
      admin: {
        description: 'Optioneel: korting voor eerste periode',
      },
    },
    {
      name: 'isEnterprise',
      type: 'checkbox',
      label: 'Enterprise plan (prijs op aanvraag)',
      defaultValue: false,
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      label: 'Meest gekozen',
      defaultValue: false,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Functies',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Functie',
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Knop tekst',
      defaultValue: 'Start gratis proefperiode',
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
