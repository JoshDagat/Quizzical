import React from "react";
import Quiz from "./components/Quiz/Quiz";
import Intro from "./components/Intro/Intro";
import "./App.css";


export default function App() {
    const [init, setInit] = React.useState(true);

    function startGame() {
        setInit(false);
    }
    return (
        <div className="App">
            {init ? <Intro startGame={startGame} /> : <Quiz />}
        </div>
    )
}