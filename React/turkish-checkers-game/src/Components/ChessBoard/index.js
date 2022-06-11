import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const [pieces,setPieces]=useState(data.pieces);
    const [turn,setTurn]=useState('white');
    const [whiteNeedTake,setWhiteNeedTake]=useState([]);
    const [blackNeedTake,setBlackNeedTake]=useState([]);
    const dispatch = useDispatch();

    function changeTurn(){
        if(turn==='white'){
            setTurn('black');
        }else{
            setTurn('white');
        }
    }

    function whiteTakePieceCheck(){
        let tmp = pieces.filter((p)=>p.type === 'white piece');
        let arr=[]
        for(let item in tmp){
            if(isTakePiece(tmp[item].y,tmp[item].x)){
                arr.push(tmp[item]);
            }
        }
        setWhiteNeedTake(arr);
    }

    function blackTakePieceCheck(){
        let tmp = pieces.filter((p)=>p.type === 'black piece');
        let arr=[]
        for(let item in tmp){
            if(isTakePiece(tmp[item].y,tmp[item].x)){
                arr.push(tmp[item]);
            }
        }
        setBlackNeedTake(arr);
    }

    useEffect(() => {
        if(turn==='white'){
             whiteTakePieceCheck();
        }else{
            blackTakePieceCheck();
        }
      
    }, [turn])
    

    function isTakePiece(yAxis,xAxis){
        const index = pieces.findIndex((p)=>p.x===xAxis && p.y ===yAxis);
        const top = pieces.findIndex((p)=>p.x===xAxis+1 && p.y===yAxis);
        const left = pieces.findIndex((p)=>p.x===xAxis && p.y===yAxis-1);
        const right = pieces.findIndex((p)=>p.x===xAxis && p.y===yAxis+1);
        const bottom = pieces.findIndex((p)=>p.x===xAxis-1 && p.y===yAxis);

        if(pieces[index] && pieces[index].type === 'white piece'){
            if(pieces[top] && pieces[top].type!==pieces[index].type){
                if(isEmpty(xAxis+2,yAxis)){
                    return true
                }
            }if(pieces[left] && pieces[left].type!==pieces[index].type){
                if(isEmpty(xAxis,yAxis-2)){
                    return true
                }
            }if(pieces[right] && pieces[right].type !== pieces[index].type){
                if(isEmpty(xAxis,yAxis+2)){
                    return true
                }
            }
            return false;
            
        }else{
            if(pieces[bottom] && pieces[bottom].type!==pieces[index].type){
                if(isEmpty(xAxis-2,yAxis)){
                    return true
                }
            }if(pieces[left] && pieces[left].type!==pieces[index].type){
                if(isEmpty(xAxis,yAxis-2)){
                    return true
                }
            }if(pieces[right] && pieces[right].type !== pieces[index].type){
                if(isEmpty(xAxis,yAxis+2)){
                    return true
                }
            }
            return false;
        }
        
    }

    function isEmpty(x,y){
        if( pieces.findIndex((p)=>p.x===x && p.y===y)===-1 && x<8 && y<8){
            return true
        }else{
            return false;
        }

    }

    function isValidMove(newX,newY){
        const index = pieces.findIndex((p)=>p.x===gridX && p.y===gridY);
        if(turn==='white' && pieces[index].type==='white piece'){
            if( isEmpty(newX,newY) && Math.abs((newX-gridX))<2 && Math.abs((newY-gridY))<2 && (Math.abs(newX-gridX))+(Math.abs(newY-gridY)) < 2 && newX>=gridX  ){
                return true;
            }else{
                return false;
            }      
        }else if(turn==='black' &&pieces[index].type === "black piece" ){
            if( isEmpty(newX,newY) && Math.abs((newX-gridX))<2 && Math.abs((newY-gridY))<2 && (Math.abs(newX-gridX))+(Math.abs(newY-gridY)) < 2 && newX<=gridX ){
                return true;
            }else{
                return false;
            }      
        }else if(pieces[index].type === "black king"){
            return true;
        }else{
            return false;
        }
    }

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


            if(isValidMove(newX,newY)){
                let changedPieces =[...pieces];
                const index = changedPieces.findIndex((p)=>p.x===gridX && p.y===gridY);
                changedPieces[index]={...changedPieces[index],x:newX,y:newY};
                setPieces(changedPieces);
                changeTurn();

            }else{
                activePiece.style.position="relative";
                activePiece.style.removeProperty("top");
                activePiece.style.removeProperty("left");
            }
            
            setActivePiece(null);
        }
    }

    function renderingPieces(){
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
    }
    
    renderingPieces();

   
    

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