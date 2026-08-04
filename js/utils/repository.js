export function getRepositoryFromPath() {
    return normalizeRepository(
        decodeURIComponent(location.pathname)
    );
}

export function normalizeRepository(value) {
    try {
        const url = new URL(value);
        if (url.hostname === "github.com") {
            value = url.pathname;
        }
    } catch { }

    return value.trim().replace(/^\/+|\/+$/g, "");
}

export function isValidRepository(repository) {
    return repository.split("/").length === 2;
}

export function buildRepositoryPath(repository) {
    return `/${repository}`;
}