# Experiment 9: Flask Authentication Methods

## Learning Outcomes

1. **Basic Authentication** — You'll understand how the classic username + password approach works under the hood — how credentials get packed into the `Authorization` header and how your server checks them on every request.

2. **Custom Token Auth** — You'll build your own simple token system from scratch using base64 encoding. It's a great way to see *why* tokens exist and how they flow between a client and server, before jumping to more complex solutions.

3. **JWT (JSON Web Tokens)** — You'll use `Flask-JWT-Extended` to issue and verify JWTs — the go-to standard for modern APIs.

4. **Reading auth headers** — different header formats — `Authorization: Basic ...`, `x-auth-token`, and `Authorization: Bearer ...` — and understanding what each one signals.

5. **Securing your routes** - auth check onto any route using decorators, so only users who've proven their identity can get through.