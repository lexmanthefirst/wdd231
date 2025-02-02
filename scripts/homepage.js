const btnOpen = document.querySelector("#btnOpen");
const btnClose = document.querySelector("#btnClose");
const media = window.matchMedia("(width < 40em)");
const topNavMenu = document.querySelector(".topnav_menu");
const main = document.querySelector("main");
const body = document.querySelector("body");
const courseList = document.getElementById("course-list");
const creditCount = document.getElementById("credit-count");
const filterButtons = document.querySelectorAll(".buttons button");
const courseDetails = document.querySelector("#course-details");

const courses = [
  { name: "CSE 110", category: "CSE", credits: 2, completed: true, certificate: "Web and Computer Programming",title: "Introduction to Programming",technologies:["Python"]},
  { name: "WDD 130", category: "WDD", credits: 2, completed: true, certificate: "Web and Computer Programming", title: "Web Fundamentals",technologies:["HTML", "CSS"]},
  { name: "CSE 111", category: "CSE", credits: 2, completed: true, certificate: "Web and Computer Programming", title: "Programming with Funtions", technologies:["Python"]},
  { name: "CSE 210", category: "CSE", credits: 2, completed: true, certificate: "Web and Computer Programming", title: "Programming with Classes", technologies:["C#"]},
  { name: "WDD 131", category: "WDD", credits: 2, completed: true, certificate: "Web and Computer Programming", title: "Dynamic Web Fundamentals", technologies:["HTML", "CSS", "JavaScript"]},
  { name: "WDD 231", category: "WDD", credits: 2, completed: false, certificate: "Web and Computer Programming", title: "Frontend Web Development 1",technologies:["HTML", "CSS", "JavaScript"]},
];

function openMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "true");
  topNavMenu.removeAttribute("inert");
  topNavMenu.removeAttribute("style");
  main.setAttribute("inert", "");
  btnClose.focus();
}

function closeMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "false");
  topNavMenu.setAttribute("inert", "");
  main.removeAttribute("inert");
  btnOpen.focus();

  setTimeout(() => {
    topNavMenu.style.transition = "none";
  }, 500);
}

function setupTopNav(e) {
  if (e.matches) {
    // is mobile
    topNavMenu.setAttribute("inert", "");
    topNavMenu.style.transition = "none";
  } else {
    // is tablet/desktop
    closeMobileMenu();
    topNavMenu.removeAttribute("inert");
  }
}

setupTopNav(media);

btnOpen.addEventListener("click", openMobileMenu);
btnClose.addEventListener("click", closeMobileMenu);

media.addEventListener("change", function (e) {
  setupTopNav(e);
});

document.addEventListener("DOMContentLoaded", () => {
  function renderCourses(filter = "all") {
    courseList.innerHTML = "";
    const filteredCourses =
      filter === "all"
        ? courses
        : courses.filter((course) => course.category === filter);

    filteredCourses.forEach((course) => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      courseDiv.textContent = course.name;
      if (course.completed) {
        courseDiv.style.backgroundColor = "#4caf50";
        courseDiv.style.color = "#ffffff";
      }
      courseList.appendChild(courseDiv);
      courseDiv.addEventListener("click", () => displayCourseList(course));
    });

    updateCredits(filteredCourses);
  }

  function updateCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce(
      (total, course) => total + course.credits,
      0
    );
    creditCount.textContent = `Total Credits: ${totalCredits}`;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderCourses(button.getAttribute("data-filter"));
    });
  });

  renderCourses();
});
function displayCourseList(course) {
  courseDetails.innerHTML = `
  <button id="closeModal">❌</button>
  <h2> ${course.category}</h2>
  <h3> ${course.name}</h3>
  <p><strong>Title:</strong> ${course.title}</p>
  <p><strong>Certificate:</strong> ${course.certificate}</p>
  <p><strong>Credits:</strong> ${course.credits}</p>
  <p><strong>Technologies:</strong> ${course.technologies.join(", ")}</p>
  <p><strong>Completed:</strong> ${course.completed ? "Yes" : "No"}</p>
  `;
  courseDetails.showModal();
  closeModal.addEventListener("click", () => courseDetails.close());
}
