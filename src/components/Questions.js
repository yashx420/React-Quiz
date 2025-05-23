import Options from "./Options";

export default function Questions({dispatch, question, answer}){
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer}/>
        </div>
        
    );
}