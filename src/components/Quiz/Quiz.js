import React, { useState, useEffect } from "react";
import Question from "../Question/Question";
import { nanoid } from "nanoid";
import "./Quiz.css"

// Helpers:
function formatQuestionObjects(data) {
    // Cleans up the data from opentdb API call.
    // See README.md ffor Object structure.

    const qustionObjects = data.map(question => {

        const choices = shuffler([
            ...question.incorrect_answers,
            question.correct_answer
        ]);

        const formattedChoices = choices.map(choice => {
            return {
                id: `choice-${nanoid()}`,
                value: parseQuestionStrings(choice),
                isSelected: false,
                isCorrect: (question.correct_answer === choice)
            }
        })

        return {
            id: `question-${nanoid()}`,
            question: parseQuestionStrings(question.question),
            correctAnswer: parseQuestionStrings(question.correct_answer),
            choices: formattedChoices
        }
    })

    return qustionObjects
}

function shuffler(arr) {
    // Randomly rearranges the elements of an array.
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp;
    }
    return arr
}

function parseQuestionStrings(str) {
    // get rid of escaped special characters: 
    const parsed = new DOMParser()
        .parseFromString(str, "text/html")

    return parsed.documentElement.textContent;
}

export default function Quiz() {

    const [quizData, setQuizData] = useState([]);
    const [gameOngoing, setGameOngoing] = useState(true);
    const [correctCount, setCorrectCount] = useState(0);

    useEffect(() => {
        async function getQuestions() {
            const res = await fetch("https://opentdb.com/api.php?amount=5");
            const data = await res.json();

            setQuizData(formatQuestionObjects(data.results))
        }

        getQuestions();
    }, [])



    function selectChoice(event) {
        // The id of the choice selected + id of parent question
        let questionID = event.target.parentElement.previousElementSibling.id;
        let eventChoiceID = event.target.id;

        let newQuizData = quizData.map(question => {
            if (question.id !== questionID) {
                let newChoices = question.choices.map(choice => {
                    return { ...choice }
                })

                return { ...question, choices: newChoices }
            } else {
                let newChoices = question.choices.map(choice => {
                    if (choice.id === eventChoiceID) {
                        return { ...choice, isSelected: true };
                    } else {
                        return { ...choice, isSelected: false };
                    }
                })

                return { ...question, choices: newChoices }
            }
        })

        setQuizData(newQuizData);
    }

    function checkResults() {
        let newCorrectCount = 0;

        quizData.forEach(quizObj => {
            quizObj.choices.forEach(choice => {
                if (choice.isSelected && choice.isCorrect) {
                    newCorrectCount++
                }
            })
        })

        setCorrectCount(newCorrectCount);
        setGameOngoing(false);
    }

    const quizItems = quizData.map(question => {
        return (
            < Question
                key={question.id}
                question={question}
                selectChoice={selectChoice}
                gameOngoing={gameOngoing}
            />
        )
    })

    const btnResults = gameOngoing ?
        <button className="btn--generic" onClick={checkResults}>Check Results</button> :
        <>
            <p className="results">You scored {correctCount} / {quizData.length} correct answers</p>
            <button className="btn--generic">Play Again</button>
        </>

    return (
        <main className="quiz">
            {quizItems}
            <div className="results-group">
                {btnResults}
            </div>
        </main>
    )
}