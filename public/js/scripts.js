const form = document.querySelector('form'); //grabbing element on pg
const loadingElement = document.querySelector('.loading');
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'http://localhost:5000';

const dbsElement = document.querySelector('.db-div');


loadingElement.style.display = 'none';

ShowData();


form.addEventListener('submit', async (event) => {
  event.preventDefault(); // donest regenerate a new page, we can decide what to do.
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  if(name.length < 1 || content.length < 1)return;
  
  const data = {
    name,
    content
  };
  form.style.display = 'none';
  loadingElement.style.display = '';

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const response = await fetch(API_URL + '/db', options);
  const dataAdded = await response.json();
  form.reset();
  form.style.display = '';
  ShowData();
  loadingElement.style.display = 'none';

})


async function ShowData() {

  dbsElement.innerHTML = '';

  // can be same as other api since this is with get, not post
  const response = await fetch(API_URL + '/db');
  const data = await response.json();

  var styles = "border-radius:25px; background:rgb(100, 30, 200); color:white; padding: 12px;";


  for (item of data) {
    const div = document.createElement('div');
    div.style.cssText = styles;

    const name = document.createElement('h3');
    const content = document.createElement('small');
    const metadata = document.createElement('small');
    const usrTxt = document.createElement('div');
    const hor = document.createElement('hr');
    const btn = document.createElement("BUTTON");
    name.textContent = item.name;
    content.textContent = `Content: ${item.content}`
    const dateString = new Date(item.created).toLocaleString();
    metadata.textContent = `Time: ${dateString}`;
    btn.textContent = 'X';
    btn.classList = "btn btn-primary";
    btn.onclick = function () {
      deleteData(item._id);
    };

    div.append(name, content, usrTxt, metadata, btn);
    dbsElement.append(div, hor);
  }
}


function deleteData(id) {
  fetch(API_URL + '/del/' + id, {
    method: 'delete'
  }).then( () => {
    ShowData();
  })
}


function HideDB() {
  dbsElement.style.display = 'none';
}
function DataVisible(){
  dbsElement.style.display = '';
}

function DeleteDB() {
  fetch(API_URL + '/del', {
    method: 'delete'
  }).then( () => {
    ShowData();
  })
}


function SubmitTxt() {
  const inputElement = document.getElementById('myInput').textContent;

  if (inputElement.length < 1 || inputElement == 'Enter text...') return;
  document.getElementById("txtOut").textContent = inputElement;

}


