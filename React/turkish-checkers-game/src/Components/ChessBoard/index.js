import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Tile from "../Tile";

const vertical =["1","2","3","4","5","6","7","8"];
const horizantal =["a","b","c","d","e","f","g","h"];


function ChessBoard(){
    let board =[]

    const data = useSelector((state)=>state.game);
    const ChessBoardRef = useRef(null);
    const [activePiece,setActivePiece] = useState(null);
    const [gridX,setGridX]=useState(0);
    const [gridY,setGridY]=useState(0);
    const [pieces,setPieces]=useState(data.pieces)

    function grabPiece (e){
        const element = e.target
        const chessBoard = ChessBoardRef.current
        if(element.classList.contains("piece") && chessBoard){
            setGridY(Math.floor((e.clientX-chessBoard.offsetLeft)/80));
            setGridX(Math.abs(Math.ceil((e.clientY-chessBoard.offsetTop - 640)/80)));

            const x = e.clientX-40;
            const y = e.clientY-40;
            element.style.position="absolute"
            element.style.left=`${x}px`
            element.style.top=`${y}px`
            setActivePiece(element)
        }
    }

    function movePiece(e){
        const chessBoard = ChessBoardRef.current;
        if(chessBoard && activePiece && activePiece.classList.contains("piece")){
            const minX = chessBoard.offsetLeft -10;
            const minY = chessBoard.offsetTop -10;
            const maxX = minX+chessBoard.clientWidth -60;
            const maxY = minY+chessBoard.clientHeight - 60;
            const x = e.clientX-40;
            const y = e.clientY-40;
            activePiece.style.position="absolute"

            if(x<minX){
                activePiece.style.left=`${minX}px`;
            }else if(x>maxX){
                activePiece.style.left=`${maxX}px`;
            }else{
                activePiece.style.left=`${x}px`;
            }

            if(y<minY){
                activePiece.style.top=`${minY}px`;
            }else if(y>maxY){
                activePiece.style.top=`${maxY}px`;
            }else{
                activePiece.style.top=`${y}px`;
            }
        }
    }

    function dropPiece(e){
        const chessBoard = ChessBoardRef.current;
        if(activePiece && chessBoard){
            const newY=Math.floor((e.clientX-chessBoard.offsetLeft)/80);
            const newX = Math.abs(Math.ceil((e.clientY-chessBoard.offsetTop - 640)/80));

            let changedPieces =[...pieces];
            const index = changedPieces.findIndex((p)=>p.x===gridX && p.y===gridY);
            changedPieces[index]={...changedPieces[index],x:newX,y:newY};
            setPieces(changedPieces);

            setActivePiece(null);
        }
    }



    for(let i=vertical.length-1;i>=0;i--){
        for(let j=0;j<horizantal.length;j++){
            let total=i+j+2;
            let image=undefined;
            pieces.forEach(element => {
                if(element.x===i && element.y===j){
                    image=element.image;
                }
            });
            board.push(<Tile key={`${j},${i}`} number={total} image={image}/>)
        }
    }
    return(
        <
        div className="board" 
        onMouseDown={(e)=>grabPiece(e)}
        onMouseMove={(e)=>movePiece(e)}
        onMouseUp={(e)=>dropPiece(e)}
        ref={ChessBoardRef}
        >
            {board}
        </div>
    )
}

export default ChessBoard;