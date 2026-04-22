# Experiment 11 — Microservice-Based Backend Module

## Learning Outcomes

1. **Created 2 independent backend microservices** — a Customer Service and an Order Service — each handling distinct API responsibilities and running on separate ports.
2. **Implemented inter-service communication** — the Customer Service makes live HTTP calls to the Order Service using the `requests` library, simulating real-world microservice interaction.
3. **Set up isolated Python environments** — used `venv` to create separate virtual environments (`venv-customer`, `venv-order`) per service, following microservice isolation best practices.
4. **Designed and exposed RESTful API endpoints** — built `GET` and `PUT` routes using Flask, understanding how HTTP methods map to CRUD operations in a service-based architecture.
5. **Tested inter-service data flow end-to-end** — validated that a single API call to the Customer Service correctly aggregates data from the Order Service, confirming the microservices work together as a system.

