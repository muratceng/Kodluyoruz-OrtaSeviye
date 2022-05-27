import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRefresh} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffleWords,setSpaceCount, setCurrentword, setTrueWords, setWorngWords } from "../../redux/wordsSlice/wordsSlice";
import Result from "../Result";


function Form(){

    const [text,setText]=useState("");
    const [count,setCount]=useState(0);
    const [seconds,setSeconds] = useState(60);
    const [wordCount,setWordCount]=useState(0);
    const [correct,setCorrect]=useState(0);
    const [wrong,setWrong]=useState(0);

    const data = useSelector((state)=>state.words);
    const dispatch = useDispatch();
  
    if (count>1) {
        if(seconds>0){
            setTimeout(() => {
                setSeconds(seconds-1)
            }, 1000);
        }
    }

    const handleSpace= (e) => {
        if (e.keyCode === 32) {
          if(text.trim().toLowerCase() == data.data[wordCount].targetWord.toLowerCase()){
              setCorrect(correct+1);
              dispatch(setTrueWords(text.trim()));
          }else{
              setWrong(wrong+1);
              dispatch(setWorngWords(text.trim()));
          }
          setWordCount(wordCount+1);
          if(wordCount!=0 && wordCount%9==0){
              dispatch(shuffleWords());
              setWordCount(0);
          }
          dispatch(setSpaceCount(wordCount+1))
          setText("");
        }
      };
    
    const handleChange =(e)=>{
        setText(e.target.value);
        dispatch(setCurrentword(e.target.value));
    }
    
    useEffect(() => {
      console.log(correct);
    }, [correct])
    

    useEffect(() => {
        setCount(count+1)
    }, [text])
    

    return(
        <div>
            <input className="input me-2" type="text" value={text} disabled={(seconds==0)?true:false} onChange={(e)=>{handleChange(e)}}
            onKeyDown={handleSpace}></input>
            <span className="timer me-2">{seconds}</span>
            <button className="btn btn-primary"><FontAwesomeIcon icon={faRefresh} ></FontAwesomeIcon></button>

            {
                seconds==0 && <Result/>
            }
        </div>
    )
}

export default Form;