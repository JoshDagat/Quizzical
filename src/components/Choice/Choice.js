import React from "react";
import "./Choice.css"

export default function Choice(props) {
    const {
        choice: { id, value, isSelected, isCorrect },
        selectChoice,
        gameOngoing
    } = props

    let bgColor = '';
    if (isCorrect && gameOngoing === false) {
        bgColor = "rgba(148, 215, 162, 1)"
    } else if (isSelected && gameOngoing === false && isCorrect === false) {
        bgColor = "rgba(248, 188, 188, 1)"
    } else if (isSelected && gameOngoing) {
        bgColor = "rgba(214, 219, 245, 1)"
    } else {
        bgColor = "transparent"
    }

    let styles = {
        backgroundColor: bgColor
    }

    return (
        <>
            <button
                id={id}
                className="choice"
                style={styles}
                onClick={selectChoice}
            >
                {value}
            </button>
        </>
    )
}