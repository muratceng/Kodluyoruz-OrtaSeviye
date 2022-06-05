import { useSelector } from "react-redux";
import Tile from "../Tile";

const vertical =["1","2","3","4","5","6","7","8"];
const horizantal =["a","b","c","d","e","f","g","h"];


function ChessBoard(){
    let board =[]

    const data = useSelector((state)=>state.game);

    for(let i=vertical.length-1;i>=0;i--){
        for(let j=0;j<horizantal.length;j++){
            let total=i+j+2;
            let image=undefined;
            data.pieces.forEach(element => {
                if(element.x===i && element.y===j){
                    image=element.image;
                }
            });
            board.push(<Tile key={`${j},${i}`} number={total} image={image}/>)
        }
    }
    return(
        <div className="board">
            {board}
        </div>
    )
}

export default ChessBoard;