# Frontend

The alloy take home frontend to sign up and authenticate slack and shopify. Its a React application created by [`create-react-app`](https://create-react-app.dev/) with typescript which includes everything needed. The application is using hooks for must part of the code. The frontend is using [tailwindcss](https://tailwindcss.com) as our base for css, we should not use custom css unless necessary.

## Setup and Run Frontend

To run a local server use the command

```
cd /path/to/alloy/frontend

# Create and copy example .env
cp example.env .env

# Install packages
npm i

# Run backend
npm run start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

- TODO

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Test in "production"

FRONTEND URL: https://alloy-take-home-frontend.herokuapp.com

### TODO:

- Frontend improve token handling. We could have an axios interceptor for response `401` and request a new token.
- Have a Frontend task to ask for new token every x time
