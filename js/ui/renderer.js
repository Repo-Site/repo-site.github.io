import { APP_NAME } from "../constants.js";


const app = document.getElementById("app");
const status = document.getElementById("status");


export function renderReadme(html) {
    // document.body.classList.add("markdown-body");
    document.body.className = "markdown-body";

    app.innerHTML = html;

}


export function setStatus(message = "") {

    status.textContent = message;
    status.hidden = !message;

}


export function setTitle(repository = "") {

    document.title = repository
        ? `${repository} · ${APP_NAME}`
        : APP_NAME;

}