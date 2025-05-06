import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'puretime',
  api: {
    projectId: `${process.env.SANITY_STUDIO_PROJECT_ID}`,
    dataset: `${process.env.SANITY_STUDIO_DATASET}`
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  
  /**
   * GraphQL API configuration
   * This enables the GraphQL API for your Sanity project
   */
  graphql: [
    {
      playground: true, // Enable GraphQL playground for development
      id: 'puretime-property-schema',
      tag: 'default', // Use 'default' tag for production
    }
  ]
})
