import { GITHUB_API_BASE_URL } from "../constants.js";


export async function fetchReadme(repository) {

    const response = await fetch(
        `${GITHUB_API_BASE_URL}/${repository}/readme`,
        {
            headers: {
                Accept: "application/vnd.github.html"
            }
        }
    );

    if (!response.ok) {
        // throw new Error(response.statusText);
        // throw new Error(response.status);
        throw new Error("Repository not found.");
    }

    return response.text();

}