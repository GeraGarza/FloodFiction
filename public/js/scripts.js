
window.onload = function () {

  FindMe();
  function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';


    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
      status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }

  document.querySelector('#find-me').addEventListener('click', geoFindMe);
}

function FindMe() {
  if ("geolocation" in navigator) {
    console.log('geo is available.')
    navigator.geolocation.getCurrentPosition(async postition => {
      console.log(postition)
      const lat = postition.coords.latitude;
      const long = postition.coords.longitude;
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = long;

      const data = { lat, long };
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      };

      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      const response = await fetch('/api', options);
      const json = await response.json();
      console.log(json)
    });
  } else {
    console.log('geo is not available.')
  }

}





async function GetData(a) {

  var gg = document.getElementById("DBid");
  // can be same as other api since this is with get, not post
  const response = await fetch('/api');
  const data = await response.json();
  // console.log(data)  
  var styles = "border-radius:25px; background:rgb(100, 30, 200); color:white; padding: 12px;";

  for (item of data) {
    const root = document.createElement('div');
    root.style.cssText = styles;

    const mood = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const hor = document.createElement('hr');


    mood.textContent = `mood: ${item.status}`;
    geo.textContent = `${item.lat} , ${item.long}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    root.append(mood, geo, date);
    gg.append(root, hor);
   
  }
}





function SubmitTxt() {
  var x = document.getElementById("myInput").value;
  document.getElementById("txtOut").innerHTML = x;
}
