import { toggle } from "../../redux/TextSlice/TextSlice"
import { useDispatch } from "react-redux";

function Header(){

    const dispatch = useDispatch();

    
    return(
        <div>
        <div>
            <div className="questionmark" onClick={()=>handleClick()}>
            <span style={{  textAlign: 'center'}}  >?</span>
            </div>
            </div>
        <div>
            <br/><br/>
            <h1>Markdown Previewer</h1>
            </div>
        </div>
    )

    function handleClick(){
        dispatch(toggle())
    }
}

export default Header;