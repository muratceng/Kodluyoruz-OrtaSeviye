import { useEffect } from "react";
import { useSelector } from "react-redux";

function Result(){

    const data = useSelector((state)=> state.words);
    let trueWords = data.trueWords;
    let wrongWords = data.wrongWords;

    const percantage =()=>{
        return ((trueWords.length / (trueWords.length+wrongWords.length))*100)
        
    }

    useEffect(() => {
        console.log("true",trueWords.length);
        console.log("wrong",wrongWords.length);
    }, [trueWords,wrongWords])
    
    return (
        <div className="result">
            <h1>{trueWords.length} K/DK</h1>
            <h1> % {percantage().toFixed(2)} Başarı oranı</h1>
        </div>
    )
}

export default Result;