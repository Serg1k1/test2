export const getLatLng = async (placeId) => {
    const coordinates = {
        latitude: null,
        longitude: null
    }
    const geocoder = new window.google.maps.Geocoder();
    await geocoder.geocode({ 'placeId': placeId }, function (results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                const latitude = results[0].geometry.location.lat();
                const longitude = results[0].geometry.location.lng();
                coordinates.latitude = latitude;
                coordinates.longitude = longitude;
            }
        }
    });
    return coordinates;
}