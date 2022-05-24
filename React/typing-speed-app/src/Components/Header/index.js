import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/wordsSlice/wordsSlice";

function Header(){

    const dispatch = useDispatch();
    const data = useSelector((state)=> state.words);

    useEffect(() => {
      dispatch(fetchData('turkish'));
      console.log(data);
    }, [dispatch])
    
    return(
        <div>header works</div>
    )
}

export default Header;