const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(width < 40em)');
const topNavMenu = document.querySelector('.topnav_menu');
const main = document.querySelector('main');
const body = document.querySelector('body');

function openMobileMenu() {
  btnOpen.setAttribute('aria-expanded', 'true');
  topNavMenu.removeAttribute('inert');
  topNavMenu.removeAttribute('style');
  main.setAttribute('inert', '');
  btnClose.focus();
}

function closeMobileMenu() {
  btnOpen.setAttribute('aria-expanded', 'false');
  topNavMenu.setAttribute('inert', '');
  main.removeAttribute('inert');
  btnOpen.focus();

  setTimeout(() => {
    topNavMenu.style.transition = 'none';
  }, 500);
}

function setupTopNav(e) {
  if (e.matches) {
    // is mobile
    topNavMenu.setAttribute('inert', '');
    topNavMenu.style.transition = 'none';
  } else {
    // is tablet/desktop
    closeMobileMenu();
    topNavMenu.removeAttribute('inert');
  }
}

setupTopNav(media);

btnOpen.addEventListener('click', openMobileMenu);
btnClose.addEventListener('click', closeMobileMenu);

media.addEventListener('change', function (e) {
  setupTopNav(e);
});


document.addEventListener('DOMContentLoaded', () => {
  const courses = [
    { name: 'CSE 110', category: 'CSE', credits: 3, completed: true },
    { name: 'WDD 130', category: 'WDD', credits: 3, completed: true },
    { name: 'CSE 111', category: 'CSE', credits: 4, completed: true },
    { name: 'CSE 210', category: 'CSE', credits: 4, completed: true },
    { name: 'WDD 131', category: 'WDD', credits: 3, completed: true },
    { name: 'WDD 231', category: 'WDD', credits: 3, completed: false },
  ];

  const courseList = document.getElementById('course-list');
  const creditCount = document.getElementById('credit-count');
  const filterButtons = document.querySelectorAll('.buttons button');

  function renderCourses(filter = 'all') {
    courseList.innerHTML = '';
    const filteredCourses =
      filter === 'all'
        ? courses
        : courses.filter(course => course.category === filter);

    filteredCourses.forEach(course => {
      const courseDiv = document.createElement('div');
      courseDiv.className = 'course';
      courseDiv.textContent = course.name;
      if (course.completed) {
        courseDiv.style.backgroundColor = '#4caf50';
        courseDiv.style.color = '#ffffff';
      }
      courseList.appendChild(courseDiv);
    });

    updateCredits(filteredCourses);
  }

  function updateCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    creditCount.textContent = `Total Credits: ${totalCredits}`;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      renderCourses(button.getAttribute('data-filter'));
    });
  });

  renderCourses();
});
