import { DocumentActionComponent } from 'sanity'

// This plugin is now deprecated as we've consolidated location data
// into the location.coordinates field, but we'll keep a no-op version
// to avoid breaking changes in the sanity.config.ts file
export const syncGeofields: DocumentActionComponent = () => {
  // No-op component that doesn't do anything anymore
  return null
} 