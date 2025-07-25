import { MapContainer, Marker, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import backend from "../../../backend";
import { useParams, useSearchParams } from 'react-router-dom';
import {Error, Loading} from '../../common'


const Map = () => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        backend.buses.getBusPosition(id, searchParams.get('line')).then(data =>{
            setPosition(data.position);
            setError(data.error);
            setLoading(false);
        });
    }, []);

    if (loading){
        return(
            <Loading type='loading'/>
        )
    }
    

    if (position != null){
        return (
            <MapContainer center={[position.pos_y, position.pos_x]} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[position.pos_y, position.pos_x]}/>
            </MapContainer>
        );
    }

    if (error != null){
        return(
            <Error type='position'/>
        )
    }
}

export default Map;