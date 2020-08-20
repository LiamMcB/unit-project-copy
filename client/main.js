// const { json } = require('express');

class Calendar {
  //do something with the data here
  constructor(schedule) {}
}

class Event {
  constructor(data) {
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.description = data.description;
  }
}

class Day {
  constructor(name) {
    this.name = name;
    this.events = [];
    this.addEvent = (eventData) => {
      this.events.push(new Event(eventData));
    };
    this.orderEvents = () => {
      //go through events and sort them by start and end time
    };
  }
}

class Week {
  constructor(number) {
    this.days = [];
    this.addDay = (name) => {
      const day = new Day(name);
      this.days.push(day);
    };
  }
}

$(document).on('ready', () => {
  const title = $('<h1>').text('Social Calendar');
  $('body').prepend(title);
  getData();

  // Make an AJAX request to the server, then do something with the result!
});

// function getData(callback) {
//   const xhr = new XMLHttpRequest();

//   xhr.open(
//     'GET',
//     'http://slack-server-production.us-west-2.elasticbeanstalk.com/calendar/LA/38',
//     true
//   );
//   xhr.onload = function () {
//     if (this.status === 200) {
//       let response = JSON.parse(this.response);
//       console.log(response);
//       callback(response);
//     }
//   };
//   xhr.send();
//   // console.log(cal);
//   // return response;
// }

// function createCalendarInstance(res) {
//   const cal = new Calendar(res);
//   console.log(cal);
//   return cal;
// }

/* ------------------------------------ - ----------------------------------- */
/*
TODO: create form with text input and submit btn
      create an area for messages in html
      have each msg be its own div
      inject data into dom
      post messages to same server using the form we created

*/

// get data and put into feed with fetch
// parse the response using .then
// .then (data) => create a template literal to hold div class=feed-item
// in that div we put what was parsed from previous response
// append to feed class div

function getData() {
  fetch('https://curriculum-api.codesmith.io/messages')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((obj, i) => {
        let div = `<div class="feed-item${i}">${obj.message}</div>`;
        $('.feed').append(div);
      });
    })
    .catch((err) => console.log(err));
}

/* ------------------------------------ - ----------------------------------- */

// // Create variable to store message user inputted and createdby
// Add event listener on form, which listens to submit event
$('.form').on('submit', function (e) {
  e.preventDefault();
  let messageInput = $('.text-input').val();
  let createdBy = $('.created-by').val();
  console.log(messageInput, createdBy);
  postData(messageInput, createdBy);
});

// Create a function called post data that posts message to API
function postData(message, createdBy) {
  // Create object to hold method, headers, and body metadata for post method
  const body = {
    message: message,
    created_by: createdBy,
  };
  const metadata = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  // Use fetch with first parameter as url and second as object we just created
  fetch('https://curriculum-api.codesmith.io/messages', metadata)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
}
