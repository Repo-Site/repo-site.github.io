export function getRepositoryFromPath() {

    return normalizeRepository(
        decodeURIComponent(location.pathname)
    );

}


export function normalizeRepository(value) {

    return value
        .trim()
        .replace(/^https?:\/\/github\.com\//i, "")
        .replace(/^\/+|\/+$/g, "");

}


export function isValidRepository(repository) {

    return repository.split("/").length === 2;

}


export function buildRepositoryPath(repository) {

    return `/${repository}`;

}