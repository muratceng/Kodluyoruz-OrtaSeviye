import { useEffect, useState } from "react";

function Form(){

    const [text,setText]=useState("");
    const [count,setCount]=useState(0);
    const xd = "asdas"

    useEffect(() => {
        setCount(count+1)
        console.log(count)
    }, [text])
    

    return(
        <div>
            <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
        </div>
    )
}

export default Form;