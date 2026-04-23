# Experiment 6: Form Validation using React & Material UI

## 📋 Description
This experiment demonstrates how to build a robust **Login Form** using **React (Vite)** and **Material UI (MUI)** with comprehensive **form validation**, **state management**, and **responsive UI styling**. Learn best practices for handling form submissions and providing real-time user feedback.

## 🎯 Learning Outcomes
After completing this experiment, you will be able to:
1. Build controlled components in React using the `useState` hook for form state management
2. Implement comprehensive form validation using HTML5 attributes and custom validation logic
3. Use Material UI components (TextField, Button, Checkbox, Radio) to create professional forms
4. Handle form submissions and validate data before processing
5. Display dynamic error messages for real-time user feedback
6. Create responsive and accessible user interfaces with CSS and React
7. Implement password requirements and input sanitization
8. Build production-ready forms following industry best practices

## 🛠 Technologies Used
- **Frontend Framework**: React 19+
- **UI Library**: Material UI (MUI)
- **Build Tool**: Vite
- **Styling**: CSS + Emotion (MUI's styling solution)
- **Language**: JavaScript (ES6+)
- **State Management**: React Hooks (useState)

## 📁 Project Structure
```
Experiment-6/
├── src/
│   ├── components/       # Form components
│   │   └── LoginForm.jsx # Login form with validation
│   ├── App.jsx           # Main application
│   ├── App.css           # Application styles
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## 🎨 Key Features

### Form Components
- **TextField** – Text input with validation and error messages
- **Button** – Submit button with loading states
- **Checkbox** – Remember me functionality
- **Radio** – Selection options

### Validation Features
- Email format validation
- Password strength requirements
- Required field validation
- Real-time error feedback
- Form-level validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Navigate to project directory
cd Experiment-6

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

## 💡 Form Implementation Example

```jsx
import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
        }
        label="Remember me"
      />
      <Button variant="contained" fullWidth type="submit">
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
```

## ✅ Validation Checklist

- [x] Email format validation
- [x] Password strength requirements
- [x] Required field validation
- [x] Real-time error display
- [x] Error message clearing on correction
- [x] Form accessibility
- [x] Responsive design
- [x] User-friendly feedback

## ✅ Conclusion
This experiment provides comprehensive understanding of form handling in React applications using Material UI. It demonstrates best practices for building scalable, user-friendly forms with proper validation, error handling, and a professional user interface—essential skills for any React developer.
