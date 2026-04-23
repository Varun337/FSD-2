
# Experiment 2: React Application with Material UI Components

## 📋 Description
This experiment demonstrates building a modern React application using Material UI (MUI) components library. It showcases how to leverage pre-built, professionally designed UI components to create a polished, responsive user interface with minimal effort.

## 🎯 Learning Outcomes
After completing this experiment, you will be able to:
- Create and compose React components using Material UI library
- Understand different variants of MUI components (Button, TextField, Select, Rating, Checkbox)
- Implement proper component structure and component reusability
- Apply professional UI styling and theming
- Build a complete routing application with advanced UI components
- Manage component state and props effectively

## 🛠 Technologies Used
- **Frontend Framework**: React 19+
- **UI Library**: Material UI (MUI)
- **Build Tool**: Vite
- **Styling**: Emotion CSS-in-JS
- **Language**: JavaScript (ES6+)

## 📁 Project Structure
```
experiment-2/
├── src/
│   ├── components/       # Reusable MUI-based components
│   │   ├── Button.jsx    # Button variants
│   │   ├── TextField.jsx # Text input components
│   │   ├── Select.jsx    # Select/dropdown components
│   │   ├── Rating.jsx    # Rating component
│   │   └── Checkbox.jsx  # Checkbox component
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## 🎨 Key Features

### Custom Components Created
- **ButtonBasic.jsx** - Various button styles and states
- **TextFieldBasic.jsx** - Text input with validation
- **SelectBasic.jsx** - Dropdown selection component
- **RatingBasic.jsx** - Star rating component
- **CheckboxBasic.jsx** - Checkbox input component

### Component Usage
- `Home.jsx` uses ButtonBasic, TextFieldBasic, and SelectBasic
- RatingBasic and CheckboxBasic can be imported and used in any component as needed

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Navigate to project directory
cd experiment-2

# Install dependencies
npm install
```

### Development
```bash
# Start development server
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

## 📚 Component Examples

Importing and using MUI components in your application:

```jsx
import ButtonBasic from './components/Button';
import TextFieldBasic from './components/TextField';
import SelectBasic from './components/Select';

function App() {
  return (
    <div>
      <ButtonBasic />
      <TextFieldBasic />
      <SelectBasic />
    </div>
  );
}
```

## ✅ Conclusion
This experiment provides a comprehensive understanding of leveraging Material UI components to build professional, responsive, and accessible user interfaces in React applications quickly and efficiently.
