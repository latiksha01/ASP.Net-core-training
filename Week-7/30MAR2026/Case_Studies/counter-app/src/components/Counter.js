import React, {useState} from "react";

function Counter(){
    const [count, setCount] = useState(0);
    const [lastAction, setLastAction] = useState("None");
    const [step, setStep] = useState(1);
    const increment = () =>
        {
            setCount(count + step);
            setLastAction("Increment");
        }
    const decrement = () => 
        {
            setCount(count - step);
            setLastAction("Decrement");
        }
    const reset = () => 
        {
            setCount(0);
            setStep(1);
            setLastAction("Reset");
        }
    const buttonStyle = {
        margin: '0 10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
    }

    return (
        <><div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', margin: '20px' }}>
                <h1>Count: {count}</h1>
            </div>
        </div>

        <div style={{marginBottom: '20px'}}>
            <label>Step:
                <input
                    type="number"
                    value={step}
                    onChange={(e) => setStep(Number(e.target.value))}
                    style={{ marginLeft: '10px', }} />
            </label>
        </div>
        <div>
            <button onClick={increment} style={buttonStyle} >Increment</button>
            <button onClick={decrement} style={buttonStyle} >Decrement</button>
            <button onClick={reset} style={buttonStyle}>Reset</button>

        </div>
        <div style={{ marginTop: '20px', fontStyle: 'italic'}}>
            Last Action: {lastAction}
        </div>
        </>
    );

    
}
 export default Counter;