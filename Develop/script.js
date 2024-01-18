// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Display Current Day
  var currentDayElement = $("#currentDay");
  var currentDate = dayjs().format("dddd, MMMM D");
  currentDayElement.text(currentDate);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var description = $(this).siblings(".description").val();
    console.log("Clicked Save for:", timeBlockId, "with description:", description);
    localStorage.setItem(timeBlockId, description);
  });

      // Time Block Coloring
      function updateTimeBlockColor() {
        var currentHour = dayjs().hour();
    
        $(".time-block").each(function () {
          var blockHour = parseInt($(this).attr("id").split("-")[1]);
    
          if (blockHour < currentHour) {
            $(this).removeClass("present future").addClass("past");
          } else if (blockHour === currentHour) {
            $(this).removeClass("past future").addClass("present");
          } else {
            $(this).removeClass("past present").addClass("future");
          }
        });
      }

      function displaySavedEvents() {
        $(".time-block").each(function () {
          var timeBlockId = $(this).attr("id");
          var savedDescription = localStorage.getItem(timeBlockId);
          $(this).children(".description").val(savedDescription);
        });
      }
    
      // Call functions on page load
      updateTimeBlockColor();
      displaySavedEvents();
    
      // Update time block colors every minute
      // Update time block colors every minute
      setInterval(updateTimeBlockColor, 60 * 1000);

    });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
