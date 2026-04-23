# Experiment 4: State Management in React

This experiment demonstrates different approaches to managing state in React applications using Local State, Context API, and Redux.

## Learning Outcomes

### 1. Local State Management with useState Hook
useState is the simplest way to manage state in React - just call it and you get a value and a function to update it. Perfect when you only need data in one component, like form inputs or toggles. No setup needed, super straightforward, but gets messy when many components need the same data.

### 2. Context API for Global State Management
Context API lets you share data across components without passing props everywhere. Create a Context, wrap components with a Provider, and use the hook to access state anywhere inside. Great for things like theme or user info that don't change too often.

### 3. Redux for Complex State Management
Redux is like a central filing system for your entire app's data. You dispatch actions, they go through reducers, and the store updates. It's more structured and formal, but gives you superpowers like debugging and testing.

### 4. Comparing State Management Approaches
Use useState for component-specific stuff. Use Context API when multiple components need shared data that's relatively stable. Use Redux when your app gets complex and you need strict patterns and debugging tools. Pick the right tool for the job.

### 5. Redux vs Context API: Deep Dive
Redux has more structure and debugging tools, but it's heavier. Context API is lighter and simpler, but needs more manual work. Redux shines in big apps; Context works great for smaller ones. Neither is "better" - it depends on your needs.

