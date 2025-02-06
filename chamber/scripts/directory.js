import {app} from './app.mjs';
// Selectors
const directoryBox = document.getElementById("directory-box");
const myBtns = document.querySelectorAll(".button-box button");


// Fetch and display member data
async function fetchMembers(view = "list") {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const members = await response.json();
    displayMembers(members, view);
  } catch (error) {
    console.error("Error fetching member data:", error);
  }
}

// Display members in the desired view
function displayMembers(members, view) {
  directoryBox.innerHTML = ""; // Clear existing content

  if (view === "list") {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    thead.innerHTML = `
            <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Industry</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Member Since</th>
                <th>Membership</th>
            </tr>
        `;

    members.forEach((member) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td><img src="${member.logo}" alt="${member.Name} logo" class="logo"></td>
                <td>${member.Name}</td>
                <td>${member.Industry}</td>
                <td>${member["Physical Address"]}</td>
                <td>${member.Email}</td>
                <td>${member.Phone}</td>
                <td>${member.MemberSince}</td>
                <td>${member.Membership}</td>
            `;

      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    directoryBox.appendChild(table);
  } else {
    members.forEach((member) => {
      const card = document.createElement("div");
      card.classList.add("card-box");

      card.innerHTML = `
                <img src="${member.logo}" alt="${member.Name} logo" class="logo">
                <h3>${member.Name}</h3>
                <ul>
                    <li><strong>Industry:</strong> ${member.Industry}</li>
                    <li><strong>Address:</strong> ${member["Physical Address"]}</li>
                    <li><strong>Email:</strong> <a href="${member.Email}" target="_blank">${member.Email}</a></li>
                    <li><strong>Phone:</strong> ${member.Phone}</li>
                    <li><strong>Member Since:</strong> ${member.MemberSince}</li>
                    <li><strong>Membership:</strong> ${member.Membership}</li>
                </ul>
            `;

      directoryBox.appendChild(card);
    });
  }
}

// Event listeners for buttons
myBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    buttonView(index);
  });
});

// Switch between list and grid views
function buttonView(index) {
  const view = index === 0 ? "list" : "grid";
  myBtns.forEach((btn) => btn.classList.remove("activebtn"));
  myBtns[index].classList.add("activebtn");
  toggleView(view);
  fetchMembers(view);
}

function toggleView(view) {
  directoryBox.classList.toggle("grid-view", view === "grid");
  directoryBox.classList.toggle("list-view", view === "list");
}

// Initialize with list view
document.addEventListener("DOMContentLoaded", () => {
  fetchMembers("list");
 app();
});
