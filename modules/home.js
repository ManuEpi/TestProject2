import React, {useEffect, useRef, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    View
} from 'react-native';
import MapView, {Marker} from "react-native-maps";
import {detectHeightByDevice} from "../helpers/device";
import {initializeMapLocation} from "../helpers/mapUtils";
import {getRestaurants} from "../services/mapServices";

const width = Dimensions.get('window').width;

function Home(props) {

    const mapRef = useRef(null);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [restaurants, setRestaurants] = useState([]);

    /**
     * Callback called if we successfully got a new location
     * @param newRegion
     * @returns {Promise<void>}
     */
    async function onGetLocation(newRegion) {

        setCurrentLatitude(newRegion.latitude)
        setCurrentLongitude(newRegion.longitude)
        setTimeout(() => {
            mapRef.current.animateToRegion(newRegion, 500)
        }, 10);
        await getAllRestaurants(newRegion.latitude, newRegion.longitude)
    }

    useEffect(() => {
        initializeMapLocation(currentLongitude, currentLatitude, onGetLocation);
    }, []);


    /**
     * Asynchronous call to get all restaurant around us
     * @param latitude
     * @param longitude
     * @returns {Promise<void>}
     */
    async function getAllRestaurants(latitude, longitude) {

        try {
            const restaurants = await getRestaurants(latitude, longitude)
            if (restaurants !== undefined && restaurants !== null
                && restaurants.data !== undefined && restaurants.data !== null
                && restaurants.data.statusCode !== undefined && restaurants.data.statusCode !== null && restaurants.data.statusCode === 200)
                setRestaurants(restaurants.data.restaurants);
        } catch (err) {
            console.log('Error :', err.toString());
        }
        /*getRestaurants(latitude, longitude).then(response => {
            if (response !== undefined && response !== null && response.data["statusCode"] === 200)
        })*/
    }

    /**
     * Rendering markers if we got them
     */
    function renderMarkers() {
        if (restaurants !== undefined && restaurants !== null && Object.keys(restaurants).length > 0) {
            return (restaurants.map((marker, i) => {
                if (marker !== undefined && marker !== null) {
                    return (
                        <Marker
                            image={marker.logo}
                            key={marker.id}
                            tracksViewChanges={false}
                            coordinate={{latitude: marker.lat, longitude: marker.long}}
                            title={marker.name}
                            description={marker.description}>
                        </Marker>
                    );
                }
            }));
        }
    }

    return (
        <View style={styles.container}>

            <MapView style={styles.mapStyle}
                     showsUserLocation={true}
                     userLocationAnnotationTitle={""}
                     ref={mapRef}>
                {renderMarkers()}
            </MapView>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapStyle: {
        width: width,
        height: detectHeightByDevice()
    },
    image: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        padding: 5,
    }
});
