//helper functions
var dayOfWeek = "";
var url = '';
function formatDate(date, month, year)
{
  month = (month.length < 2) ? ('0' + month) : month;
  date = (date.length < 2)? ('0' + date) : date;
  return [year,month,date].join('-');
}
function getDayofWeek(date, month, year){
  var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayOfWeek =  week_names[new Date([month,date,year].join('-')).getDay()];
}
function getFarenheitTemp(temp){
  return (9*temp/5)+32;
}

function updateURL() {
  url ='https://api.weatherstack.com/forecast?access_key=5bc82451636190abd9d7afe6fe9b20b5&query=' + document.getElementById("latitude").value + document.getElementById("longitude").value + '&forecast_days=5';
}
//run when the document object model is ready for javascript code to execute
$(document).ready(function() {
  url ='https://api.weatherstack.com/forecast?access_key=5bc82451636190abd9d7afe6fe9b20b5&query=40.015,-105.27&forecast_days=5'; //Place your weatherstack API Call Here - access_key to be used: 5bc82451636190abd9d7afe6fe9b20b5

  $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
    console.log(data);//Review all of the data returned
    console.log("Current Temp: " + data.current.temperature);//View Today's Temp
    var current_time = new Date(data.location.localtime);//Retrieve the current timestamp
    console.log(current_time.getDay());

    document.getElementById("local_time").innerHTML = current_time;
    
    document.getElementById("image_today").src = data.current.weather_icons[0]; 

    document.getElementById("heading").innerHTML = "Today's Weather Forecast - " + data.location.name;

    var x = getFarenheitTemp(data.current.temperature);
    document.getElementById("temp_today").innerHTML = x;

    if(x > 85.0) {
      document.getElementById("thermometer_inner").style.backgroundColor = "red";  
    } else if(x < 65.0) {
      document.getElementById("thermometer_inner").style.backgroundColor = "blue";  
    } else {
      document.getElementById("thermometer_inner").style.backgroundColor = "gray";  
    }
    document.getElementById("thermometer_inner").style.height = x + "%";

    document.getElementById("precip_today").innerHTML = data.current.precip + "%";
    document.getElementById("humidity_today").innerHTML = data.current.humidity + "%";
    document.getElementById("wind_today").innerHTML = data.current.wind_speed;

    document.getElementById("summary_today").innerHTML = data.current.weather_descriptions;
    /*
      Read the current weather information from the data point values [https://weatherstack.com/documentation] to
      update the webpage for today's weather:
    */
    //helper function - to be used to get the key for each of the 5 days in the future when creating cards for forecasting weather
    function getKey(i){
        var week_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
        dayOfWeek=week_names[new Date(Object.keys(data.forecast)[i]).getDay()];
        return data.forecast[Object.keys(data.forecast)[i]];
    }
    /* Process the daily forecast for the next 5 days */

    /*
      For the next 5 days you'll need to add a new card listing:
        1. The day of the week
        2. The temperature high
        3. The temperature low
        4. Sunrise
        5. Sunset

      Each card should use the following format:
      <div style="width: 20%;">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><!-- List Day of the Week Here --></h5>
            <p class="card-text">High:<!--List Temperature High --> <br>
              Low: <!-- List Temperature Low --><br>
              Sunrise: <!-- List Time of Sunrise --><br>
              Sunset: <!-- List Time of Sunset --></p>
          </div>
        </div>
      </div>

      <Hint1 - To access the forecast data> You need to make sure to carefully see the JSON response to see how to access the forecast data. While creating the key to access forecast data make sure to convert it into a string using the toString() method.

      <Hint2 - To add the cards to the HTML> - Make sure to use string concatenation to add the html code for the daily weather cards.  This should
      be set to the innerHTML for the 5_day_forecast.
    */


    var deck = document.getElementById("5_day_forecast"); 
    var i,card,day;
    for(i = 0;i < 5; i++) {
      day = getKey(i); 
      card = '<div style="width: 20%;"><div class="card"><div class="card-body"><h5 class="card-title">' + dayOfWeek + '</h5><p class="card-text">High:' + day.maxtemp + '<br>Low: ' + day.mintemp + '<br>Sunrise: ' + day.astro.sunrise + ' <br>Sunset: ' + day.astro.sunset + ' </p></div></div></div>';
      deck.insertAdjacentHTML("beforeend", card);
    }
    // How do I get the date to access forecast?
  })
});
