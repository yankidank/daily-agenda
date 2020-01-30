//const hours =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const hours =  ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
var localValues = new Array(24);
var storedValues = new Array(24);
var saveStatus = false;

$('h1').append(moment().format('dddd, MMMM Do'));

//window.localStorage.clear();
storedValues = JSON.parse(window.localStorage.getItem("storedValues"))
if (storedValues === null){
  storedValues = ['','','','','','','','','','Begin working','Work on presentation','Study new skill','Lunch break','','','','','','','','','','','']
  console.log('no values stored yet')
  console.log(storedValues)
} else {
  console.log('values from localStorage')
  console.log(storedValues)
}

hours.forEach(renderHour);

function renderHour(item, index) {
  var savedText = storedValues[item]
  //console.log(savedText)

  // HTML for each hour
  $('#calendar').append('<div class="hour_wrapper"><div class="hour" id="hour_'+item+'"><div class="hour_item">'+item+'</div></div><div class="input"><div class="input_item field"><input class="input_field" type="text" name="hour_input" id="input_'+item+'" value="'+savedText+'"></div></div><div class="save" id="save_'+item+'"><div class="save_item button_green" id="saveText_'+item+'">Save</div></div></div>');
  
  function savetoLocal(){
    // Assign input field value to a variable
    inputValue = $("#input_"+item).val()
    //console.log(inputValue + ' for ' +item)
    storedValues.splice(item, 1, inputValue)
    //console.log(storedValues)
    localStorage.setItem("storedValues", JSON.stringify(storedValues))
  }
  function saveFunction(){
    // Detect Save clicks 
    $( "#save_"+item ).click(function() {
      savetoLocal()
      $("#saveText_"+item).css( "background", "#2dac0e" );
    });
    // Detect input field submit (enter on keyboard)
    $("#input_"+item ).on('keyup', function (e) {
      if (e.keyCode === 13) {
        savetoLocal()
        $("#saveText_"+item).css( "background", "#2dac0e" );
      }
    });
  }
  // Save automatically less than 1 second after typing
  var timeoutId;
  $('.input_field').on('input propertychange change', function() {
    console.log('changed')
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      savetoLocal();
    }, 750);
  });
  // Check for manual save actions
  saveFunction()
  // Change the save button BG color
  $("#input_"+item).on("input", function() {
    $("#saveText_"+item).css( "background", "#d62e2e" );
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      $("#saveText_"+item).css( "background", "#2dac0e" );
    }, 750);
    saveStatus = false
  });
  // If the user clicks outside of the input, change the button to green
  $(document).mouseup(function(e){
      var container = $(".input_field");
      console.log('hi')
      if (!container.is(e.target) && container.has(e.target).length === 0) 
      {
        $("#saveText_"+item).css( "background", "#2dac0e" );
      }
  });

  // Change the .input_field bg color based on the time of day
/* 
  if(item < 12){
    console.log('less than 12')
    $("#input_"+item).css( "background", "#2dac0e" );
  } else {
    console.log('not less than 12')
  }
   */
}
