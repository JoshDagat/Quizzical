import React from "react";

export default function Question(props) {
    return (
        <div className="quiz-item">
            <p className="question">{props.query.question}</p>
            <div className="choices"></div>
        </div>
    );

}