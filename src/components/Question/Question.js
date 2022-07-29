import React from "react";
import Choice from "../Choice/Choice"
import "./Question.css"

export default function Question(props) {
    const {
        question: { id, question, choices },
        selectChoice,
        gameOngoing
    } = props;

    const choiceElements = choices.map(choice => {
        return (
            <Choice
                key={choice.id}
                id={choice.id}
                choice={choice}
                selectChoice={selectChoice}
                gameOngoing={gameOngoing}
            />
        )
    })

    return (
        <div className="quiz-item">
            <p className="question" id={id}>{question}</p>
            <div className="choices">
                {choiceElements}
            </div>
        </div>
    );

}