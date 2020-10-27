$(document).ready(function(){

    var currentDateEL = $(".currentDate")
    var currentTime = moment()
    var formattedDate = currentTime.format( "dddd MMM do YYYY, hh:mm A")
    var startTime = 9
    var endTime = 18
  
    // Other ways of getting Current Date
    // var epochdate = Date.now()
    // var jsFormattedDate = new Date()
    
    currentDateEL.text(formattedDate)
  
    var itemsInLocalStorage = localStorage.setItem(hour, ".container",text)
    
    if(itemsInLocalStorage == null ){
  
      var currentHour = currentTime.hour()
      for (let index = startTime; index < endTime; index++) {
        var hour = moment().hour(index).format("hh:00 A")
  
        if(index<= currentHour && index+1 > currentHour){
          renderTimeSlots(hour, "present")
        } else if( index <= currentHour){
          renderTimeSlots(hour, "past")
        } else { 
          renderTimeSlots(hour, "future")
        }
      }
  
    } else { 
       var currentHour = currentTime.hour()
       var currentStuffInLocalStorage = JSON.parse(itemsInLocalStorage)
  
      for (let index = startTime; index < endTime; index++) {
        var hour = moment().hour(index).format("hh:00 A")
  
        var text;
         if(currentStuffInLocalStorage[hour] != undefined){
          text = currentStuffInLocalStorage[hour]
          console.log(hour)
          } else { 
            text= ""
          }
        
          if(index<= currentHour && index+1 > currentHour){
          renderTimeSlots(hour, "present", text)
        } else if( index <= currentHour){
          renderTimeSlots(hour, "past", text)
        } else { 
          renderTimeSlots(hour, "future", text)
        }
      }
    }
    
  
  })
  
  
  function renderTimeSlots (time, colorCode,text){
  
    var containerEl = $("<div>")  
    containerEl.addClass("row1")
    $(".row1").append(timeSlotEl);
    $(".row1").append(inputField);
    $(".row1").append(saveButton);
    
    // var containerEl = $("<div>")
    // containerEl.addClass("container")

    switch(colorCode){
      case "present": 
        containerEl.attr("style" , "background:maroon")
        break
      case "future": 
      containerEl.attr("style", "background:green")
        break
      default: 
      containerEl.attr("style", "background:gray")


    }

    
  
    var timeSlotEl = $("<div>")
    timeSlotEl.addClass("timeSlot")
    timeSlotEl.text(time)
    
    var inputField = $("<input>")
    inputField.addClass("inColor")
    inputField.attr("data-time", time)
    if(text){
      inputField.val(text)
    }
  
    var saveButton = $("<button>")
    saveButton.addClass("saveBtn")
    saveButton.text("💾")
  
    saveButton.on("click", onSave)
  
    containerEl.append(timeSlotEl, inputField, saveButton)
    $("#overallContainer").append(containerEl)
  
  }
  
  function onSave(){
    var selectedTimeBlock = $(this).parent()
    var inputField = selectedTimeBlock.find(":input")
    var valueOfField = inputField.val().trim()
    var keyOfInputField = inputField.attr("data-time")
  
  
    var currentStuffInLocalStorage = localStorage.getItem("dailyPlanner")
    if(currentStuffInLocalStorage == null){
     
      var lStorageObj = {
        [keyOfInputField] : valueOfField
      }
  
      localStorage.setItem("dailyPlanner", JSON.stringify(lStorageObj))
    } else { 
       currentStuffInLocalStorage = JSON.parse(currentStuffInLocalStorage)
  console.log(currentStuffInLocalStorage)
       currentStuffInLocalStorage[keyOfInputField] = valueOfField
  
      localStorage.setItem("dailyPlanner", JSON.stringify(currentStuffInLocalStorage))
  
    }
    

    console.log(currentStuffInLocalStorage)
  }
  