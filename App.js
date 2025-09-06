import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [role, setRole] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async () => {
    if (!ageGroup) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/quiz/${ageGroup}`);
      setQuiz(res.data.questions);
    } catch (err) {
      console.error("Error fetching quiz:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (ageGroup) fetchQuiz();
  }, [ageGroup]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">📚 Smart Education</h1>
        <p className="mt-3 text-lg text-gray-700">Learn Anytime, Anywhere – For All Ages</p>
      </header>

      {!role && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <button onClick={() => setRole("student")} className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl">🎓 I am a Student</button>
          <button onClick={() => setRole("teacher")} className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl">👩‍🏫 I am a Teacher</button>
          <button onClick={() => setRole("parent")} className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl">👨‍👩‍👧 I am a Parent</button>
        </div>
      )}

      {role === "student" && !ageGroup && (
        <div className="max-w-3xl mx-auto mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Select Your Age Group</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => setAgeGroup("kids")} className="p-6 bg-green-100 rounded-2xl shadow hover:shadow-lg">🧒 Kids (5–12)</button>
            <button onClick={() => setAgeGroup("teens")} className="p-6 bg-yellow-100 rounded-2xl shadow hover:shadow-lg">👦 Teens (13–18)</button>
            <button onClick={() => setAgeGroup("college")} className="p-6 bg-blue-100 rounded-2xl shadow hover:shadow-lg">🎓 College (18–25)</button>
            <button onClick={() => setAgeGroup("pro")} className="p-6 bg-purple-100 rounded-2xl shadow hover:shadow-lg">💼 Professionals (25+)</button>
          </div>
        </div>
      )}

      {role === "teacher" && (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">👩‍🏫 Teacher Dashboard</h2>
          <p>Upload quizzes, assign tasks, and track student progress here.</p>
        </div>
      )}

      {role === "parent" && (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">👨‍👩‍👧 Parent Dashboard</h2>
          <p>View your child’s performance, strengths, and recommendations.</p>
        </div>
      )}

      {ageGroup && (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">🎓 Student Dashboard ({ageGroup})</h2>
          {loading && <p>Loading quiz...</p>}
          {!loading && quiz.length === 0 && <p>No quiz available yet for this age group.</p>}
          {!loading && quiz.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Your Quiz:</h3>
              <ul className="list-disc ml-6">
                {quiz.map((q, idx) => (<li key={idx} className="mb-2">{q}</li>))}
              </ul>
            </div>
          )}
        </div>
      )}

      {(role || ageGroup) && (
        <div className="text-center mt-10">
          <button onClick={() => { setRole(null); setAgeGroup(null); setQuiz([]); }} className="px-6 py-3 bg-red-500 text-white rounded-xl shadow hover:bg-red-600">⬅️ Go Back</button>
        </div>
      )}
    </div>
  );
}
