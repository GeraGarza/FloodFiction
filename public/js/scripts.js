


function FindMe(usrTxt) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async postition => {
      const lat = postition.coords.latitude;
      const long = postition.coords.longitude;

      const data = { lat, long, usrTxt };
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
    });
  } else {
    console.log('geo is not available.')
  }

}



async function GetData() {

  // var gg = document.getElementById("DBid");
  const DB = document.querySelector('#DBid');

  // can be same as other api since this is with get, not post
  const response = await fetch('/api');
  const data = await response.json();

  // console.log(data)  
  var styles = "border-radius:25px; background:rgb(100, 30, 200); color:white; padding: 12px;";

  let subsWrapper = document.getElementById("temp");
  if (subsWrapper) {
    subsWrapper.remove();
  }

  const template = document.createElement('div');
  template.id = "temp";
  template.style.cssText = "background-color: rgb(120, 40, 220); border-radius: 25px;";

  for (item of data) {
    const root = document.createElement('div');
    root.style.cssText = styles;

    const mood = document.createElement('div');
    const metadata = document.createElement('div');
    metadata.style.fontSize = '9px';

    const usrTxt = document.createElement('div');
    const hor = document.createElement('hr');

    const btn = document.createElement("BUTTON");
    document.body.appendChild(btn);

    mood.textContent = `mood: ${item.status}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    metadata.textContent = `Location: ${item.lat.toFixed(2)} , ${item.long.toFixed(2)} | Time: ${dateString}`;
    usrTxt.textContent = `usrTxt: ${item.usrTxt}`
    btn.textContent = 'this is it';
    btn.classList = "btn btn-primary";
    btn.onclick = function () {
      deleteData(item._id);
    };

    root.append(mood, usrTxt, metadata, btn);
    template.append(root, hor);
    DB.append(template);
  }
}



function deleteData(id) {
  return fetch('/del/' + id, {
    method: 'delete'
  })
}


function DeleteDB() {
  let subsWrapper = document.getElementById("temp");
  if (subsWrapper) {
    subsWrapper.remove();
  }
}


function SubmitTxt() {
  var usrTxt = document.getElementById("myInput").value;
  document.getElementById("txtOut").textContent = usrTxt;
  FindMe(usrTxt);

}
