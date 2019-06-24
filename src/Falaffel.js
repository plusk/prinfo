import React, { useState, useEffect } from 'react';
import Script from 'react-load-script';
import { DateTime } from 'luxon';

const fallafelPlaceId = 'ChIJUyxTzZoxbUYRZW_wwSUIUFk'
const mapsApiKey = 'AIzaSyCGXAYCU315Z115dqgXmSA5k0Uy5nOHesY'
const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places&language=no`

const Falaffel = () => {
  const [falaffelHours, setfalaffelHours] = useState({ weekday_text: [] });
  const [apiLoaded, setApiLoaded] = useState(false);
  const dateTime = DateTime.local();

  const getFalaffelHours = () => {
    var request = {
      placeId: fallafelPlaceId,
      fields: ['opening_hours'],
    };

    /*global google*/
    const service = new google.maps.places.PlacesService(document.getElementById('attrs'));
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setfalaffelHours(place.opening_hours);
      } else {
        console.error(status);
      }
    });
  };

  useEffect(() => {
    if (apiLoaded) {
      getFalaffelHours();
    }
  }, [apiLoaded])

  return (
    <div className="wrapper">
      <Script onLoad={() => setApiLoaded(true)} onError={() => setApiLoaded(false)} url={apiUrl} />
      <h1>Falaffel</h1>
      <p>
        {
          falaffelHours.open_now
            ? 'Falaffelkompaniet er åpent!'
            : 'Falaffelkompaniet er stengt :('
        }
      </p>
      <p style={{ 'textTransform': 'capitalize' }}>{falaffelHours.weekday_text[dateTime.weekday - 1]}</p>
      <div id="attrs"></div>
    </div>
  );
}

export default Falaffel;
