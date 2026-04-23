
# Experiment 3: Single Page Application with React Router

## 📋 Description
This experiment demonstrates the creation of a Single Page Application (SPA) using React and Vite. It showcases client-side routing using React Router, allowing seamless navigation between different pages without server round-trips, resulting in a fast and responsive user experience.

## 🎯 Learning Outcomes
After completing this experiment, you will be able to:
- Understand the concept and benefits of Single Page Applications (SPA)
- Create a React application using Vite build tool
- Implement client-side routing using React Router v7
- Organize React components using a modular and scalable structure
- Enable seamless navigation between pages without page reloads
- Apply CSS styling for improved user interface and user experience
- Use Git and GitHub for effective version control
- Build responsive layouts and navigation menus

## 🛠 Technologies Used
- **Frontend Framework**: React 19+
- **Routing Library**: React Router v7
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: CSS
- **Version Control**: Git & GitHub

## 📁 Project Structure
```
experiment-3/
├── src/
│   ├── pages/            # Page components for different routes
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── components/       # Reusable components
│   ├── App.jsx           # Main application with routing
│   ├── App.css           # Application styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## 🎨 Key Features

- **Client-Side Routing**: Navigate between pages instantly without server requests
- **Modular Component Structure**: Organized pages and components for scalability
- **No Page Reloads**: Seamless user experience with SPA architecture
- **Responsive Navigation**: Menu systems and navigation links
- **Fast Loading**: Vite's optimized development and build process

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Navigate to project directory
cd experiment-3

# Install dependencies
npm install
```

### Development
```bash
# Start development server with HMR
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build
```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 🔗 Routing Implementation

Example routing setup using React Router:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
```

## ✅ Conclusion
This experiment successfully demonstrates the creation of a modern React-based Single Page Application with efficient client-side routing and modular component structure, providing a foundation for building scalable web applications.
