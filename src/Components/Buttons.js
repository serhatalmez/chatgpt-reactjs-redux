import React from 'react';
import { useDispatch } from 'react-redux';
import { addHistory } from '../store/actions/history';


let count = 0;
export default function History() {
    const dispatch = useDispatch();
    return (
        <button onClick={() =>  dispatch(addHistory("Soru "+ (count = count + 1)))} style={{"marginTop": "13px", "marginBottom":"13px"}}>Add To History</button>
    );
}