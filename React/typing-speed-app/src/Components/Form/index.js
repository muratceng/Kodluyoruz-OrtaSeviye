import { useEffect, useState } from "react";

function Form(){

    const [text,setText]=useState("");
    const [count,setCount]=useState(0);
    const xd = "asdas"
    const fareload = 

    useEffect(() => {
        setCount(count+1)
        console.log(count)
    }, [text])
    

    return(
        <div>
            <input className="input" type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
            <button className="btn btn-primary"></button>
        </div>
    )
}

export default Form;