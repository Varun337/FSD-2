# React Lazy Loading – Experiment 5

---

## Learning Outcomes

After completing this experiment, you will be able to:

1. Understand the concept of lazy loading and its importance in frontend performance optimization  
2. Implement lazy loading in React using `React.lazy()` and `Suspense`  
3. Apply lazy loading to routes using `react-router-dom`  
4. Reduce initial bundle size and improve application load time  
5. Structure a React application efficiently for scalability and performance  

---

## What is Lazy Loading?

Lazy Loading is a performance optimization technique where components are **loaded only when they are required**, instead of loading the entire application at once.

In React, lazy loading helps:
- Reduce initial bundle size 

- Improve first load time
- Enhance user experience, especially in large applications

React provides built-in support for lazy loading using:
- `React.lazy()` 
- `Suspense`

---

## How Lazy Loading Works in React

- Components are split into separate chunks
- These chunks are fetched **only when the route or component is rendered**
- A fallback UI (like a loading message) is shown while the component loads

---
