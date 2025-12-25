import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import ChangeView from "./ChangeView.jsx";

export default function WeatherMap({lat, lon}) {
    return (
        <>
            <h2 className="text-center heading">Your Location</h2>
            <MapContainer
                center={[lat, lon]}
                zoom={8}
                style={{height: "400px", width: "100%", borderRadius: "10px"}}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[lat, lon]}>
                    <Popup>Your location</Popup>
                </Marker>

                <ChangeView center={[lat, lon]} zoom={8}/>
            </MapContainer>
        </>

    );
}