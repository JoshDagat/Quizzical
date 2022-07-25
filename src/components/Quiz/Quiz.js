import React from "react";
import Question from "../Question/Question"

export default function Quiz(props) {
    // question, correct_answer, incorrect_answers
    console.log(props.data)

    const quizItems = props.data.map((query, index) => {
        return (
            <Question key={`quiz-${index}`} query={query} />
        )
    })


    return (
        <main className="quiz">
            {quizItems}
        </main>
    )
}