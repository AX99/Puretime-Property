import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'object',
  fields: [
    defineField({
      name: 'street',
      title: 'Street Address',
      type: 'string'
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string'
    }),
    defineField({
      name: 'state',
      title: 'State/Province',
      type: 'string'
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'string'
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string'
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint'
    })
  ]
}) 