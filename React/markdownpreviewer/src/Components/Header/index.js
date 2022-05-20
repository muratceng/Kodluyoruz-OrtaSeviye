import { toggle } from "../../redux/TextSlice/TextSlice"
import { useDispatch } from "react-redux";

function Header(){

    const dispatch = useDispatch();

    
    return(
        <div>
        <div>
            <div className="questionmark row justify-content-end">
            <span onClick={()=>handleClick()} >?</span>
            </div>
            </div>
            <span><h1>Markdown Previewer</h1></span>
        </div>
    )

    function handleClick(){
        dispatch(toggle())
    }
}

export default Header;