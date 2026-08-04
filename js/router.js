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
    setLoading,
    setStatus,
    setTitle
} from "./ui/renderer.js";

import {
    STATUS_MESSAGES
} from "./constants.js";

export async function initRouter() {
    const form = document.getElementById("repo-form");
    const input = document.getElementById("repo-input");

    if (input) {
        input.focus();
    }

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
        await loadRepository(repository);
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
    history.pushState({}, "", buildRepositoryPath(repository));
}

async function loadRepository(repository) {
    setStatus(STATUS_MESSAGES.loading(repository));
    setLoading(true);

    try {
        const html = await fetchReadme(repository);
        state.repository = repository;
        renderReadme(html);
        setStatus("");
        setTitle(repository);
        return true;
    } catch (error) {
        setStatus(error.message);
        return false;
    } finally {
        setLoading(false);
    }
}