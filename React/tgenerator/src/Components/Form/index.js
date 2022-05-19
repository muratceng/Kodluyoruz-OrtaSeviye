import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchText } from "../../redux/TextSlice/textSlice";

function Form() {

    const [count,setCount] = useState("1");
    const [isHtml,setIsHtml] = useState(false);
    const dispatch = useDispatch();
    const didMountRef = useRef(false);

    useEffect(() => {
        if(didMountRef.current){
            if(isHtml==true){
                dispatch(fetchText(count,"html"))
            }else{
                dispatch(fetchText(count,"text"))
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
                  <option value={true}> Yes</option>
                  <option value={false}> No</option>
              </select>
          </div>
      </div>
    </div>
  );
}

export default Form;
