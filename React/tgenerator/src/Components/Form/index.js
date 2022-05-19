import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchText } from "../../redux/TextSlice/textSlice";

function Form() {

    const [count,setCount] = useState("1");
    const [isHtml,setIsHtml] = useState("text");
    const dispatch = useDispatch();
    const didMountRef = useRef(false);
    let type={c:count,f:isHtml}

    useEffect(() => {
        if(didMountRef.current){
            if(isHtml===true){
                dispatch(fetchText(type))
            }else{
                dispatch(fetchText(type))
            }
        }else{
            didMountRef.current=true;
        }
    }, [count,isHtml])
    
    
  return (
    <div className="row justify-content-md-start">
      <div className="col col-lg-2">
        <div>
          <label htmlFor="count">Paragraphs</label>
          </div>
          <div>
            <input value={count} onChange={(e)=> setCount(e.target.value)} min={1} className="count" name="count" type="number"></input>
          </div>
      </div>
      <div className="col col-lg-2">
          <div>
              <label htmlFor="isHtml"> isHtml </label>
          </div>
          <div>
              <select value={isHtml} onChange={(e)=>setIsHtml(e.target.value)}>
                  <option value={"html"}> Yes</option>
                  <option value={"text"}> No</option>
              </select>
          </div>
      </div>
    </div>
  );
}

export default Form;
