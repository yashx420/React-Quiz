export default function NextButton({dispatch, answer, index, n}){
    if(answer === null) return null;

    if(index < n-1) return (
        <button className="btn btn-ui" onClick={()=>dispatch({type: "nextQuestion"})}>Next</button>
    );
    if(index === n-1) return (
        <button className="btn btn-ui" onClick={()=>dispatch({type: "finish"})}>Finish</button>
    );
}