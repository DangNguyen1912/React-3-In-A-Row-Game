import { useEffect, useState } from "react"
import Square from "./Square"

export default function Board({ board, load, incorrect, check }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState(null)
    const [info, setInfo] = useState("")

    const loadData = useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://threeinarow-api.onrender.com/threeinarow/' + board);
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                const result = await response.json();
                setRows(result.rows)
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [load]);

    const checkBoard = useEffect(() => {
        if (!rows) return;

        const hasError = rows.some((row) =>
            row.some((square) =>
                square.currentState !== 0 && square.currentState !== square.correctState
            )
        );

        const isFinish = rows.some((row) => row.some(square => square.currentState === 0));
        if (!hasError) {
            if (!isFinish) {
                setInfo("You did it!");
            } else {
                setInfo("So far so good")
            }
        } else {
            setInfo("Something is wrong");
        }
    }, [check]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    function handleOnClick(row, col) {
        const newRows = rows.map((r, rowIndex) => {
            if (rowIndex !== row) return r;
            return r.map((square, colIndex) => {
                if (colIndex !== col) return square;
                return { ...square, currentState: (square.currentState + 1) % 3 };
            });
        });
        setRows(newRows);
    }

    const result = rows.map((row, rowIndex) => {
        return <div className="row" key={`row-${rowIndex}`}>
            {row.map((square, colIndex) => <Square
                key={`square-${rowIndex}-${colIndex}`}
                canToggle={square.canToggle}
                currentState={square.currentState}
                correctState={square.correctState}
                handleOnClick={handleOnClick}
                incorrect={incorrect}
                col={colIndex}
                row={rowIndex}
            />)}
        </div>
    })

    return <>
        {result}
        <br />
        {info}
    </>
}
