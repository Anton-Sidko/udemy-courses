import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

const Map = function (): React.JSX.Element {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div
      className={styles.mapContainer}
      onClick={() => navigate('form')}
    >
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({
            lat: '42',
            lng: '14',
          });
        }}
      >
        Change pos
      </button>
    </div>
  );
};

export default Map;
