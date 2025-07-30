AI-Powered Email to Excel Extractor
A simple yet powerful web application that uses the Google Gemini API to extract structured data from the text of email files and exports it to an Excel spreadsheet.



Overview
This tool is designed to automate the tedious process of manually copying and pasting information from emails. Users can upload one or more email files (as .txt or .eml), provide a simple instruction in plain English (e.g., "Get the invoice number, total amount, and due date"), and the application will use AI to parse the files and present the extracted data in a clean table, ready to be downloaded as an .xlsx file.



Features
AI-Powered Extraction: Leverages the Google Gemini API to understand natural language instructions and intelligently parse data.

Bulk File Upload: Process multiple email files at once.

Structured Output: Displays extracted data in a clean, reviewable table.

Excel Export: Download the structured data as a .xlsx file with a single click using SheetJS.

Secure API Handling: Uses Netlify Functions as a proxy to keep the Google AI API key secure and off the client-side.

Responsive UI: Clean and simple interface built with Tailwind CSS that works on any device.

Tech Stack
Frontend: HTML, Tailwind CSS, Vanilla JavaScript

AI: Google Gemini API

Excel Generation: SheetJS (xlsx)

Deployment & Backend: Netlify

Hosting: Static site hosting for the frontend.

Serverless Functions: Secure proxy for handling API key and requests to the Google API.

Setup and Deployment
Follow these steps to set up the project locally and deploy it to Netlify.

Prerequisites
Git

A code editor like VS Code

A GitHub account

A Netlify account

A Google AI API Key from the Google AI Studio.

1. Local Setup (for testing)
To run the project on your local machine:

Clone the repository:

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

Create a config.js file in the root of the project folder. This file is for your local API key and should not be committed to Git.

// config.js
const API_CONFIG = {
  GEMINI_API_KEY: "PASTE_YOUR_GOOGLE_AI_API_KEY_HERE"
};

Create a .gitignore file to ensure your config.js is not uploaded.

# Configuration files
config.js

# IDE directories
.vscode/

Run with a local server. The easiest way is using the Live Server extension in VS Code.

2. Publishing to Netlify (Recommended)
This is the secure way to deploy the app, as it protects your API key.

Push to GitHub: Make sure your project (with the .gitignore file) is pushed to a GitHub repository.

Create the Netlify Function:

Create a folder structure: netlify/functions/.

Inside, create a file named get-ai-response.js.

Copy the serverless function code provided in the development guide into this file.

Deploy on Netlify:

Log in to Netlify and select "Add new site" -> "Import an existing project".

Connect to GitHub and choose your repository.

The default build settings should work. Click "Deploy site".

Set the Environment Variable:

Go to your new site's settings: Site settings > Build & deploy > Environment.

Click "Edit variables" and add a new one:

Key: GEMINI_API_KEY

Value: PASTE_YOUR_GOOGLE_AI_API_KEY_HERE

Save the variable. Netlify will automatically trigger a new deploy with the environment variable set.

Usage
Define Instructions: In the first input box, type what you want to extract (e.g., "Get the sender's name and the order number").

Upload Files: Click the upload area and select one or more .txt or .eml files.

Extract Data: Click the "Extract Data from Files" button.

Review & Download: The extracted data will appear in the table. If it's correct, click "Download Excel" to get your spreadsheet.
