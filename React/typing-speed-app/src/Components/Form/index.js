import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRefresh} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { useSelector } from "react-redux";

function Form(){

    const [text,setText]=useState("");
    const [count,setCount]=useState(0);
    const [seconds,setSeconds] = useState(60);
    const [spaceCount,setSpaceCount]=useState(0);
    const [correct,setCorrect]=useState(0);

    const data = useSelector((state)=>state.words);
  
    if (count>1) {
        if(seconds>0){
            setTimeout(() => {
                setSeconds(seconds-1)
            }, 1000);
        }
    }

    const handleSpace= (e) => {
        if (e.keyCode === 32) {
          if(text.trim() == data.data[spaceCount].targetWord){
              setCorrect(correct+1);
          }
          setSpaceCount(spaceCount+1);

          setText("");

        }
      };
    
    const handleChange =(e)=>{
        setText(e.target.value);
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
        </div>
    )
}

export default Form;