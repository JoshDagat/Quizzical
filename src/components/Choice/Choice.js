import { NoEncryption } from "@material-ui/icons";
import React from "react";
import "./Choice.css"

export default function Choice(props) {
    const {
        choice: { id, value, isSelected, isCorrect },
        selectChoice,
        gameOngoing
    } = props

    // Change button color:
    let bgColor = "transparent";
    let fontColor = "rgba(41, 50, 100, 1)";
    let borderStyle = "1px solid rgba(77, 91, 158, 1)";

    // The correct answer is always green at end game:
    if (isCorrect && gameOngoing === false) {
        bgColor = "rgba(148, 215, 162, 1)"; // Green
        borderStyle = "1px solid rgba(148, 215, 162, 1)";
    }
    // Incorrect answers at end game become red:
    else if (isSelected && gameOngoing === false && isCorrect === false) {
        bgColor = "rgba(248, 188, 188, 1)" // Red
        borderStyle = "1px solid rgba(248, 188, 188, 1)";
    }
    // Selected answers while game is ongoing turn light blue: 
    else if (isSelected && gameOngoing) {
        bgColor = "rgba(214, 219, 245, 1)" // Light blue
        borderStyle = "1px solid rgba(214, 219, 245, 1)"
    }
    // Not selected and game is ended:
    else if (isSelected === false && gameOngoing === false) {
        fontColor = "rgba(77, 91, 158, 1)"
        borderStyle = "1px solid rgba(77, 91, 158, 1)"
    }

    let styles = {
        backgroundColor: bgColor,
        color: fontColor,
        border: borderStyle
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