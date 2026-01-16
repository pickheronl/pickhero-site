import type { GlobalConfig } from 'payload'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'Contact Instellingen',
  admin: {
    description: 'Beheer contactgegevens voor de website',
  },
  fields: [
    {
      name: 'address',
      type: 'group',
      label: 'Adres',
      fields: [
        {
          name: 'street',
          type: 'text',
          label: 'Straat + nummer',
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'Postcode',
        },
        {
          name: 'city',
          type: 'text',
          label: 'Plaats',
        },
        {
          name: 'country',
          type: 'text',
          label: 'Land',
          defaultValue: 'Nederland',
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-mailadres',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefoonnummer',
    },
    {
      name: 'openingHours',
      type: 'text',
      label: 'Openingstijden',
      admin: {
        description: 'Bijv. "Ma-Vr: 09:00 - 17:00"',
      },
    },
    {
      name: 'mapsEmbedUrl',
      type: 'textarea',
      label: 'Google Maps Embed URL',
      admin: {
        description: 'De volledige iframe src URL van Google Maps',
      },
    },
    {
      name: 'formSettings',
      type: 'group',
      label: 'Formulier Instellingen',
      fields: [
        {
          name: 'recipientEmail',
          type: 'email',
          label: 'Ontvanger e-mailadres',
          admin: {
            description: 'E-mailadres waar contactformulier berichten naartoe gestuurd worden',
          },
        },
        {
          name: 'successMessage',
          type: 'text',
          label: 'Succes bericht',
          defaultValue: 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.',
        },
      ],
    },
  ],
}
