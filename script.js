// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function(){
  var day = dayjs().format('MMM D, YYYY, hh:mm:ss');
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveBtnEl = $('.saveBtn');
  saveBtnEl.on('click', function () {
    var text = $(this).siblings("textarea").val(); //save as string
    var hrKey = $(this).parent().attr("id"); // save as string
    var status = $(this).parent().attr("class"); // read the updated status class for later use
    console.log(typeof(text));
    console.log(hrKey.slice(5,17));
    console.log(status);
    localStorage.setItem("hrKey", JSON.stringify(hrKey));
    localStorage.setItem("text", JSON.stringify(text));
  });
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var timeBlocks = $(".time-block");

  timeBlocks.each(function() {
    var hrKey = $(this).attr("id");

    var currentHr = day.slice(14,16);
    var planHr = hrKey.split("-")[1]

    console.log(+currentHr + " vs. " + +planHr);
    if (+planHr < +currentHr) {
      // past
      $(this).addClass("past");
    }
    else if (+planHr == +currentHr) {
      // present
      $(this).addClass("present");
    }
    else if (+planHr > +currentHr) {
      // future
      $(this).addClass("future");
    }
  })
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  var storedhrKey = JSON.parse(localStorage.getItem("hrKey"));
  var storedtext = JSON.parse(localStorage.getItem("text"));
  console.log(storedhrKey + "  :   " + storedtext);


  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').append(day);
});
