from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/students')
def students():
    return jsonify([
        {"id": 1, "name": "Varun"},
        {"id": 2, "name": "Rahul"}
    ])

if __name__ == "__main__":
    app.run(debug=True)