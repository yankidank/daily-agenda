var hours =  ['9', '10', '11', '12', '13', '14', '15', '16', '17'];
var storedValues = Array.apply(0, Array(24)).map(function(){return '';});
var currentHour = Number(moment().format('H'));
var currentDayOfYear = moment().dayOfYear();
var newDayOfYear = currentDayOfYear;
var nextDayOfYear;
var prevDayOfYear;
var AMPM = '';
var itemTwelve;
var dayTrackPrev;
var dayTrackNext;
var sunrise;
var sunset;
var timestamp = Date.now()
$('h1').append(moment().format('dddd, MMMM Do'));
$('h3').html("<a onclick='dayChange(0)'>"+moment().dayOfYear(newDayOfYear).format('YYYY')+" Daily Agenda</a>");
function clearAgenda(){
  var removeAgenda = confirm("Are you sure that you want to remove all agenda items from your calendar?");
  if (removeAgenda == true) {
    window.localStorage.clear();
    location.reload();
  }
}
function displayTime() {
  var time = moment().format('LT');
  $('#clock').html(time);
  setTimeout(displayTime, 1000);
}
displayTime();
var hourViewStored = Number(window.localStorage.getItem("hourView"))
if (hourViewStored){
  hourView(hourViewStored)
  $("#mode option[value="+hourViewStored+"]").attr('selected', 'selected');
}
function hourView(selectedValue){
  if (selectedValue === 24){
    hours =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  } else {
    hours =  ['9', '10', '11', '12', '13', '14', '15', '16', '17'];
  }
  localStorage.setItem("hourView", selectedValue)
  hours.forEach(renderHour);
}
$("#mode").change(function () {
  var selectedValue = Number($(this).val())
  hourView(selectedValue)
});
function dayRender(){
  $('h3').html("<a onclick='dayChange(0)'>"+moment().dayOfYear(newDayOfYear).format('YYYY')+" Daily Agenda</a>");
  $('h1').html(moment().dayOfYear(newDayOfYear).format('dddd, MMMM Do'));
  storedValues = JSON.parse(window.localStorage.getItem("day_"+newDayOfYear))
  if (storedValues === null){
    storedValues = Array.apply(0, Array(24)).map(function(){return '';});
  }
  localStorage.setItem("dayView", newDayOfYear)
  $("#calendar").hide()
  $("#calendar").fadeIn(250)
  hours.forEach(renderHour);
}
$("#day").change(function () {
  //var selectedText = $(this).find("option:selected").text()
  var selectedValue = Number($(this).val())
  if (selectedValue === 0){
    newDayOfYear = currentDayOfYear
  } else {
    newDayOfYear = newDayOfYear + selectedValue
  }
  dayRender()
});
function dayChange(n){
  if (currentDayOfYear !== newDayOfYear){
    if (n === 0){
      newDayOfYear = currentDayOfYear
    } else {
      newDayOfYear = newDayOfYear + n
    }
    dayRender()
  }
}
function dayPrev(){
  newDayOfYear = newDayOfYear - 1
  dayRender()
}
function dayNext(){
  newDayOfYear = newDayOfYear + 1
  dayRender()
}
storedValues = JSON.parse(window.localStorage.getItem("day_"+currentDayOfYear))
if (storedValues === null){
   storedValues = Array.apply(0, Array(24)).map(function(){return '';});
}

