/* Global Variables */
// example zip 94040
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apikey = ',us&units=metric&appid=05393c9af4541188a3a52f9c3d1277cd'

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  // Create a new date instance dynamically with JS
  const d = new Date();
  const newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

  const zip = document.getElementById('zip').value;
  const user_response = document.getElementById('feelings').value;
  
  getTemp(baseURL,zip,apikey)
  .then((data)=>{
    postData('/add', {temperature: data.main.temp, date: newDate, user_response: user_response} );
  })
  .then(function() {
    updateUI()
  });  
}

const getTemp = async (baseURL, zip, apikey)=>{
  const res = await fetch(baseURL+zip+apikey)
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  console.log(data)
  const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  try {
    const newData = await response.json();
    //console.log(newData);
    return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temperature;
    document.getElementById('content').innerHTML = allData.user_response;

  }catch(error){
    console.log("error", error);
  }
}