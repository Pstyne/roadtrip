import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import { SearchBox } from "../searchbox/SearchBox";

export const RoadTripMap = () => {
  return (
    <MapContainer style={{height: '100vh', width: '75vw'}}  center={[38.047639685322494, -81.12339107346091]} zoom={13} zoomControl={false} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchBox />
      <ZoomControl position="bottomleft"/>
      <Marker position={[38.047639685322494, -81.12339107346091]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}