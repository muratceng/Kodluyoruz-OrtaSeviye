import { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { shuffleWords } from "../../redux/wordsSlice/wordsSlice";

function Text(){

    const data = useSelector((state)=>state.words);
    const dispatch = useDispatch();
   

  useEffect(() => {
    dispatch(shuffleWords());
    console.log("text",data.data);
  }, [])

    let tenwords = data.data.slice(0,10);


    return(
        <div>
            {
                tenwords.map((item,i)=>{
                    return <span key={i}>{item.targetWord} </span>
                })
            }
        </div>
    )
}

export default Text;