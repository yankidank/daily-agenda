
const hours =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
var localValues = new Array(24);
var storedValues = new Array(24);

//window.localStorage.clear();
storedValues = JSON.parse(window.localStorage.getItem("storedValues"));
if (storedValues === null){
  storedValues = ['Sample 1', 'Sample 2', 'Sample 3', 'Sample 4','','','','','','','','','','','','','','','','','','','','']
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
  $('#calendar').append('<div class="hour_wrapper"><div class="hour" id="hour_'+item+'"><div class="hour_item">'+item+'</div></div><div class="input"><div class="input_item field"><input class="input_field" type="text" name="hour_input" id="input_'+item+'" value="'+savedText+'"></div></div><div class="save" id="save_'+item+'"><div class="save_item button_green" id="save_'+item+'">Save</div></div></div>');
  
  // Detect Save clicks 
  // TODO: Detect input field submit (enter on keyboard)
  $( "#save_"+item ).click(function() {
    // Assign input field value to a variable
    inputValue = $("#input_"+item).val();
    //console.log(inputValue + ' for ' +item)
    storedValues.splice(index, 1, inputValue);
    //console.log(storedValues);
    localStorage.setItem("storedValues", JSON.stringify(storedValues));
  });


}



