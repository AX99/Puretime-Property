import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { syncGeofields } from './plugins/syncGeofields'

export default defineConfig({
  name: 'default',
  title: 'Puretime Property Purchasing',

  projectId: `${process.env.SANITY_STUDIO_PROJECT_ID}`,
  dataset: `${process.env.SANITY_STUDIO_DATASET}`,

  plugins: [
    structureTool(), 
    {
      name: 'property-geo-actions',
      document: {
        actions: (prev, context) => {
          // Only run on property documents
          if (context.schemaType === 'property') {
            return [...prev, syncGeofields]
          }
          return prev
        }
      }
    },
    visionTool()
  ],

  schema: {
    types: schemaTypes as any,
  },
})
