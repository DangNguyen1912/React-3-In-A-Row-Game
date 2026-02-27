import { useState } from "react";
import Board from "./Board";

export default function Sample() {
    const [incorrect, setIncorrect] = useState(false)
    const [load, setLoad] = useState(0)
    const [check, setCheck] = useState(0)

    return <div id="sample">
        <h2>Sample Game</h2>
        <button onClick={() => { setLoad(load + 1) }}>Reload</button>
        <Board board={"sample"} load={load} incorrect={incorrect} check={check} />
        <div>
            Show incorrect square
            <input type="checkbox" onChange={(event) => {
                setIncorrect(event.target.checked);
                
            }}/>
        </div>
        <button onClick={() => {
            setCheck(check+1)
        }}>check</button>
    </div>
}