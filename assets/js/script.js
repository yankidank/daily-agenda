
//const hours =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const hours =  ['9', '10', '11', '12', '13', '14', '15', '16', '17'];
var localValues = new Array(24);
var storedValues = new Array(24);
var saveStatus = false;

//window.localStorage.clear();
storedValues = JSON.parse(window.localStorage.getItem("storedValues"))
if (storedValues === null){
  storedValues = ['','','','','','','','','','Begin working','Work on presentation','Study new skill','Lunch break','','','','','','','','','','','']
  //console.log('no values stored yet')
  //console.log(storedValues)
} else {
  //console.log('values from localStorage')
  //console.log(storedValues)
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
    storedValues.splice(index, 1, inputValue)
    //console.log(storedValues)
    localStorage.setItem("storedValues", JSON.stringify(storedValues))
    saveStatus = true
    return saveStatus
  }
  function saveFunction(){
    // Detect Save clicks 
    $( "#save_"+item ).click(function() {
      savetoLocal()
    });
    // Detect input field submit (enter on keyboard)
    $("#input_"+item ).on('keyup', function (e) {
      if (e.keyCode === 13) {
        savetoLocal()
      }
    });
    return saveStatus
  }
  saveFunction()
  //console.log(saveStatus)
  $("#input_"+item).on("input", function() {
    //console.log(saveStatus + " : " + this.value);
    $("#saveText_"+item).css( "background", "#d62e2e" );
    if (saveFunction() === true){
      $("#saveText_"+item).css( "background", "#2dac0e" );
    }
  });

}

