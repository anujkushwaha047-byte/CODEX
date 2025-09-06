from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

quizzes = {
    "kids": [f"Kid Question {i+1}" for i in range(25)],
    "teens": [f"Teen Question {i+1}" for i in range(25)],
    "college": [f"College Question {i+1}" for i in range(25)],
    "pro": [f"Professional Question {i+1}" for i in range(25)]
}

@app.route("/api/quiz/<age_group>", methods=["GET"])
def get_quiz(age_group):
    return jsonify({"questions": quizzes.get(age_group, [])})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
