/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=97b1cc26558e8d52ac7f310754ab0b55&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', () => {
   //console.log("generate"); //test
   const userZip = document.getElementById('zip').value;
   //console.log(userZip); //test
   const feeling = document.getElementById('feelings').value;
   //console.log(feeling); //test
   //api call
   getWeather(baseURL, userZip, apiKey)
      //chain promises
      .then((data) => {
         //call postWeather to send data to the server
         postWeather('/add', {
            temp: data,
            date: newDate,
            feeling: feeling
         })
      })
      //call update UI
      .then(() => updateUI());
});
/* Function to GET Web API Data*/
async function getWeather(baseURL, zipCode, Key) {
   // res equals to the result of fetch function

   //call the api with the url and wait response
   const res = await fetch(`${baseURL + zipCode}${Key}`);

   //console.log("get Weather"); //test

   try {
      //waith response and convert to json
      const receivedData = await res.json();
      const temp = receivedData.main.temp;
      const name = receivedData.name;
      //console.log(temp); //test
      //console.log(name);
      return ({
         temp: temp,
         name: receivedData.name
      }) //return temp and city name
   }
   //catch errors
   catch (error) {
      console.log("error", error);
   }

}

/* Function to GET Project Data */
async function updateUI() {
   const request = await fetch('/all');
   try {
      const allData = await request.json();
      //console.log("data returned from the server"); //test
      //console.log(allData);
      //update elements with the received data
      document.getElementById('date').innerHTML = "Date: " + allData.date;
      document.getElementById('temp').innerHTML = allData.temp.temp + " degrees";
      document.getElementById('city').innerHTML = allData.temp.name + " city";
      document.getElementById('content').innerHTML = "Oh! I feel " + allData.content;
   } catch (error) {
      console.log("error", error);
   }
}

/* Function to POST data */
const postWeather = async (url = '', data = {}) => {
   //console.log(data);
   const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         date: data.date,
         temp: data.temp,
         content: data.feeling
      }), // body data type must match "Content-Type" header        
   });

   try {
      const newData = await response.json();
      //console.log(newData);
      return newData
   } catch (error) {
      console.log("error", error);
   }
}