import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useCities } from '../../contexts/CitiesContext';
import { LatLngExpression } from 'leaflet';
import { flagEmojiToPNG } from '../../utils';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useUrlPosition } from '../../hooks/useUrlPosition';

import Button from '../Button/Button';
import styles from './Map.module.css';

const Map = function (): React.JSX.Element {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat !== null && mapLng !== null) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition !== null) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button
          type="position"
          onClick={getPosition}
        >
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => {
          return city.position.lat !== null && city.position.lng !== null ? (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <div>
                  <span>{flagEmojiToPNG(city.emoji)}</span>
                  <span>{city.cityName}</span>
                </div>
                {city.notes ? <span>{city.notes}</span> : null}
              </Popup>
            </Marker>
          ) : null;
        })}

        <ChangeCenter position={mapPosition} />
        <DetectMapClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = function ({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position, 10);
  return null;
};

const DetectMapClick = function () {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
};

export default Map;
