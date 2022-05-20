import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeText } from "../../redux/TextSlice/TextSlice";

function Form(){
    const text = useSelector((state)=>state.text)
    const [input,setInput]=useState(text.content)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeText(input))
    }, [input]);


    if (text.toggle) {
        return(
            <div>
                <textarea value={text.texthelp} className="txtarea"></textarea>
            </div>
        )
    }

    return(
        <div>
            <textarea value={input} className="txtarea" onChange={(e)=>setInput(e.target.value)}></textarea>
        </div>
    )
    
        
    
    
   
}

export default Form;