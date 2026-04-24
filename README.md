# HR Workflow Designer 🚀

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![React Flow](https://img.shields.io/badge/React_Flow-FF0072?style=for-the-badge&logo=react&logoColor=white)](https://reactflow.dev/)

> **Tredence Analytics Case Study Submission** > **Role:** Full Stack Engineering Intern (AI Agentic Platforms)  
> **Author:** SHREYANSH KUMAR  
> **Live Demo:** [Insert Link to Vercel/Netlify/Render if you deployed it, or remove this line]

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Future Enhancements](#-future-enhancements)
- [Contact](#-contact)

---

## 🎯 Overview

The **HR Workflow Designer** is a zero-to-one frontend prototype built to enable HR administrators to visually map out, configure, and simulate complex business workflows (such as employee onboarding, leave approvals, and asset provisioning). 

This project was developed as part of the Tredence Case Study to demonstrate the ability to handle complex UI state, implement interactive canvas environments, and design modular, scalable React components suitable for an enterprise-grade AI Agentic Platform.

---

## ✨ Key Features

- **Drag-and-Drop Canvas:** Seamlessly drag nodes from a sidebar palette onto an interactive grid.
- **Custom Node Architecture:** Five distinct node types with unique UI/UX borders and properties:
  - 🟢 `Start`: Initiates the workflow.
  - 🔵 `Task`: Manual actions requiring an assignee and due date.
  - 🟣 `Approval`: Gatekeeper nodes requiring specific role sign-offs.
  - 🟠 `Automated`: System actions (e.g., Slack pings, document generation) populated via a simulated API.
  - 🔴 `End`: Terminates the workflow.
- **Dynamic Configuration Panel:** A context-aware right sidebar that updates its form fields based on the currently selected node type.
- **Global State Management:** Completely decoupled canvas state using Zustand, ensuring high performance without prop-drilling.
- **Simulation Sandbox:** A built-in execution engine that traces the logical path of the workflow and outputs a real-time mock execution timeline terminal.

---

## 🛠 Architecture & Tech Stack

### Frontend Core
* **React 18 & Vite:** Chosen for fast hot-module replacement and modern build tooling.
* **React Flow:** Utilized as the core graphing engine to handle node positioning, edge connections, and canvas pan/zoom interactions.

### State Management
* **Zustand:** Selected over Redux/Context API for its lightweight, boilerplate-free approach to managing complex global states (nodes array, edges array, and selected context).

### Styling
* **Tailwind CSS:** Used for rapid UI prototyping, ensuring a responsive, modern, and consistent design system without writing custom CSS files.

### Mock API Integration
* Native JavaScript Promises and `setTimeout` are used to simulate asynchronous backend behavior, mirroring how the frontend would interact with a Python/FastAPI backend in production.

---

## 📂 Project Structure

```text
src/
├── api.js                # Mock backend simulation (automations, execution logic)
├── App.jsx               # Main application layout and component orchestration
├── CustomNodes.jsx       # UI definitions for Start, Task, Approval, Automated, End
├── main.jsx              # React DOM entry point
├── NodeConfigPanel.jsx   # Dynamic properties editor for selected nodes
├── SandboxPanel.jsx      # Terminal UI for workflow execution testing
├── store.js              # Zustand global state definition
├── tailwind.config.js    # Tailwind configuration and theme
└── WorkflowCanvas.jsx    # React Flow implementation and Drag/Drop logic
