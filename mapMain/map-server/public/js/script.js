// const socket=io()
// if(navigator.geolocation){
//     navigator.geolocation.watchPosition((position)=>{
//         const {latitude,longitude}=position.coords
//         socket.emit("send-location",{
//             latitude,
//             longitude
//         })
//     },
//     (error)=>{
//         console.error(error)
//     },
//     {
//         enableHighAccuracy:true,
//         timeout:5000,
//         maximumAge:0,
//     })
// }

// const map=L.map("map").setView([0,0],16)
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
//     attribution:"OpenSteetMap"
// }).addTo(map)

// const markers={}

// socket.on("receive-location",(location)=>{
//     const {id,latitude,longitude}=location
//     map.setView([latitude,longitude],12)
//     if(markers[id]){
//         markers[id].setLatLng([latitude,longitude])
//     }else{
//         markers[id]=L.marker([latitude,longitude]).addTo(map)
//     }
// })

// socket.on("user-disconnected",(id)=>{
//     if(markers[id]){
//        map.removeLayer(markers[id])   
//        delete markers[id]
//     }
// })

// socket.on("disconnect",(id)=>{})




    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pickup = urlParams.get('pickup');
    const dropoff = urlParams.get('dropoff');

    console.log('Initializing map with:', { pickup, dropoff });

    // Initialize map with error handling
    let map;
    let socket;
    let markers = {};
    let geolocationWatchId;

    function cleanup() {
        if (map) {
            map.remove();
            map = null;
        }
        if (socket) {
            socket.disconnect();
            socket = null;
        }
        markers = {};
        if (geolocationWatchId && navigator.geolocation) {
            navigator.geolocation.clearWatch(geolocationWatchId);
            geolocationWatchId = null;
        }
    }

    function initializeMap() {
        try {
            cleanup();
            
            // Initialize map with default view
            map = L.map('map').setView([0, 0], 2);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Handle resize
            window.addEventListener('message', (event) => {
                if (event.data === 'resize') {
                    map.invalidateSize();
                }
            });
            
            // Initialize socket and plot route
            initializeSocket();
            plotRoute();
            
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }

    function initializeSocket() {
        try {
            socket = io();
            
            socket.on('connect', () => {
                console.log('Connected to socket server');
            });
            
            socket.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });
            
            // Handle location updates
            socket.on('receive-location', (location) => {
                const { id, latitude, longitude } = location;
                if (markers[id]) {
                    markers[id].setLatLng([latitude, longitude]);
                } else {
                    markers[id] = L.marker([latitude, longitude]).addTo(map);
                }
            });
            
            socket.on('user-disconnected', (id) => {
                if (markers[id]) {
                    map.removeLayer(markers[id]);
                    delete markers[id];
                }
            });
            
            // Start geolocation tracking
            if (navigator.geolocation) {
                geolocationWatchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        socket.emit('send-location', { latitude, longitude });
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            }
            
        } catch (error) {
            console.error('Error initializing socket:', error);
        }
    }

    async function geocodeAddress(address) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon)
                };
            }
            throw new Error('No results found');
        } catch (error) {
            console.error('Geocoding error:', error);
            throw error;
        }
    }

    async function plotRoute() {
        try {
            if (!pickup || !dropoff) {
                throw new Error('Missing pickup or dropoff location');
            }
            
            const pickupCoords = await geocodeAddress(pickup);
            const dropoffCoords = await geocodeAddress(dropoff);
            
            // Add markers
            const pickupMarker = L.marker([pickupCoords.lat, pickupCoords.lng])
                .addTo(map)
                .bindPopup('Pickup Location');
            
            const dropoffMarker = L.marker([dropoffCoords.lat, dropoffCoords.lng])
                .addTo(map)
                .bindPopup('Dropoff Location');
            
            // Fit map to show both markers
            const bounds = L.latLngBounds([
                [pickupCoords.lat, pickupCoords.lng],
                [dropoffCoords.lat, dropoffCoords.lng]
            ]);
            map.fitBounds(bounds, { padding: [50, 50] });
            
            // Draw route line
            const routeLine = L.polyline(
                [
                    [pickupCoords.lat, pickupCoords.lng],
                    [dropoffCoords.lat, dropoffCoords.lng]
                ],
                { color: 'blue', weight: 5 }
            ).addTo(map);
            
        } catch (error) {
            console.error('Error plotting route:', error);
        }
    }

    // Initialize everything when the page loads
    document.addEventListener('DOMContentLoaded', initializeMap);

    // Cleanup when the page is unloaded
    window.addEventListener('beforeunload', cleanup);