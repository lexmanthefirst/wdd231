import {app} from './app.mjs';
// Selectors
const membershipContainer = document.getElementById("membership-cards");
const membershipModal = document.getElementById('np-modal'); // Corrected
let closeModal; // Will be assigned dynamically
const body = document.querySelector('body');


document.addEventListener("DOMContentLoaded", () => {
    app();
    fetchMemberships();
});

async function fetchMemberships() {
    try {
        const response = await fetch("data/membership.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const memberships = await response.json();
        memberModal(memberships);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

function memberModal(members) {
    members.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("card");
        memberCard.innerHTML = `
            <h3>${member["Membership Type"]}</h3>
            <a href="#">More Info</a>
        `;

        membershipContainer.appendChild(memberCard);

        memberCard.addEventListener("click", () => displayMemberModal(member));
    });
}

function displayMemberModal(member) {
    membershipModal.innerHTML = `
        <h2>${member["Membership Type"]} Benefits</h2>
        <p>${member.Benefits}</p>
        <button id="closeModal">Close</button>
    `;

    membershipModal.showModal();

    // Re-assign close button after updating the modal's inner HTML
    closeModal = document.getElementById('closeModal');
    closeModal.addEventListener("click", () => membershipModal.close());

    body.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
          membershipModal.close();
      }
    });
    membershipModal.addEventListener("click", (event) => {
      if (event.target === membershipModal) {
          membershipModal.close();
      }
  });
}


