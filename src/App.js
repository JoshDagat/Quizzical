import React from "react";
import Quiz from "./components/Quiz/Quiz";
import Intro from "./components/Intro/Intro";
import "./App.css";


export default function App() {
    const [init, setInit] = React.useState(true);
    return (
        <div className="App">
            {init ? <Intro /> : <Quiz />}
        </div>
    )
}