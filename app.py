from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/")
def home():
    return "Smart Calculator Backend is Running!"

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json()

    num1 = data["num1"]
    num2 = data["num2"]
    operation = data["operation"]

    if operation == "+":
        result = num1 + num2

    elif operation == "-":
        result = num1 - num2

    elif operation == "*":
        result = num1 * num2

    elif operation == "/":
        if num2 == 0:
            return jsonify({"error": "Cannot divide by zero"})
        result = num1 / num2

    else:
        return jsonify({"error": "Invalid operation"})

    return jsonify({"result": result})


if __name__ == "__main__":
    app.run(debug=True)