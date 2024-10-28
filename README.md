
# react-quickstarter

**react-quickstarter** is a custom npm package designed to quickly scaffold a React project with essential configurations and folder structures, as well as pushing the code to GitHub. It integrates Tailwind CSS, React Router, and react-helmet, while also creating a clean initial setup with organized directories and basic file structure. 

<br>

## Features

- Installs and configures **Tailwind CSS**, **React Router**, and **react-helmet** for rapid development.
- Sets up the following directories under the `src` folder:
  - `assets`: For images, icons, and other static assets.
  - `components`: For reusable UI components.
  - `context`: For global state management using React Context.
  - `data`: For mock data and static JSON files.
  - `hooks`: For custom React hooks.
  - `pages`: For page components representing routes.
  - `services`: For API calls and external service integration.
  - `store`: For state management setup (e.g., Redux).
  - `styles`: For global CSS and styling files.
  - `utils`: For utility functions, constants, and helpers.

- Updates the default `index.css` and `tailwind.config.js` to use **Poppins** and **Montserrat** fonts.
- Removes boilerplate code from `App.js` and sets up a basic **Home Page** component.
- Pushes the code to the respective GitHub repository.

<br>

## Prerequisites

Ensure you have **Node.js** and **npm** installed on your machine before using this package.

<br>

## Installation & Usage

To create a new React app with this setup:

1. Open your terminal and navigate to the directory where you want to create the React project.

2. Run the following command:
```bash
npx react-quickstarter <project-name> [github-repo-url]
```

-   Replace  `<project-name>`  with the desired name of your new React app.
-   Replace  `[github-repo-url]`  with the GitHub repository URL  **if you want to push the code to GitHub**.
-   If you do not provide a GitHub URL, the script will still create the project but will not push to GitHub.

3.  After the setup completes, navigate to your new project directory:
    
```bash
cd <project-name>
```
    
4.  Start the development server:
    
```bash
npm run start
```

<br>

## How It Works

-   Scaffolds a new React app using  `create-react-app`.
-   Installs additional dependencies for Tailwind CSS, React Router, and react-helmet.
-   Creates a predefined folder structure for better organization and scalability.
-   Configures  `tailwind.config.js`  to use custom fonts and colors.
-   Sets up a basic  `Home.jsx`  component and updates  `App.js`  to include routing.
-   If a GitHub URL is provided, the code is pushed to the specified repository.

<br>

## Development & Testing

If you want to modify or test this package locally:

1.  Clone the repository.
2.  Run  `npm link`  in the project directory to make it available globally on your system.
3.  Use the command  `react-quickstarter <project-name> [github-repo-url]`  to create a test React app with the local changes.

<br>

## License

This project is licensed under the  **ISC License**. See the  [LICENSE](LICENSE)  file for details.

<br>

## Contributing

Contributions are welcome! If you’d like to improve this package or add new features, please fork this repository, make your changes, and submit a pull request.