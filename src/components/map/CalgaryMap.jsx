// ============================================================================
// Calgary Map Component
// ============================================================================
// Displays OpenStreetMap centered on downtown Calgary
// Props: { filters } - filter criteria for stations/lines
// ============================================================================


import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

// component to set the map view 
const SetViewOnMount = ({ center, zoom}) => { 
    const map = useMap() // use the map from leaflet

    useEffect(() => {
        map.setView(center, zoom)
    }, [map, center, zoom])

    return null;
}

// Calgary Map component 
const CalgaryMap = ({ filters }) => { 
    // calgary coordinates (downtown center)
    const calgaryCenter = [51.0447, -114.0719];
    const defaultZoom = 14;

    return ( 
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
            <MapContainer
                center={calgaryCenter}
                zoom={defaultZoom}
                scrollWheelZoom={true}
                className='w-full h-full [&_.leaflet-tile-pane]:brightness-110 [&_.leaflet-tile-pane]:saturate-[0.6] [&_.leaflet-tile-pane]:contrast-95'
                zoomControl={true}    
            >
                {/* OpenStreetMap Tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Set initial view on load*/}
                <SetViewOnMount center={calgaryCenter} zoom={defaultZoom} />
            </MapContainer>
        </div>
    )
}

export default CalgaryMap;