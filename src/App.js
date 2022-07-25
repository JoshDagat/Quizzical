import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz/Quiz";


export default function App() {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        async function getQuestions() {
            const res = await fetch("https://opentdb.com/api.php?amount=10");
            const data = await res.json();
            setQuizData(data.results);
        }
        getQuestions();
    }, [])

    return (
        <div className="App">
            <Quiz data={quizData} />
        </div>
    )
}