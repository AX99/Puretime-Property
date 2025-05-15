import React, { useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';

// Lazy load map libraries to improve performance
const MapboxMap = React.lazy(() => import('./maps/MapboxMap'));
const LeafletMap = React.lazy(() => import('./maps/LeafletMap'));

// Loading fallback component
const MapLoading = () => (
  <div className="flex items-center justify-center bg-neutral-100 h-full w-full rounded-lg">
    <div className="text-neutral-500">Loading map...</div>
  </div>
);

/**
 * PropertyMap component that shows property location using either Mapbox GL JS or Leaflet
 * 
 * @param {Object} props - Component properties
 * @param {number} props.latitude - Property latitude
 * @param {number} props.longitude - Property longitude
 * @param {string} props.address - Property address for marker popup
 * @param {string} props.title - Property title for marker popup
 * @param {boolean} props.useMapboxFallback - Force fallback to Leaflet/OpenStreetMap
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.mapHeight - Map height (CSS value)
 * @param {number} props.zoom - Default zoom level
 * @param {Object} props.propertyData - Additional property data to display in popup
 */
const PropertyMap = ({
  latitude,
  longitude,
  address,
  title,
  useMapboxFallback = false,
  className = '',
  mapHeight = '400px',
  zoom = 15,
  propertyData = {}
}) => {
  const [useLeaflet, setUseLeaflet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Default London coordinates if no coordinates are provided
  const validLatitude = latitude || 51.507351;
  const validLongitude = longitude || -0.127758;

  useEffect(() => {
    // Determine which map library to use
    const checkMapboxAvailability = async () => {
      // Use Leaflet if explicitly requested by prop
      if (useMapboxFallback) {
        setUseLeaflet(true);
        setIsLoading(false);
        return;
      }

      // Check environment variables for fallback configuration
      const shouldUseFallback = process.env.GATSBY_USE_MAP_FALLBACK === 'true';
      const mapboxToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
      
      // Use Leaflet if explicitly configured or if no Mapbox token available
      if (shouldUseFallback || !mapboxToken) {
        setUseLeaflet(true);
      }
      
      setIsLoading(false);
    };

    checkMapboxAvailability();
  }, [useMapboxFallback]);

  if (isLoading) {
    return <MapLoading />;
  }

  return (
    <div 
      className={`property-map relative rounded-lg overflow-hidden ${className}`} 
      style={{ height: mapHeight }}
    >
      <Suspense fallback={<MapLoading />}>
        {useLeaflet ? (
          <LeafletMap
            latitude={validLatitude}
            longitude={validLongitude}
            zoom={zoom}
            title={title}
            address={address}
            propertyData={propertyData}
          />
        ) : (
          <MapboxMap
            latitude={validLatitude}
            longitude={validLongitude}
            zoom={zoom}
            title={title}
            address={address}
            propertyData={propertyData}
          />
        )}
      </Suspense>
    </div>
  );
};

PropertyMap.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  address: PropTypes.string,
  title: PropTypes.string,
  useMapboxFallback: PropTypes.bool,
  className: PropTypes.string,
  mapHeight: PropTypes.string,
  zoom: PropTypes.number,
  propertyData: PropTypes.object
};

export default PropertyMap; 