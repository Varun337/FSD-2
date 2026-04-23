# Experiment 13: Student Management System - Flask MySQL CRUD API

## 📋 Description
This experiment demonstrates building a complete Student Management System using Flask with MySQL database integration. It showcases how to implement CRUD operations with data persistence, validation, and proper error handling using Flask-SQLAlchemy and Marshmallow.

## 🎯 Learning Outcomes
After completing this experiment, you will be able to:
1. Build a Flask API with CRUD operations for database-backed applications
2. Integrate MySQL database with Python using SQLAlchemy ORM
3. Define database models and relationships using Flask-SQLAlchemy
4. Implement data validation using Marshmallow schemas
5. Handle and display validation errors appropriately
6. Establish MySQL connections using PyMySQL driver
7. Execute database transactions and persistence operations
8. Build robust APIs with proper error handling

## 🛠 Technologies Used
- **Backend Framework**: Flask
- **ORM**: Flask-SQLAlchemy
- **Database**: MySQL
- **Validation**: Marshmallow
- **Database Driver**: PyMySQL
- **Language**: Python 3.7+
- **Data Format**: JSON

## 📁 Project Structure
```
exp-13/
├── app.py                  # Main Flask application
├── requirements.txt        # Project dependencies
├── config.py              # Database configuration
├── models.py              # SQLAlchemy models
├── schemas.py             # Marshmallow validation schemas
├── routes/
│   └── student_routes.py  # Student API endpoints
├── screenshots/           # Documentation and screenshots
├── output.log             # Application logs
└── README.md              # Project documentation
```

## 📋 Database Schema

### Students Table
```sql
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT CHECK (age >= 18 AND age <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🎨 API Endpoints

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
- MySQL Server
- pip (Python package manager)

### Installation
```bash
# Navigate to project directory
cd Backend/exp-13

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Database Configuration

Update `config.py` with your MySQL credentials:

```python
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'your_password'
DB_NAME = 'student_management'

SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
```

### Create Database
```bash
# Option 1: Create database manually in MySQL
CREATE DATABASE student_management;

# Option 2: Let Flask-SQLAlchemy create tables
python
>>> from app import app, db
>>> with app.app_context():
>>>     db.create_all()
```

### Running the Application
```bash
# Start the Flask application
python app.py

# The API will be available at http://localhost:5000
```

## 📝 API Usage Examples

### Create a New Student
```bash
curl -X POST http://localhost:5000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 20
  }'
```

Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20,
  "created_at": "2024-04-23T10:30:00"
}
```

### Get All Students
```bash
curl http://localhost:5000/students
```

### Get Student by ID
```bash
curl http://localhost:5000/students/1
```

### Update Student
```bash
curl -X PUT http://localhost:5000/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "age": 21
  }'
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/students/1
```

## 🔧 Key Components

### SQLAlchemy Model
```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
```

### Marshmallow Schema
```python
from marshmallow import Schema, fields, validate

class StudentSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True)
    age = fields.Int(required=True, validate=validate.Range(min=18, max=100))
```

## ✅ Validation Features

- Email format and uniqueness validation
- Age range validation (18-100)
- Name length validation
- Required field validation
- Automatic error message generation

## ✅ Conclusion
This experiment provides comprehensive understanding of building production-ready APIs with database integration. It demonstrates the complete CRUD cycle with proper validation, error handling, and database persistence—essential for modern web application development.
