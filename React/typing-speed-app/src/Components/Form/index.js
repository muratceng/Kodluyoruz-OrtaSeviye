import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faL, faRefresh} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffleWords,setSpaceCount, setCurrentword, setTrueWords, setWrongWords, restart } from "../../redux/wordsSlice/wordsSlice";
import Result from "../Result";


function Form(){

    const [text,setText]=useState("");
    const [count,setCount]=useState(0);
    const [seconds,setSeconds] = useState(60);
    const [wordCount,setWordCount]=useState(0);
    const [correct,setCorrect]=useState(0);
    const [wrong,setWrong]=useState(0);
    const [isActive, setIsActive] = useState(false);

    const data = useSelector((state)=>state.words);
    const dispatch = useDispatch();
        
    function reset() {
    setSeconds(60);
    setIsActive(false);
    }

   

    useEffect(() => {
    let interval = null;
    if(seconds===0){
        setIsActive(false);
    }
    if (isActive) {
        interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        }, 1000);
    } else if (!isActive && seconds === 0) {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
    }, [isActive, seconds]);

    const handleSpace= (e) => {
        if (e.keyCode === 32) {
          if(text.trim().toLowerCase() == data.data[wordCount].targetWord.toLowerCase()){
              setCorrect(correct+1);
              dispatch(setTrueWords(text.trim().toLowerCase()));
          }else{
              setWrong(wrong+1);
              dispatch(setWrongWords(text.trim().toLowerCase()));
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
        setCount(count+1)
        if(count>0){
            setIsActive(true);
        }
    }
    
    function newGame(){
        dispatch(restart());
        dispatch(shuffleWords());
        setWordCount(0);
        setCount(0);
        reset();
        setSeconds(60);
        setText("");
       
    }

    return(
        <div>
            <input className="input me-2" type="text" value={text} disabled={(seconds==0)?true:false} onChange={(e)=>{handleChange(e)}}
            onKeyDown={handleSpace}></input>
            <span className="timer me-2">{seconds}</span>
            <button className="btn btn-primary" onClick={()=>newGame()}><FontAwesomeIcon icon={faRefresh} ></FontAwesomeIcon></button>

            {
                seconds==0 && <Result/>
            }
        </div>
    )
}

export default Form;