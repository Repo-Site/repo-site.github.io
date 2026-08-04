export const APP_NAME = "Repo-Site";

export const GITHUB_API_BASE_URL =
    "https://api.github.com/repos";

export const ERROR_MESSAGES = {
    NOT_FOUND: "Repository not found.",
    RATE_LIMIT:
        "GitHub API rate limit exceeded. Please try again later.",
    UNKNOWN: "Failed to load repository."
};

export const STATUS_MESSAGES = {
    loading: repository => `Loading ${repository}...`
};