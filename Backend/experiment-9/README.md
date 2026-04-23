# Experiment 9: Flask Authentication Methods

## 📋 Description
This experiment demonstrates three fundamental authentication mechanisms for securing Flask APIs: Basic Authentication, Custom Token Authentication, and JWT (JSON Web Tokens). Learn how to implement secure authentication from first principles and understand the trade-offs between different approaches.

## 🎯 Learning Outcomes
After completing this experiment, you will be able to:
1. Implement **Basic Authentication** using Base64-encoded credentials
2. Build **Custom Token Authentication** from scratch
3. Implement **JWT (JSON Web Token) authentication** using Flask-JWT-Extended
4. Understand various Authorization header formats and their use cases
5. Secure API routes with authentication decorators
6. Handle token generation, validation, and expiration
7. Compare authentication mechanisms and choose appropriate solutions
8. Implement refresh tokens and token revocation

## 🛠 Technologies Used
- **Backend Framework**: Flask
- **JWT Library**: Flask-JWT-Extended
- **Language**: Python 3.7+
- **Encoding**: Base64 (Basic Auth), JSON Web Token Standard
- **Security**: Authorization Headers, Password Hashing

## 📁 Project Structure
```
experiment-9/
├── app.py                       # Main Flask application
├── requirements.txt             # Project dependencies
├── config.py                    # Configuration settings
├── auth/
│   ├── basic_auth.py           # Basic authentication implementation
│   ├── custom_token_auth.py    # Custom token authentication
│   └── jwt_auth.py             # JWT authentication
├── routes/
│   └── protected_routes.py      # Protected API endpoints
├── postman-api-guide.html       # Postman testing guide
├── render.yaml                  # Deployment configuration
├── screenshots/                 # Documentation and screenshots
└── README.md                    # Project documentation
```

## 🔐 Authentication Methods Comparison

| Method | Header Format | Security | Scalability | Use Case |
|--------|---------------|----------|-------------|----------|
| Basic Auth | `Authorization: Basic base64(user:pass)` | Low | Poor | Testing, internal APIs |
| Custom Token | `x-auth-token: <token>` | Medium | Medium | Legacy systems |
| JWT | `Authorization: Bearer <token>` | High | Excellent | Modern APIs, microservices |

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation
```bash
# Navigate to project directory
cd Backend/experiment-9

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Running the Application
```bash
# Start the Flask application
python app.py

# The API will be available at http://localhost:5000
```

## 🔑 Authentication Implementations

### 1. Basic Authentication

**Concept**: Username and password encoded in Base64

```python
import base64
from functools import wraps
from flask import request, jsonify

def basic_auth_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth = request.headers.get('Authorization')
        
        if not auth:
            return jsonify({'message': 'Missing authorization header'}), 401
        
        try:
            # Decode Basic auth header
            auth_type, credentials = auth.split(' ')
            if auth_type.lower() != 'basic':
                return jsonify({'message': 'Invalid auth type'}), 401
            
            decoded = base64.b64decode(credentials).decode('utf-8')
            username, password = decoded.split(':', 1)
            
            # Verify credentials
            if verify_credentials(username, password):
                return f(*args, **kwargs)
            else:
                return jsonify({'message': 'Invalid credentials'}), 401
        except Exception as e:
            return jsonify({'message': 'Invalid authorization header'}), 401
    
    return decorated_function

@app.route('/basic-protected')
@basic_auth_required
def basic_protected_route():
    return jsonify({'message': 'Access granted with Basic Auth'}), 200
```

**Usage**:
```bash
curl -H "Authorization: Basic dXNlcjpwYXNzd29yZA==" \
     http://localhost:5000/basic-protected
```

### 2. Custom Token Authentication

**Concept**: Custom token system with Base64 encoding

```python
import base64
import uuid
from datetime import datetime, timedelta

# In-memory token store (use database in production)
tokens = {}

def generate_custom_token(username):
    """Generate a custom authentication token"""
    token = base64.b64encode(f"{username}:{uuid.uuid4()}".encode()).decode()
    tokens[token] = {
        'username': username,
        'created_at': datetime.utcnow(),
        'expires_at': datetime.utcnow() + timedelta(hours=24)
    }
    return token

def verify_custom_token(token):
    """Verify custom token validity"""
    if token not in tokens:
        return False
    
    token_data = tokens[token]
    if datetime.utcnow() > token_data['expires_at']:
        del tokens[token]
        return False
    
    return True

def custom_token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('x-auth-token')
        
        if not token or not verify_custom_token(token):
            return jsonify({'message': 'Invalid or missing token'}), 401
        
        return f(*args, **kwargs)
    
    return decorated_function

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    # Verify credentials (simplified)
    token = generate_custom_token(data.get('username'))
    return jsonify({'token': token}), 200

@app.route('/custom-protected')
@custom_token_required
def custom_protected_route():
    return jsonify({'message': 'Access granted with Custom Token'}), 200
```

**Usage**:
```bash
# Get token
token=$(curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}' | jq -r '.token')

# Use token
curl -H "x-auth-token: $token" \
     http://localhost:5000/custom-protected
```

### 3. JWT Authentication

**Concept**: Stateless, cryptographically signed tokens

```python
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt = JWTManager(app)

@app.route('/auth/jwt-login', methods=['POST'])
def jwt_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Verify credentials
    if verify_credentials(username, password):
        access_token = create_access_token(identity=username)
        return jsonify({'access_token': access_token}), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/jwt-protected')
@jwt_required()
def jwt_protected_route():
    current_user = get_jwt_identity()
    return jsonify({
        'message': 'Access granted with JWT',
        'user': current_user
    }), 200
```

**Usage**:
```bash
# Get JWT token
token=$(curl -X POST http://localhost:5000/auth/jwt-login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}' | jq -r '.access_token')

# Use JWT token
curl -H "Authorization: Bearer $token" \
     http://localhost:5000/jwt-protected
```

## 📝 API Endpoints

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| POST | `/auth/login` | None | Get JWT token |
| GET | `/basic-protected` | Basic Auth | Protected with Basic Auth |
| POST | `/auth/token` | None | Generate custom token |
| GET | `/custom-protected` | Custom Token | Protected with custom token |
| GET | `/jwt-protected` | JWT | Protected with JWT |
| GET | `/public` | None | Public endpoint |

## 🧪 Testing with Postman

Refer to `postman-api-guide.html` for detailed Postman collection instructions.

## 🔒 Security Best Practices

1. **Use HTTPS** – Always transmit credentials over secure channels
2. **Password Hashing** – Use bcrypt or similar for password storage
3. **Token Expiration** – Implement token expiry and refresh
4. **Secret Management** – Keep JWT secret keys secure
5. **Rate Limiting** – Prevent brute force attacks
6. **CORS Configuration** – Restrict cross-origin requests
7. **Input Validation** – Validate all user inputs

## ✅ Conclusion
This experiment provides a comprehensive understanding of authentication mechanisms in Flask APIs. Starting from Basic Auth through Custom Tokens to production-grade JWT authentication, you'll learn how to secure APIs effectively and understand the trade-offs between different authentication approaches—essential knowledge for building secure web applications.