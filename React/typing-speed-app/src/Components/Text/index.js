import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { shuffleWords } from "../../redux/wordsSlice/wordsSlice";


function Text(){

    const data = useSelector((state)=>state.words);
    const dispatch = useDispatch();
   

  useEffect(() => {
    dispatch(shuffleWords());
  }, [])

    let tenwords = data.data.slice(0,10);
    let secondTen = data.data.slice(10,20);
    let targetWord = data.spaceCount %10;
    let currentWord = data.currentWord;
    let trueWords = data.trueWords;
    let wrongWords = data.wrongWords;

    const isContain=()=>{
        return data.data[targetWord].targetWord.toLowerCase().startsWith(currentWord.trim().toLowerCase());
    }

    return(
        <div className="container mt-5">
        <div className="text">
            <div>
            {
                tenwords.map((item,i)=>{
                    return <span key={i} className={currentWord.trim().length==0 && i==targetWord ? "gray":i==targetWord && isContain() ? "green":
                                                    i==targetWord && !isContain() ? "red":i<targetWord && trueWords.indexOf(item.targetWord.toLowerCase())!==-1 ?
                                                "green":i<targetWord && trueWords.indexOf(item.targetWord.toLowerCase())===-1 ? "red":""}>{item.targetWord.toLowerCase()} </span>
                })
            }
            </div>
            <div>
                {
                    secondTen.map((item,i)=>{
                        return <span key={i}>{item.targetWord} </span>
                    })
                }
            </div>
        </div>
        </div>
    )
}

export default Text;