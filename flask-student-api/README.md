# Flask Student API

## 📋 Description
A standalone Flask REST API for student management with complete CRUD operations, MySQL database integration, and comprehensive API testing using Postman. This project serves as a practical implementation of backend API development best practices.

## 🎯 Learning Outcomes
After completing this project, you will be able to:
1. Build RESTful APIs using Flask framework
2. Implement complete CRUD (Create, Read, Update, Delete) operations
3. Integrate MySQL database with Python applications
4. Apply input validation for reliable data handling
5. Design efficient API endpoints and request/response structures
6. Test and debug APIs using Postman
7. Implement error handling and status codes
8. Deploy Flask applications locally and remotely

## 🛠 Technologies Used
- **Backend Framework**: Flask
- **Database**: MySQL
- **Language**: Python 3.7+
- **Testing**: Postman
- **Data Format**: JSON
- **Database Library**: PyMySQL or MySQLdb

## 📁 Project Structure
```
flask-student-api/
├── app.py                  # Main Flask application
├── config.py              # Configuration settings
├── requirements.txt       # Project dependencies
├── routes/
│   └── student_routes.py  # Student API endpoints
├── models/
│   └── student.py         # Student data model
├── utils/
│   └── validation.py      # Input validation utilities
├── README.md              # Project documentation
└── README.md.txt          # Additional documentation
```

## 🎨 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/<id>` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/<id>` | Update student |
| DELETE | `/api/students/<id>` | Delete student |
| GET | `/api/students/search?name=<name>` | Search students by name |

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- MySQL Server
- pip (Python package manager)
- Postman (for API testing)

### Installation
```bash
# Navigate to project directory
cd flask-student-api

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Database Setup

**Create MySQL Database**:
```sql
CREATE DATABASE student_api;

USE student_api;

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    age INT,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Update Configuration**:
```python
# config.py
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'your_password'
DB_NAME = 'student_api'
```

### Running the Application
```bash
# Start the Flask application
python app.py

# The API will be available at http://localhost:5000
```

## 📝 API Usage Examples

### Get All Students
```bash
curl http://localhost:5000/api/students
```

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "age": 20,
    "address": "123 Main St"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "0987654321",
    "age": 21,
    "address": "456 Oak Ave"
  }
]
```

### Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "5555555555",
    "age": 20,
    "address": "789 Pine Rd"
  }'
```

Response:
```json
{
  "id": 3,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "5555555555",
  "age": 20,
  "address": "789 Pine Rd"
}
```

### Get Student by ID
```bash
curl http://localhost:5000/api/students/1
```

### Update Student
```bash
curl -X PUT http://localhost:5000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "age": 21
  }'
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/1
```

### Search Students
```bash
curl "http://localhost:5000/api/students/search?name=John"
```

## 🧪 Testing with Postman

1. **Import Collection**: Create a new Postman collection for Student API
2. **Set Base URL**: `{{base_url}}/api`
3. **Create Requests**:
   - GET /students
   - POST /students
   - GET /students/{{student_id}}
   - PUT /students/{{student_id}}
   - DELETE /students/{{student_id}}
4. **Use Environment Variables**: Store base_url and student_id
5. **Run Tests**: Use Postman's test scripts to validate responses

## ✅ Validation Rules

- **Name**: Required, string, 1-100 characters
- **Email**: Required, valid email format, unique
- **Phone**: Optional, 10-20 digits
- **Age**: Optional, 15-100 years old
- **Address**: Optional, string, max 255 characters

## 🔒 Error Handling

The API returns appropriate HTTP status codes:
- `200 OK` – Successful GET/PUT request
- `201 Created` – Successful POST request
- `204 No Content` – Successful DELETE request
- `400 Bad Request` – Invalid input data
- `404 Not Found` – Resource not found
- `409 Conflict` – Email already exists
- `500 Internal Server Error` – Server error

## ✅ Conclusion
This Flask Student API project demonstrates the complete lifecycle of building a production-ready REST API with database integration, validation, and comprehensive testing—providing a solid foundation for backend development.
