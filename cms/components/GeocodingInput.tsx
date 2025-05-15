import React, { useState, useEffect } from 'react'
import { Card, Button, Flex, Box, Text, Spinner } from '@sanity/ui'
import { SearchIcon, EarthGlobeIcon } from '@sanity/icons'
import { Map, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { StringInputProps, PatchEvent, set, unset, useFormValue } from 'sanity'

// Mapbox access token
const MAPBOX_TOKEN = process.env.SANITY_STUDIO_MAPBOX_TOKEN || ''

// Default center of UK if no coordinates are provided
const DEFAULT_LATITUDE = 51.507351
const DEFAULT_LONGITUDE = -0.127758

interface GeoPoint {
  _type: 'geopoint'
  lat: number
  lng: number
}

// Extend the StringInputProps to include document property
interface GeocodingInputProps extends Omit<StringInputProps, 'document'> {
  document?: any
}

const GeocodingInput = React.forwardRef<HTMLDivElement, GeocodingInputProps>((props, ref) => {
  const { 
    value,
    onChange,
    readOnly,
    schemaType,
    document: documentProp = {}
  } = props
  
  const typedValue = value as unknown as GeoPoint
  
  // Access parent field values
  const parentPath = props.path?.slice(0, -1) || []
  const street = useFormValue(['street']) as string || useFormValue([...parentPath, 'street']) as string
  const city = useFormValue(['city']) as string || useFormValue([...parentPath, 'city']) as string
  const state = useFormValue(['state']) as string || useFormValue([...parentPath, 'state']) as string
  const postalCode = useFormValue(['postalCode']) as string || useFormValue([...parentPath, 'postalCode']) as string
  const country = useFormValue(['country']) as string || useFormValue([...parentPath, 'country']) as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewState, setViewState] = useState({
    latitude: typedValue?.lat || DEFAULT_LATITUDE,
    longitude: typedValue?.lng || DEFAULT_LONGITUDE,
    zoom: 13
  })
  
  // Update value helper
  const updateValue = (geopoint: GeoPoint | null) => {
    const patch = geopoint ? set(geopoint) : unset()
    onChange(patch)
  }
  
  // Use UK default coordinates
  const useUkDefault = () => {
    updateValue({
      _type: 'geopoint',
      lat: DEFAULT_LATITUDE,
      lng: DEFAULT_LONGITUDE
    })
    
    setViewState(prev => ({
      ...prev,
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE
    }))
  }
  
  // Initialize with default coordinates if needed
  useEffect(() => {
    const hasNoCoordinates = !typedValue?.lat || !typedValue?.lng
    if (hasNoCoordinates) {
      useUkDefault()
    }
  }, [])
  
  // Update the view when the value changes
  useEffect(() => {
    if (typedValue?.lat && typedValue?.lng) {
      setViewState(prev => ({
        ...prev,
        latitude: typedValue.lat,
        longitude: typedValue.lng
      }))
    }
  }, [typedValue])
  
  // Function to geocode the address from location fields
  const geocodeAddress = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Build address from form values directly
      const addressParts = [
        street,
        city,
        state,
        postalCode,
        country
      ].filter(Boolean)
      
      if (addressParts.length < 2) {
        throw new Error('Please enter at least a city and country in the location section.')
      }
      
      const addressString = addressParts.join(', ')
      
      // Call the geocoding API with this address string
      await geocodeAddressString(addressString)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Geocode an address string
  const geocodeAddressString = async (addressString: string) => {
    try {
      // Call Mapbox geocoding API
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addressString)}.json?access_token=${MAPBOX_TOKEN}&limit=1`
      )
      
      if (!response.ok) {
        throw new Error('Geocoding request failed')
      }
      
      const data = await response.json()
      
      if (!data.features || data.features.length === 0) {
        throw new Error('No results found for this address')
      }
      
      // Get coordinates from the result
      const [lng, lat] = data.features[0].center
      
      // Update the field value
      updateValue({
        _type: 'geopoint',
        lat,
        lng
      })
      
      // Update view state
      setViewState(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Handle map click to set marker position
  const handleMapClick = (event: any) => {
    if (readOnly) return
    
    const { lng, lat } = event.lngLat
    
    // Update the field value
    updateValue({
      _type: 'geopoint',
      lat,
      lng
    })
  }
  
  return (
    <Flex direction="column" gap={3}>
      <Flex gap={2} wrap="wrap">
        <Button 
          icon={SearchIcon} 
          text="Geocode from Address" 
          tone="primary" 
          mode="ghost"
          disabled={isLoading || readOnly}
          onClick={geocodeAddress}
        />

        <Button 
          icon={EarthGlobeIcon}
          text="Use UK Default" 
          tone="default" 
          mode="ghost"
          disabled={isLoading || readOnly}
          onClick={useUkDefault}
        />
      </Flex>
      
      <Text size={1} muted>
        New properties start with UK default coordinates. Once you add an address above, click "Geocode from Address" to update.
      </Text>
      
      {isLoading && <Spinner />}
      
      {error && (
        <Card padding={3} tone="critical">
          <Text>{error}</Text>
        </Card>
      )}
      
      <Box style={{ height: 300, width: '100%', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
        <Map
          {...viewState}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMove={evt => setViewState(evt.viewState)}
          onClick={handleMapClick}
        >
          {typedValue?.lat !== undefined && typedValue?.lng !== undefined && (
            <Marker 
              longitude={typedValue.lng} 
              latitude={typedValue.lat} 
              color="#ff0000" 
            />
          )}
        </Map>
      </Box>
      
      {typedValue?.lat !== undefined && typedValue?.lng !== undefined ? (
        <Flex direction="column" gap={2}>
          <Text size={1}>
            Latitude: {typedValue.lat.toFixed(6)}, Longitude: {typedValue.lng.toFixed(6)}
          </Text>
          <Text size={1} muted>
            Click directly on the map to set a precise location
          </Text>
        </Flex>
      ) : (
        <Text size={1} muted>
          No coordinates set. Use the buttons above or click the map to set a location.
        </Text>
      )}
    </Flex>
  )
})

export default GeocodingInput 