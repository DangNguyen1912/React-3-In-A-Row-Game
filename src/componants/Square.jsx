export default function Square({ canToggle, currentState, correctState, handleOnClick, incorrect, row, col}) {
    return <button 
        onClick={canToggle ? () => handleOnClick(row, col) : () => { }}
        className={
            "square "
            + (canToggle ? "" : "lock ")
            + (currentState === 1 ? "one " : currentState === 2 ? "two " : "zero ")
            + (incorrect && currentState !== correctState && currentState !== 0 ? "incorrect" : "")
        }
    ></button>
}