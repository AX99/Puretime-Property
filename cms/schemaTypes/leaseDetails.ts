import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'leaseDetails',
  title: 'Lease Details',
  type: 'object',
  fields: [
    defineField({
      name: 'leaseLength',
      title: 'Lease Length',
      type: 'number'
    }),
    defineField({
      name: 'leaseExpiry',
      title: 'Lease Expiry',
      type: 'date'
    }),
    defineField({
      name: 'leaseType',
      title: 'Lease Type',
      type: 'string'
    })
  ]
}) 