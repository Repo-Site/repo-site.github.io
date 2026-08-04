import { APP_NAME } from "../constants.js";

const button = document.getElementById("submit-button");
const app = document.getElementById("app");
const status = document.getElementById("status");


export function renderReadme(html) {
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

export function setLoading(isLoading) {
    button.disabled = isLoading;
}