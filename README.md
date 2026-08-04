# Repo-Site

A simple GitHub README viewer that turns any public repository into a clean webpage.

## Features

- Render GitHub README files using GitHub's official API
- Supports any public GitHub repository
- Responsive layout for desktop and mobile

## Usage

Open the homepage and enter either:

```text
https://github.com/owner/repository
```

or

```text
owner/repository
```

The repository will be available at:

```text
https://repo-site.github.io/owner/repository
```

## Project Structure

```text
.
├── assets/
│   └── favicon.svg
├── css/
│   └── style.css
├── js/
│   └── app.js
├── 404.html
├── index.html
└── README.md
```

## Development

Use a static server that supports SPA routing.

For example:

```bash
serve -s .
```

## License

This project is licensed under the [MIT License](LICENSE).