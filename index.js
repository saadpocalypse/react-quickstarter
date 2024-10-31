#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper to run shell commands with error handling
const runCommand = (command, errorMessage, options = {}) => {
    try {
        execSync(command, { stdio: 'inherit', ...options });
    } catch (error) {
        console.error(errorMessage);
        console.error(error.message);
        process.exit(1);
    }
};

// Get the project name and optional GitHub repo URL from the user
const projectName = process.argv[2];
const repoURL = process.argv[3];

if (!projectName) {
    console.error('Please provide a project name.');
    console.log('Usage: react-quickstarter <project-name> [github-repo-url]');
    process.exit(1);
}

// Step 1: Create a new React app
console.log(`Creating a new React app: ${projectName}`);
runCommand(
    `npx create-react-app ${projectName}`,
    `Failed to create React app: ${projectName}. Please check your internet connection or npx installation.`
);

// Change directory to the newly created React app
process.chdir(projectName);

// Step 2: Install additional dependencies
console.log('Installing additional dependencies...');
runCommand(
    'npm install react-router-dom react-helmet-async',
    'Failed to install react-router-dom and react-helmet-async. Please check your internet connection.'
);
runCommand(
    'npm install -D tailwindcss',
    'Failed to install Tailwind CSS. Please check your internet connection.'
);
runCommand(
    'npx tailwindcss init',
    'Failed to initialize Tailwind CSS configuration. Please check your installation.'
);

// Fix Babel warning by adding the missing plugin to devDependencies
console.log('Adding missing Babel plugin to devDependencies...');
runCommand(
    'npm install -D @babel/plugin-proposal-private-property-in-object',
    'Failed to install Babel plugin. Please check your internet connection.'
);

// Step 3: Create folders
console.log('Creating additional folders...');
const folders = ['src/assets', 'src/components', 'src/context', 'src/data', 'src/hooks', 'src/pages', 'src/services', 'src/store', 'src/styles', 'src/utils'];
folders.forEach(folder => {
    fs.mkdirSync(folder, { recursive: true });
});

// Step 4: Create Home.jsx
console.log('Creating Home.jsx...');
const homeContent = `import { HelmetProvider, Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <div>Home page</div>
            </div>
        </HelmetProvider>
    );
};

export default Home;
`;
fs.writeFileSync(path.join('src', 'pages', 'Home.jsx'), homeContent);

// Step 5: Update index.css
console.log('Updating index.css...');
const indexCssContent = `@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
    overscroll-behavior: none;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
}
`;
fs.writeFileSync(path.join('src', 'index.css'), indexCssContent);

// Step 6: Create Tailwind config
console.log('Updating tailwind.config.js...');
const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            poppins: ["Poppins"],
            montserrat: ["Montserrat"],
        },
        colors: {
            primary: {
                red: "#FF0000",
                green: "#00FF00",
                blue: "#0000FF",
            },
        },
    },
    plugins: [],
};
`;
fs.writeFileSync('tailwind.config.js', tailwindConfigContent);

// Step 7: Create App.js
console.log('Creating App.js...');
const appJsContent = `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
`;
fs.writeFileSync(path.join('src', 'App.js'), appJsContent);

// Step 8: Initialize Git
console.log('Initializing Git repository...');
runCommand('git init', 'Failed to initialize Git repository.');
runCommand('git add .', 'Failed to stage files for commit.');
runCommand('git commit -m "Initial commit: Set up React project with react-quickstarter"', 'Failed to commit changes.');

// Step 9: Push to GitHub (if URL provided)
if (repoURL) {
    console.log(`Adding remote repository: ${repoURL}`);
    runCommand(
        `git remote add origin ${repoURL}`,
        'Failed to add GitHub repository as remote. Please check the URL and try again.'
    );

    console.log('Pushing to GitHub...');
    runCommand(
        'git branch -M main',
        'Failed to rename branch to main.'
    );
    runCommand(
        'git push -u origin main',
        'Failed to push to GitHub. Repo not found or access denied. Please check the repository URL or your permissions.'
    );

    console.log(`React app setup complete and pushed to ${repoURL}! Navigate to the ${projectName} directory and run 'npm start' to begin.`);
} else {
    console.log(`React app setup complete without pushing to GitHub. Navigate to the ${projectName} directory and run 'npm start' to begin.`);
}

// Step 10: Start the development server
console.log(`Navigating to ${projectName} and starting the development server...`);
runCommand('npm start', 'Failed to start the development server. Check if npm is installed and try again.');
console.log("react-quickstarter has completed successfully, happy coding!");
