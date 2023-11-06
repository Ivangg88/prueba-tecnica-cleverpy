# Clevddit, a posts platform.🔖

## Technical skills assessment for Cleverpy.

Clevddit is a platform for managing posts from users. You can list all posts, see one post detail, delete a post and a edit a post.
Also you have a complete user list, with their full details.

## Usage

## [Live website](cleverpost-ivan-garcia.netlify.app) 🔗

### Credentials

    - Username: admin
    - Password: admin

## Project info📚

### Key Features:

- App state managed via Redux Toolkit.
- Slices and Repository prepared for a full API Rest integration for error handling.
- Reading, editing and deleting posts ready, with full external request implementation.
- Login data stored on localstorage. Prepared for external auth implementation.
- Full SPA behaviour, react-router-dom integrated. Every route is protected, so the user can be redirected to login or home page based on logged status.
- Code minified build.
- CI/CD integrated pipeline. Github workflows for automatic testing and lint-checking on PR.
- Logout button, clears localstorage, logs out user and redirects to login.
- Flexbox as the main layout strategy.
- SCSS Color custom variables.
- No third party libraries for styling or layout implementation.

**Core Technologies used:**

```
  - Typescript
  - React
  - SASS
  - Cypress
  - Jest
  - React router dom
  - MSW
```

**Components**

Components responsibilities available [here](components.md) 🔗

```
    .
    └── components(/)
      └── CredentialRoutes
      └── DetailPost
      └── Header
      └── Layout
      └── Loading
      └── Login
      └── Post
      └── PostList

## Commands

    # Installation command
    npm i or npm/yarn i

    # Running command
    npm start

    # Build command
    npm run build

    # Testing command
    npm run test

```
