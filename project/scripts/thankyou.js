import { CopyWrite } from "./app.mjs";
//Call copywrite
CopyWrite();

const urlParams = new URLSearchParams(window.location.search);

document.getElementById("firstName").textContent = urlParams.get("first_name") || "Not provided";
document.getElementById("lastName").textContent = urlParams.get("last_name") || "Not provided";
document.getElementById("username").textContent = urlParams.get("username") || "Not provided";
document.getElementById("email").textContent = urlParams.get("email") || "Not provided";
const timestamp = urlParams.get("timestamp") || new Date().toLocaleString();
document.getElementById("timestamp").textContent = timestamp;

console.log(timestamp);
