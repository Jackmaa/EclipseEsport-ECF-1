const menu = document.getElementById("menu");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

function openNav() {
  menu.classList.add("active");
}

function closeNav() {
  menu.classList.remove("active");
}

const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev"); // button previous month
const next = document.querySelector(".next"); // button next month
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "Februrary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// EVENTS ARRAY ADD MORE IF NEED BE

const eventsArr = [
  {
    day: 1,
    month: 12,
    year: 2024,
    events: [
      {
        title: "Event 1",
        time: "10:00 AM - 11:00 AM",
      },
      {
        title: "Event 2",
        time: "11:00 AM - 12:00 PM",
      },
    ],
  },
  {
    day: 12,
    month: 12,
    year: 2024,
    events: [
      {
        title: "Event 1",
        time: "10:00 AM",
      },
    ],
  },
];

// Function to add days //

function initCalendar() {
  // we get the previous month's days that were in the same week as the current month
  // the days of the current month
  // and the remaining days as the beginning of the next month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  // update the date at the top of our calendar
  date.innerHTML = months[month] + " " + year;

  // adding days in DOM

  let days = "";

  // prev month's days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // current month's days
  for (let i = 1; i <= lastDate; i++) {
    //check if there is an event on current day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        // if there's an event
        event = true;
      }
    });

    // if day is today add class of today
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      // if there's an event also add event class
      //add the active class by default on today
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    }

    // add remaining days with just the day class
    else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
  }

  // next months days

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  //adding the listener after the calendar is initialized
  addListner();
}

initCalendar();

//previous month
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// next month
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

//adding eventlistener on prev and next btns

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//function to add the active class on the clicked day

function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      //set the current day as the active day
      activeDay = Number(e.target.innerHTML);
      //display the date after the click
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));

      //remove active from already active day
      days.forEach((day) => {
        day.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
}

// function to display the active date

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// function to show events that day

function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
}
