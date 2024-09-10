import { MAPS_API_KEY } from "@/lib/const";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapComponent from "./map";

const MapProvider = () => {
  return (
    <APIProvider apiKey={MAPS_API_KEY}>
      <MapComponent />
    </APIProvider>
  );
};
export default MapProvider;
