import React from 'react';
import './History.css';
import { useSelector } from 'react-redux';
function History() {
    const state = useSelector((state => state.history));
    console.log(state)
    return (
        <div className="history">
            <h2>History</h2>
            <div className="history_container">
                {state.map((item, index) => {
                    return (
                        <div className="history_item" >
                            <p>{item}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default History;