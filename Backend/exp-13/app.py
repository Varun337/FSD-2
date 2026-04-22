from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, validate, ValidationError
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)

# Update MySQL credentials below
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Utkcu12!@localhost/chandigarh_university_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ===============================
# Student Model
# ===============================
class Student(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "name": self.name,
            "age": self.age,
        }

# ===============================
# Validation Schema
# ===============================
class StudentSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=2))
    age = fields.Int(required=True, validate=validate.Range(min=1, max=120))
    uid = fields.Str(required=True)

student_schema = StudentSchema()
student_update_schema = StudentSchema(partial=True)

# ===============================
# Global Error Handler
# ===============================
@app.errorhandler(ValidationError)
def handle_validation_error(e):
    return jsonify({"validation_errors": e.messages}), 400

# ===============================
# CREATE Student
# ===============================
@app.route('/students', methods=['POST'])
def create_student():
    data = request.get_json()
    validated_data = student_schema.load(data)

    student = Student(**validated_data)
    db.session.add(student)
    db.session.commit()

    return jsonify(student.to_dict()), 201

# ===============================
# READ All Students
# ===============================
@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([s.to_dict() for s in students])

# ===============================
# READ One Student
# ===============================
@app.route('/students/<int:id>', methods=['GET'])
def get_student(id):
    student = Student.query.get_or_404(id)
    return jsonify(student.to_dict())

# ===============================
# UPDATE Student
# ===============================
@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    student = Student.query.get_or_404(id)
    data = request.get_json()
    validated_data = student_update_schema.load(data)

    for key, value in validated_data.items():
        setattr(student, key, value)

    db.session.commit()
    return jsonify(student.to_dict())

# ===============================
# DELETE Student
# ===============================
@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.get_or_404(id)
    db.session.delete(student)
    db.session.commit()
    return jsonify({"message": "Student deleted successfully"})

@app.route('/')
def home():
    return jsonify({"message": "Flask MySQL Students CRUD API with Validation Running"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)
