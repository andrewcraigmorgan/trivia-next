"use client";

import { useState, useEffect } from "react";
import { fetchTriviaQuestions } from "@/lib/api";
import { decode } from "he";

const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const data = await fetchTriviaQuestions(10, "9", "easy");
                setQuestions(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setLoading(false);
            }
        };

        loadQuestions();
    }, []);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore((prev) => prev + 1);
        }
        setCurrentIndex((prev) => prev + 1);
    };

    if (loading) return <div>Loading...</div>;

    if (currentIndex >= questions.length) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Trivia Game</h1>
                <p>Your final score is: {score}</p>
                <button onClick={() => window.location.reload()}>Restart</button>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(
        () => Math.random() - 0.5,
    );

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h1>Trivia Game</h1>
            <h2>{decode(currentQuestion.question)}</h2>
            {shuffledAnswers.map((answer, idx) => (
                <button
                    key={idx}
                    style={{
                        display: "block",
                        margin: "10px auto",
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                    onClick={() => handleAnswer(answer === currentQuestion.correct_answer)}
                >
                    {decode(answer)}
                </button>
            ))}
        </div>
    );
};

export default HomePage;
