import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
    description: 'Blog posts en artikelen',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      admin: {
        description: 'URL-vriendelijke versie van de titel (bijv. "mijn-eerste-blog-post")',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Samenvatting',
      admin: {
        description: 'Korte samenvatting voor in overzichten en SEO',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Inhoud',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categorie',
      options: [
        { label: 'Warehouse', value: 'warehouse' },
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'Integraties', value: 'integrations' },
        { label: 'Tips & Tricks', value: 'tips' },
        { label: 'Nieuws', value: 'news' },
        { label: 'Updates', value: 'updates' },
      ],
      admin: {
        description: 'Categorie voor filtering',
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Auteur',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Uitgelichte afbeelding',
    },
    {
      name: 'readTimeMinutes',
      type: 'number',
      label: 'Leestijd (minuten)',
      min: 1,
      defaultValue: 5,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publicatiedatum',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Laat leeg voor concepten',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Gepubliceerd',
      defaultValue: false,
      admin: {
        description: 'Vink aan om het artikel zichtbaar te maken op de website',
      },
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
          admin: {
            description: 'Laat leeg om de post titel te gebruiken',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Beschrijving',
          admin: {
            description: 'Laat leeg om de samenvatting te gebruiken',
          },
        },
      ],
    },
  ],
}
