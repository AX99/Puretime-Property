import {defineField, defineType} from 'sanity'
import GeocodingInput from '../components/GeocodingInput'

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Property Images',
      type: 'array',
      of: [{
        type: 'image', 
        options: {
          hotspot: true,
          storeOriginalFilename: true,
          accept: 'image/*'
        }
      }],
      options: {
        layout: 'grid'
      }
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceUnit',
      title: 'Price Unit',
      type: 'string',
      options: {
        list: [
          {title: 'GBP', value: 'gbp'},
          {title: 'EUR', value: 'eur'},
        ],
      },
      initialValue: 'gbp',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          {title: 'House', value: 'house'},
          {title: 'Flat', value: 'flat'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'customPropertyType',
      title: 'Specify Property Type',
      type: 'string',
      hidden: ({parent}) => parent?.propertyType !== 'other',
      validation: Rule => Rule.custom((value: string | undefined, context) => {
        const parent = context.parent as { propertyType?: string } | undefined;
        if (parent?.propertyType === 'other' && !value) {
          return 'Please specify the property type';
        }
        return true;
      })
    }),
    defineField({
      name: 'councilTaxBand',
      title: 'Council Tax Band',
      type: 'string',
      options: {
        list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      },
    }),
    defineField({
      name: 'tenure',
      title: 'Tenure',
      type: 'string',
      options: {
        list: ['Freehold', 'Leasehold'],
      },
    }),
    defineField({
      name: 'leaseDetails',
      title: 'Lease Details',
      type: 'leaseDetails',
      hidden: ({parent}) => parent?.tenure !== 'Leasehold',
    }),
    
    defineField({
      name: 'location',
      title: 'Location',
      type: 'location',
    }),
    defineField({
      name: 'area',
      title: 'Area (sq ft/m²)',
      type: 'number',
    }),
    defineField({
      name: 'areaUnit',
      title: 'Area Unit',
      type: 'string',
      options: {
        list: [
          {title: 'sq ft', value: 'sqft'},
          {title: 'sq m', value: 'sqm'},
        ],
      },
      initialValue: 'sqft',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'URL',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'For Sale', value: 'for-sale'},
          {title: 'For Rent', value: 'for-rent'},
          {title: 'Sold', value: 'sold'},
          {title: 'Rented', value: 'rented'},
        ],
      },
      initialValue: 'for-sale',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'location.city',
      price: 'price',
    },
    prepare({title, media, subtitle, price}: {title: string, media: any, subtitle: string, price: number}) {
      return {
        title,
        media,
        subtitle: subtitle ? `${subtitle} - £${price}` : `£${price}`,
      }
    },
  },
}) 