import { state } from "./state.js";

import { fetchReadme } from "./services/github.js";

import {
    buildRepositoryPath,
    getRepositoryFromPath,
    normalizeRepository,
    isValidRepository
} from "./utils/repository.js";

import {
    renderReadme,
    setStatus,
    setTitle
} from "./ui/renderer.js";


export function initRouter() {

    const form = document.getElementById("repo-form");
    const input = document.getElementById("repo-input");


    form.addEventListener("submit", async event => {

        event.preventDefault();

        const repository = normalizeRepository(input.value);

        if (!repository) {
            return;
        }

        await openRepository(repository);

    });


    window.addEventListener("popstate", async () => {

        const repository = getRepositoryFromPath();

        if (!repository) {
            history.replaceState({}, "", "/");
            state.repository = null;
            location.reload();
            return;
        }

        await loadRepository(repository);

    });


    const repository = getRepositoryFromPath();

    if (repository) {
        loadRepository(repository);
    }

}


async function openRepository(repository) {

    if (!isValidRepository(repository)) {
        setStatus("Invalid repository format.");
        return;
    }


    const success = await loadRepository(repository);

    if (!success) {
        return;
    }


    history.pushState(
        {},
        "",
        buildRepositoryPath(repository)
    );

}


async function loadRepository(repository) {

    setStatus(`Loading ${repository}...`);

    try {

        const html = await fetchReadme(repository);

        state.repository = repository;

        renderReadme(html);

        setStatus("");

        setTitle(repository);

        return true;

    }

    catch (error) {
        // console.error(error);

        setStatus("Repository not found.");

        return false;

    }

}