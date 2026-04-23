# Experiment 8: Student Management REST API

## 📋 Description
This experiment demonstrates the creation of a lightweight RESTful API using Flask. It covers fundamental REST API concepts including endpoint design, HTTP methods, JSON data handling, and modular code structure using Flask Blueprints. Perfect for learning backend API development.

## 🎯 Learning Outcomes
After completing this experiment, you will be able to:
1. Set up a Flask web server and define REST API endpoints
2. Implement all HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) for CRUD operations
3. Handle JSON data for request/response communication
4. Organize code using Flask Blueprints for modular architecture
5. Manage in-memory data storage and state
6. Implement error handling and HTTP status codes
7. Test APIs using tools like Postman or curl
8. Deploy a Flask application locally

## 🛠 Technologies Used
- **Backend Framework**: Flask
- **Language**: Python 3.7+
- **Data Format**: JSON
- **Architecture Pattern**: REST API
- **Code Organization**: Flask Blueprints
- **Package Manager**: pip

## 📁 Project Structure
```
Exp-8/
├── routes/
│   └── student_routes.py   # Student API endpoints
├── app.py                  # Main Flask application
├── run.py                  # Application runner
├── requirements.txt        # Project dependencies
├── runtime.txt            # Python version specification
├── README.md              # Project documentation
├── screenshots/           # Screenshots and documentation
└── vir-exp-8/             # Virtual environment
```

## 🎨 API Endpoints

The Student Management API provides the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/<id>` | Get student by ID |
| POST | `/students` | Create a new student |
| PUT | `/students/<id>` | Update student by ID |
| DELETE | `/students/<id>` | Delete student by ID |

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip (Python package manager)
- Virtual environment (venv)

### Installation
```bash
# Navigate to project directory
cd Backend/Exp-8

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Running the Application
```bash
# Run the application
python run.py

# The API will be available at http://localhost:5000
```

## 📝 API Usage Examples

### Get All Students
```bash
curl http://localhost:5000/students
```

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 20
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 21
  }
]
```

### Create a New Student
```bash
curl -X POST http://localhost:5000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com","age":20}'
```

### Get Student by ID
```bash
curl http://localhost:5000/students/1
```

### Update Student
```bash
curl -X PUT http://localhost:5000/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated","email":"newemail@example.com","age":21}'
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/students/1
```

## 🔧 Key Components

### Flask Blueprints
Blueprints organize routes and functions into modular components:

```python
from flask import Blueprint

student_bp = Blueprint('students', __name__, url_prefix='/students')

@student_bp.route('', methods=['GET'])
def get_all_students():
    # Implementation
    pass
```

### In-Memory Storage
Data is stored in memory using Python lists/dictionaries:

```python
students = [
    {"id": 1, "name": "John", "email": "john@example.com", "age": 20},
    {"id": 2, "name": "Jane", "email": "jane@example.com", "age": 21}
]
```

## ✅ Conclusion
This experiment provides a strong foundation in building RESTful APIs with Flask. It demonstrates best practices for API design, code organization, and HTTP protocol implementation—essential skills for backend development.
