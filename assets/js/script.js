//const hours =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const hours =  ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
var localValues = new Array(24);
var storedValues = Array.apply(0, Array(24)).map(function(){return '';});
var currentHour = Number(moment().format('H'));
var AMPM = '';
var itemTwelve;
$('h1').append(moment().format('dddd, MMMM Do'));
function clearAgenda(){
  window.localStorage.clear();
  location.reload();
}
storedValues = JSON.parse(window.localStorage.getItem("storedValues"))
if (storedValues === null){
   storedValues = Array.apply(0, Array(24)).map(function(){return '';});
}
hours.forEach(renderHour);
function renderHour(item, index) {
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
  // HTML for each hour
  $('#calendar').append('<div class="hour_wrapper"><div class="hour" id="hour_'+item+'"><div class="hour_num"><div class="hour_item"></div>'+itemTwelve+' '+AMPM+'</div></div><div class="input"><div class="input_item field"><input class="input_field" type="text" name="hour_input" id="input_'+item+'" value="'+savedText+'"></div></div><div class="save" id="save_'+item+'"><div class="save_item" id="saveText_'+item+'"></div></div></div>');
  function savetoLocal(){
    inputValue = $("#input_"+item).val()
    storedValues.splice(item, 1, inputValue)
    localStorage.setItem("storedValues", JSON.stringify(storedValues))
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
      $('#save_'+item).prepend('<div class="checkWrapper"><img class="checkmark" src="./assets/img/checkmark.gif" /></div>')
      setTimeout(function(){
        $('#save_'+item).empty();
      }, 1000);
    }
  });
  // Detect typing input
  $("#input_"+item).on("input", function() {
    savetoLocal();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      $('#save_'+item).empty();
      $('#save_'+item).prepend('<div class="checkWrapper"><img class="checkmark" src="./assets/img/checkmark.gif" /></div>')
      setTimeout(function(){
        $('#save_'+item).empty();
      }, 1000);
    }, 600);
  });
  // If the user clicks outside of the input, display checkmark on save
/*   $(document).mouseup(function(e){
    var container = $("#input_"+item);
    if (!container.is(e.target) && container.has(e.target).length === 0){
      $('#save_'+item).empty();
      $('#save_'+item).prepend('<div class="checkWrapper"><img class="checkmark" src="./assets/img/checkmark.gif" /></div>')
      setTimeout(function(){
        $('#save_'+item).empty();
      }, 1000);
    }
  });  */
  if(item < currentHour){
    // Change the input field background color if the time has passed
    $("#input_"+item).css( "background", "rgb(250, 250, 249)" );
    $("#input_"+item).css( "color", "rgb(183, 183, 183)" );
  } else if(item <= currentHour){
    // Display an indicator icon next to the current hour
    $("#hour_"+item+" .hour_item").css( "background", "rgb(0, 211, 119)" );
    $("#hour_"+item+" .hour_item").css( "border-radius", "50%" );
  }
}