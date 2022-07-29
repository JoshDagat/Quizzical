import React from "react";
import "./Intro.css"

export default function Intro({ startGame }) {
    return (
        <>
            <h1 className="title">Quizzical</h1>
            <p className="description">The savvy trivia game for savvy people!</p>
            <button className="btn--intro" onClick={startGame}>
                Start Quiz
            </button>
        </>
    )
}