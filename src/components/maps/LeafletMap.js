import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaBed, FaBath, FaHome, FaPoundSign } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';

/**
 * LeafletMap component for displaying property location using Leaflet
 * as a fallback when Mapbox is unavailable
 */
const LeafletMap = ({
  latitude,
  longitude,
  zoom,
  title,
  address,
  propertyData = {}
}) => {
  // Fix Leaflet marker icon issue in build
  useEffect(() => {
    // Fix Leaflet default icon paths in production builds
    const L = typeof window !== 'undefined' ? require('leaflet') : null;
    if (L) {
      // Only run this in browser environment
      delete L.Icon.Default.prototype._getIconUrl;
      
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    }
  }, []);

  // Format price if available
  const formattedPrice = propertyData.price
    ? new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: propertyData.priceUnit?.toUpperCase() || 'GBP',
        maximumFractionDigits: 0
      }).format(propertyData.price)
    : null;

  // Create a component to update map center when props change
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  // Only render the map on the client-side to avoid SSR issues with Leaflet
  if (typeof window === 'undefined') {
    return (
      <div className="bg-neutral-100 w-full h-full flex items-center justify-center">
        <p className="text-neutral-500">Map loading...</p>
      </div>
    );
  }

  // Import useMap hook only on client-side to fix SSR issues
  const { useMap } = require('react-leaflet');

  return (
    <MapContainer 
      center={[latitude, longitude]} 
      zoom={zoom} 
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <ChangeView center={[latitude, longitude]} zoom={zoom} />
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={[latitude, longitude]}>
        <Popup className="property-popup">
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
      </Marker>
    </MapContainer>
  );
};

LeafletMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  title: PropTypes.string,
  address: PropTypes.string,
  propertyData: PropTypes.object
};

export default LeafletMap; 