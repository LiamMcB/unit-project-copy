// The following code appends a title to the page
// document.createElement creates an element that can be altered and then inserted into the DOM
// document.body.appendChild places a node as a child under the body element
// var title = document.querySelector('.title');
// title.innerHTML = 'Calendar';

// // Your schedule can be accessed through the global object "schedule"
// console.log(schedule);

// // Iterate over schedule to populate table
// schedule.forEach(element => {
//   // Get string of weekname and day to later be used as class
//   const week = `.week-${element.week}`;
//   const day = `${element.day}`;

//   // Get specific row were using
//   const weekRow = document.querySelector(week);

//   // Get td to hold challenge and goals
//   const challenges = document.querySelector(`.${day}-week-${element.week}`);
//   challenges.innerText = `${element.challenge} \n GOALS: ${element.goals[0]}`;
  
// });

// // Iterate over boxes in table and add no events scheduled if empty
// const tdList = document.querySelectorAll("td");
// tdList.forEach(element => {
//   if (!element.innerText) {
//     element.innerText = "no events scheduled";
//   }
// });



class Calendar {
  //do something with the data here
  constructor(schedule) {

  }
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
    }
    this.orderEvents = () => {
      //go through events and sort them by start and end time
    }
  }
}

class Week {
  constructor(number) {
    this.days = [];
    this.addDay = (name) => {
      const day = new Day(name);
      this.days.push(day);
    }
  }
}

$(document).on('ready', () => {
  const title = $('<h1>').text('Social Calendar');
  $('.title').append(title);
  
  // Make an AJAX request to the server, then do something with the result!
  $.get('http://slack-server-production.us-west-2.elasticbeanstalk.com/calendar/LA/38', function(data) {
    // $('table').html(data);
    const days = Object.keys(data);
    console.log(days);
  });

  // Populate calendar with dates
  // const firstDay = "Jul 29 2020"
  // let firstConatiner = `<div class=\"date\">${firstDay}</div>`
  // $(".Wednesday-week-1").append(firstConatiner);

  // Array that olds days of the week
  const daysWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsYear = ["Jul", "Aug", "Sep"];
  const firstDay = 25;
  // For weeks 1-6
  for (let i = 0; i < 6; i++) {
    const week = `week-${i+1}`;
    const weekNumber = i;
    // for days 1-6
    for (let j = 0; j < 6; j++) {
      const day = daysWeek[j];
      const cell = `.${day}-${week}`;
      // Get current month and day
      let currentMonth;
      if ((firstDay + weekNumber*(7) + j + 1) < 31) {
        currentMonth = monthsYear[0];
      } else if ((firstDay + weekNumber*(7) + j + 1) >= 31 && (firstDay + weekNumber*(7) + j + 1) < 62) {
        currentMonth = monthsYear[1];
      } else if ((firstDay + weekNumber*(7) + j + 1) >= 62) {
        currentMonth = monthsYear[2];
      }
      const dayNumber = ((firstDay + weekNumber*(7) + j + 1) % 31) + 1;
      // Populate calendar with date
      let currentDiv = `<div class=\"date\">${currentMonth} ${dayNumber} 2020</div>`
      $(cell).append(currentDiv);
    }
  }
});
