// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add code to display the current date in the header of the page.
  var currentDayElement = $("#currentDay");
  var currentDate = dayjs().format("dddd, MMMM D");
  currentDayElement.text(currentDate);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  // Event listener to ensure that each time a user hits the save button, the content of that element is saved to local storage
  $(".saveBtn").each(function () {
    this.addEventListener("click", function () {
      var timeBlockId = $(this).closest(".time-block").attr("id");
      var description = $(this).siblings(".description").val();
      console.log("Clicked Save for:", timeBlockId, "with description:", description);
      localStorage.setItem(timeBlockId, description);
    });
  });


  // Time Block Coloring
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  // This takes the data pulled from jquery and converts it into integers, which are then used to determine whether a block is past present or future, and is color-coded accordingly
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

  // This function is adding saved data from local storage to the appropriate blocks on the page
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