var weatherAPI = '5ec45324b97dfab94d81259ceb9c7461'
var weatherDiv = document.getElementById("weather");
var weatherInner = document.createElement("div");
var getIP = 'http://ip-api.com/json/';
var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather'
$.getJSON(getIP).done(function(location) {
  $.getJSON(openWeatherMap, {
    lat: location.lat,
    lon: location.lon,
    units: 'imperial',
    APPID: weatherAPI
  }).done(function(weather) {
    $("#city").append(weather.name+" ");
    $("#weather").append(Math.round(weather.main.temp)+'° F');
    sunrise = weather.sys.sunrise
    localStorage.setItem("sunrise", sunrise)
    sunset = weather.sys.sunset
    localStorage.setItem("sunset", sunset)
    //console.log(weather)
  })
})
timestamp = (timestamp-(timestamp%1000))/1000;
if (localStorage.getItem("sunrise")){
  //console.log("sunrise loaded from localStorage")
} else {
  //console.log("sunrise missing from localStorage")
}
var sunriseStored = Number(window.localStorage.getItem("sunrise"))
var sunsetStored = Number(window.localStorage.getItem("sunset"))
var sunrise_plus = Number(sunriseStored) + 30 * 60
var sunrise_minus = sunriseStored - 30 * 60
var sunset_plus = sunsetStored + 30 * 60
var sunset_minus = sunsetStored + 30 * 60
// Detect URL mode parameter
var url_string = window.location.href
var url = new URL(url_string);
var viewMode = url.searchParams.get("mode");
var viewActive;
if (viewMode === "dark"){
  viewActive = "dark"
} else {
  viewActive = "light"
}
hours.forEach(renderHour);
function renderHour(item, index) {
  if (index === 0){
    $('#calendar').empty();
  }
  var savedText = storedValues[item]
  if (item < 12){
    AMPM = 'AM'
  } else {
    AMPM = 'PM'
  }
  if (item > 12){
    itemTwelve = item - 12
  } else {
    itemTwelve = item
  }
  if (itemTwelve == 0){
    itemTwelve = 12
  }
  // HTML for each hour
  $('#calendar').append('<div class="hour_wrapper"><div class="hour" id="hour_'+item+'"><div class="hour_num" id="hour_num_'+item+'">'+itemTwelve+' '+AMPM+'</div><div class="hour_item" id="hour_item_'+item+'"></div></div><div class="input"><div class="input_item field"><input class="input_field" type="text" name="hour_input" id="input_'+item+'" value="'+savedText+'"></div></div><div class="save" id="save_'+item+'"><div class="save_item" id="saveText_'+item+'"></div></div></div>');
  function savetoLocal(){
    inputValue = $("#input_"+item).val()
    storedValues.splice(item, 1, inputValue)
    localStorage.setItem("day_"+newDayOfYear, JSON.stringify(storedValues))
  }
  // Save input automatically
  var timeoutId;
  $('.input_field').on('input propertychange change', function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      savetoLocal();
    }, 600);
  });
  // Detect enter on keyboard
  $("#input_"+item ).on('keyup', function (e) {
    if (e.keyCode === 13) {
      savetoLocal()
      $('#save_'+item).empty();
      if (viewActive === "dark"){
        $('#save_'+item).prepend('<div class="checkWrapper"><img class="checkmark" src="./assets/img/check2.png" /></div>')
      } else {
        $('#save_'+item).prepend('<div class="checkWrapper"><img class="checkmark" src="./assets/img/checkmark.gif" /></div>')
      }
      setTimeout(function(){
        $('#save_'+item).empty();
      }, 1000);
    }
  });
  // Detect typing input
  $("#input_"+item).on("input", function() {
    savetoLocal();
    clearTimeout(timeoutId);
    $('#save_'+item).empty();
    $('#save_'+item).prepend('<div class="checkWrapper"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>')
    timeoutId = setTimeout(function() {
      $('#save_'+item).empty();
      if (viewActive === "dark"){
        $('#save_'+item).prepend('<div class="checkWrapper"><img class="checkmark" src="./assets/img/check2.png" /></div>')
      } else {
        $('#save_'+item).prepend('<div class="checkWrapper"><img class="checkmark" src="./assets/img/checkmark.gif" /></div>')
      }
      setTimeout(function(){
        $('#save_'+item).empty();
      }, 1000);
    }, 700);
  });
  // If the user clicks outside of the input, hide the type/save indicator
  $(document).mouseup(function(e){
    var container = $("#input_"+item);
    if (!container.is(e.target) && container.has(e.target).length === 0){
      $('#save_'+item).empty();
    }
  });
  // If the user tabs outside of the input, hide the type/save indicator
  $("#input_"+item).blur("input", function() {
    $('#save_'+item).empty();
  });
  if(item < currentHour && newDayOfYear === currentDayOfYear || newDayOfYear < currentDayOfYear){
    // Change the input field background color if the time has passed
    $("#input_"+item).addClass("input_field_past");
  } else if(item <= currentHour && currentDayOfYear === newDayOfYear){
    // Display an indicator icon next to the current hour
    $("#hour_"+item+" .hour_item").addClass("hour_indicator");
    $("#hour_num_"+item).addClass("hour_num_current");
  } 
}
// Dark mode switch
$('#modeCheck').click(function() {
  var checkMode1 = $('#modeCheck').prop('checked')
  var checkMode2 = $('#modeCheck').is(':checked')
  if (checkMode1 === true || checkMode2 === true){
    viewActive = 'dark'
    $('body').append('<link id="darkModeEnabled" href="./assets/css/dark.css" rel="stylesheet" />');    
  } else {
    viewActive = 'light'
    $( "#darkModeEnabled" ).remove();  
  }
});
if (viewMode === "light" || sunriseStored === 0 || sunsetStored === 0 ){
  viewActive = 'light'
  $("#modeCheck").removeAttr('checked');
} else if (viewMode === "dark" || timestamp < sunriseStored || timestamp > sunsetStored ){
  viewActive = 'dark'
  $("#modeCheck").attr('checked', 'checked');
  $('body').append('<link id ="darkModeEnabled" href="./assets/css/dark.css" rel="stylesheet" />');  
} else {
  viewActive = 'light'
  $("#modeCheck").removeAttr('checked');
  $( "#darkModeEnabled" ).remove();    
}
