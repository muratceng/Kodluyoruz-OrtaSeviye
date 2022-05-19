import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux"
import { fetchText} from "../../redux/TextSlice/textSlice"

function Paragraphs(){
    const data = useSelector((state) => state.text)
    
    
    if(data.isloading){
        return <div>Loading...</div>
    }

    return(
        <div>
            <div className="paragraphs">
                {data.content}
            </div>
        </div>
    )
}

export default Paragraphs;