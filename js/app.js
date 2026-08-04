const app = document.getElementById("app");

const repo = getRepoFromPath();


if (repo) {
    showReadme(repo);
} else {
    showHome();
}


function getRepoFromPath() {

    const path = location.pathname
        .replace(/^\/+|\/+$/g, "");

    return decodeURIComponent(path);

}


function showHome() {

    app.innerHTML = `

        <main class="home">

            <h1>Repo-Site</h1>

            <p>
                Turn any GitHub repository into a clean project webpage.
            </p>


            <form id="repo-form">

                <input
                    id="repo-input"
                    type="text"
                    placeholder="https://github.com/owner/repository or owner/repository"
                    autocomplete="off"
                    spellcheck="false"
                >

                <button>
                    Open
                </button>

            </form>

        </main>

    `;


    document
        .getElementById("repo-form")
        .addEventListener("submit", event => {

            event.preventDefault();


            const value = normalizeRepo(
                document.getElementById("repo-input").value
            );


            if (value) {
                location.href = `/${value}`;
            }

        });

}


function normalizeRepo(value) {

    return value
        .trim()
        .replace(/^https?:\/\/github\.com\//i, "")
        .replace(/^\/+|\/+$/g, "");

}


async function showReadme(repo) {

    if (!repo.includes("/")) {
        app.innerHTML = `
            <p>
                Invalid repository format.
            </p>
        `;
        return;
    }


    app.innerHTML = `
        <p>Loading ${repo}...</p>
    `;


    try {

        const response = await fetch(
            `https://api.github.com/repos/${repo}/readme`,
            {
                headers: {
                    Accept: "application/vnd.github.html"
                }
            }
        );


        if (!response.ok) {

            app.innerHTML = `
                <p>
                    Repository not found.
                </p>
            `;

            return;
        }


        const html = await response.text();


        document.body.className = "markdown-body";

        app.innerHTML = html;


    } catch (error) {

        app.innerHTML = `
            <p>
                Failed to load repository.
            </p>
        `;

    }

}