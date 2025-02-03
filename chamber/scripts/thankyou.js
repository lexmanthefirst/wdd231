const urlParams = new URLSearchParams(window.location.search);

document.getElementById("firstName").textContent = urlParams.get("first_name") || "Not provided";
document.getElementById("lastName").textContent = urlParams.get("last_name") || "Not provided";
document.getElementById("orgTitle").textContent = urlParams.get("org_title") || "Not provided";
document.getElementById("email").textContent = urlParams.get("email") || "Not provided";
document.getElementById("phone").textContent = urlParams.get("phone") || "Not provided";
document.getElementById("address").textContent = urlParams.get("address") || "Not provided";
document.getElementById("orgName").textContent = urlParams.get("org_name") || "Not provided";
document.getElementById("membershipLevel").textContent = urlParams.get("membership_level") || "Not provided";
document.getElementById("businessDescription").textContent = urlParams.get("org_description") || "Not provided";
const timestamp = urlParams.get("timestamp") || new Date().toLocaleString();
document.getElementById("timestamp").textContent = timestamp;

console.log(timestamp);
