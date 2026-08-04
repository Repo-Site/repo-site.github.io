import {
    ERROR_MESSAGES,
    GITHUB_API_BASE_URL
} from "../constants.js";


export async function fetchReadme(repository) {

    const response = await fetch(
        `${GITHUB_API_BASE_URL}/${repository}/readme`,
        {
            headers: {
                Accept: "application/vnd.github.html"
            }
        }
    );

    // if (!response.ok) {
    //     // throw new Error(response.statusText);
    //     throw new Error(response.status);
    // }

    if (response.status === 404) {
        throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }

    if (response.status === 403) {
        throw new Error(ERROR_MESSAGES.RATE_LIMIT);
    }

    if (!response.ok) {
        throw new Error(ERROR_MESSAGES.UNKNOWN);
    }

    return response.text();

}