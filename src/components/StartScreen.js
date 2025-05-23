export default function StartScreen({n, dispatch}){
    

    return (
        <div className="start">
            <h2>Welcome to this React Quiz!</h2>
            <h3>{n} questions to test your react mastery.</h3>
            <button className="btn btn-ui" onClick={()=> dispatch({type: "start"})}>Start Quiz</button>
        </div>
    )
}   