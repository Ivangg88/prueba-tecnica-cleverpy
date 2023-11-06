## Components

### Element Card (Post)

- **Receives**: Receives element information.
- **Displays**: Displays the received information organized by title, author, and content. It contains one button for deleting the post.
- **State**: Does not store its own information.
- **User Actions**: The user clicks on the card and the displayed buttons.
- **Actions**:
  - **Card**: Takes you to the element's detail.
  - **"Delete" Button**: Deletes the element (only from the store, leaving the simulated delete method in the repository prepared).

### Element List (PostList)

- **Receives**: Receives a list of element cards.
- **Displays**: Displays the provided list.
- **State**: Does not have its own state; it only passes data from the store to the cards.
- **User Actions**: Specific actions for each card.
- **Actions**: No actions.

### Post Detail Card (DetailPostCard)

- **Receives**: Collects information from the store.
- **Displays**: Post information, similar to the card but with a different style amd with a edit button..
- **State**: Has no own state; it retrieves everything from the store.
- **User Actions**: Added to the actions of the card, the user can click on edit and a edit form will opened.

### Header

- **Receives**: Logged-in user's name.
- **Displays**: Displays the page header composed of the app name, a welcome message with the logged-in user's name and a link to logout.
- **State**: Does not store its own information.
- **User Actions**: Click on the link Logout and logout the user of the app..
- **Actions**: No actions.

### Layout

- **Receives**: Does not receive information.
- **Displays**: Displays the general application layout, composed of the Header at the top and the Content under the Header.
- **State**: Has no own state.
- **User Actions**: No specific actions.
- **Actions**: No actions.

### Login

- **Receives**: Does not receive information.
- **Displays**: Displays a login form to login the user.
- **State**: Has no own state.
- **User Actions**: Type the credentials and click on Login to loging in the app.
- **Actions**: No actions.

## Pages

- **Posts Page (PostPage)**: The main page that displays the list of elements.

- **Detail Post Page (DetailPage)**: This page shows the detail of one element.

- **Login Page (LoginPage)**: This page shows the component login and is the home page when the user isnt logged.

- **Not Found Page (NotFoundPage)**: This page shows a not found message and a link to /home.

## Data Layer

Load the store after logging in the admin user with user and post data.
Store data of the logged-in user in local storage (simulating login with an API and saving the received token).
