# Frontend Testing Setup

## 📋 Description

This directory contains a comprehensive testing setup for React frontend applications (based on Experiment-6 form validation). It includes Vitest configuration, test utilities, and all necessary dependencies for running frontend unit tests, integration tests, and coverage analysis.

## 🎯 Learning Outcomes

After working with this testing setup, you will be able to:
1. Set up a modern testing environment for React applications
2. Write unit tests for React components using Vitest
3. Test component rendering, props, and state changes
4. Mock user interactions and events
5. Use Testing Library for user-centric testing
6. Generate and analyze code coverage reports
7. Run tests with hot reload during development
8. Implement continuous testing workflows

## 🛠 Technologies Used

- **Testing Framework**: Vitest
- **Test Utilities**: React Testing Library
- **Build Tool**: Vite
- **Assertion Library**: Vitest (built-in)
- **Component Framework**: React 19+
- **Code Quality**: ESLint

## 📁 Project Structure

```
TESTING/Frontend/
├── src/
│   ├── components/           # React components to test
│   │   ├── LoginForm.jsx
│   │   ├── LoginForm.test.jsx  # Component tests
│   │   ├── Button.jsx
│   │   └── Button.test.jsx
│   ├── App.jsx               # Main application
│   ├── App.test.jsx          # App tests
│   ├── App.css               # Styles
│   ├── index.css             # Global styles
│   └── main.jsx              # Entry point
├── vitest.config.js          # Vitest configuration
├── vite.config.js            # Vite configuration
├── package.json              # Project dependencies and scripts
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── build/                    # Production build output
├── public/                   # Static assets
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Navigate to TESTING/Frontend directory
cd TESTING/Frontend

# Install dependencies
npm install

# Verify installation
npm list vitest
```

## 🧪 Running Tests

### Run All Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run specific test file
npm run test LoginForm.test.jsx
```

### Generate Coverage Report

```bash
# Generate coverage report
npm run test:coverage

# View coverage in terminal
npm run test -- --coverage
```

## 💡 Test Structure Example

### Component Test

```jsx
// LoginForm.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  it('should render login form', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should update email input value', () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should show error for invalid email', () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
```
