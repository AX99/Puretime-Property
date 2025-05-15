import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, Popup, NavigationControl } from 'react-map-gl';
import { FaBed, FaBath, FaHome, FaPoundSign } from 'react-icons/fa';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * MapboxMap component for displaying property location using Mapbox GL JS
 */
const MapboxMap = ({
  latitude,
  longitude,
  zoom,
  title,
  address,
  propertyData = {}
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom
  });

  // Update viewState when props change
  useEffect(() => {
    setViewState(prevState => ({
      ...prevState,
      latitude,
      longitude,
      zoom
    }));
  }, [latitude, longitude, zoom]);

  // Format price if available
  const formattedPrice = propertyData.price
    ? new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: propertyData.priceUnit?.toUpperCase() || 'GBP',
        maximumFractionDigits: 0
      }).format(propertyData.price)
    : null;

  // Get Mapbox token from environment variable
  const mapboxToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={mapboxToken}
      attributionControl={true}
      style={{ width: '100%', height: '100%' }}
      reuseMaps
    >
      <NavigationControl position="top-right" />
      
      <Marker
        latitude={latitude}
        longitude={longitude}
        color="#bf4040"
        onClick={() => setShowPopup(true)}
      />

      {showPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
          closeButton={true}
          closeOnClick={false}
          className="property-popup"
          maxWidth="300px"
        >
          <div className="p-2">
            <h3 className="font-semibold text-md mb-1">{title}</h3>
            {address && <p className="text-sm mb-2">{address}</p>}
            
            {formattedPrice && (
              <div className="flex items-center mb-1">
                <FaPoundSign className="text-primary-600 mr-1 text-xs" />
                <span className="text-sm font-medium">{formattedPrice}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {propertyData.bedrooms && (
                <div className="flex items-center text-xs">
                  <FaBed className="text-primary-600 mr-1" />
                  <span>{propertyData.bedrooms} Bed</span>
                </div>
              )}
              
              {propertyData.bathrooms && (
                <div className="flex items-center text-xs">
                  <FaBath className="text-primary-600 mr-1" />
                  <span>{propertyData.bathrooms} Bath</span>
                </div>
              )}
              
              {propertyData.propertyType && (
                <div className="flex items-center text-xs">
                  <FaHome className="text-primary-600 mr-1" />
                  <span>{propertyData.propertyType}</span>
                </div>
              )}
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
};

MapboxMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  title: PropTypes.string,
  address: PropTypes.string,
  propertyData: PropTypes.object
};

export default MapboxMap; 