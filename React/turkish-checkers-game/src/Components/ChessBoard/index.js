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
    const [deletedPiece,setDeletedPiece]=useState(undefined);
    const [moreCheck,setMorecheck] = useState(false);
    const [king,setKing] = useState(undefined);
    const dispatch = useDispatch();

    function xor(xAxis,yAxis){
        return ((Math.abs(xAxis-gridX)>0 && Math.abs(yAxis-gridY)===0) || (Math.abs(xAxis-gridX)===0 && Math.abs(yAxis-gridY)>0))
    }

    useEffect(() => {
      console.log(whiteNeedTake)
    }, [whiteNeedTake])
    

    useEffect(() => {
        if(king !== undefined){
            let changedPieces =[...pieces];
            const index = changedPieces.findIndex((p)=>p.x===king.x && p.y===king.y);
            changedPieces[index]={...changedPieces[index],type:king.type,image:king.image};
            setPieces(changedPieces);
            console.log("xd",pieces);
            setKing(undefined);
        }
    }, [king])
     
    
    function changeTurn(){
        if(turn==='white'){
            setTurn('black');
        }else{
            setTurn('white');
        }
    }

    function deletePiece(xAxis,yAxis){  
        setDeletedPiece({x:xAxis,y:yAxis});
        let tmp = pieces.filter((p)=> p.x!==xAxis || p.y!==yAxis);
        setPieces(tmp);
    }

    useEffect(() => {
        if(deletedPiece !== undefined){
            let tmp = pieces.filter((p)=> p.x!==deletedPiece.x || p.y!==deletedPiece.y);
            setPieces(tmp);
            setDeletedPiece(undefined);
        }else{
            setMorecheck(true);
        }
    }, [deletedPiece])

    useEffect(()=>{
        whiteTakePieceCheck();
        blackTakePieceCheck();
    },[pieces])

    useEffect(() => {
        if(moreCheck===true){
            blackTakePieceCheck();
            whiteTakePieceCheck();
            setMorecheck(false);
             if(turn==='white' && blackNeedTake.length>0){
                changeTurn();
            }else if(turn==='black' && whiteNeedTake.length>0){
                changeTurn();   
            }
        }
    }, [moreCheck])
    


    function whiteTakePieceCheck(){
        let tmp = pieces.filter((p)=>p.color === 'white');
        if(tmp.length===0){
            endGame("black");
        }
        let arr=[]
        console.log(tmp);
        for(let item in tmp){
            if(isTakePiece(tmp[item].y,tmp[item].x)){
                arr.push(tmp[item]);
            }
        }
        setWhiteNeedTake(arr);
    }

    function blackTakePieceCheck(){
        let tmp = pieces.filter((p)=>p.color === 'black');
        if(tmp.length===0){
            endGame("white");
        }
        let arr=[]
        for(let item in tmp){
            if(isTakePiece(tmp[item].y,tmp[item].x)){
                arr.push(tmp[item]);
            }
        }
        setBlackNeedTake(arr);
    }

    useEffect(() => {
        console.log("turn",turn);
    }, [turn])
    

    function isTakePiece(yAxis,xAxis){
        const index = pieces.findIndex((p)=>p.x===xAxis && p.y ===yAxis);
        const top = pieces.findIndex((p)=>p.x===xAxis+1 && p.y===yAxis);
        const left = pieces.findIndex((p)=>p.x===xAxis && p.y===yAxis-1);
        const right = pieces.findIndex((p)=>p.x===xAxis && p.y===yAxis+1);
        const bottom = pieces.findIndex((p)=>p.x===xAxis-1 && p.y===yAxis);

        if(pieces[index] && pieces[index].color === 'white' && pieces[index].type==='piece'){
            if(pieces[top] && pieces[top].color!==pieces[index].color){
                if(isEmpty(xAxis+2,yAxis)){
                    return true
                }
            }if(pieces[left] && pieces[left].color!==pieces[index].color){
                if(isEmpty(xAxis,yAxis-2)){
                    return true
                }
            }if(pieces[right] && pieces[right].color !== pieces[index].color){
                if(isEmpty(xAxis,yAxis+2)){
                    return true
                }
            }
            return false;
            
        }else if(pieces[index] && pieces[index].color==='black' && pieces[index].type==='piece'){
            if(pieces[bottom] && pieces[bottom].color!==pieces[index].color){
                if(isEmpty(xAxis-2,yAxis)){
                    return true
                }
            }if(pieces[left] && pieces[left].color!==pieces[index].color){
                if(isEmpty(xAxis,yAxis-2)){
                    return true
                }
            }if(pieces[right] && pieces[right].color !== pieces[index].color){
                if(isEmpty(xAxis,yAxis+2)){
                    return true
                }
            }
            return false;
        }else if(pieces[index] && pieces[index].color==='white' && pieces[index].type==='king'){

        }else if(pieces[index] && pieces[index].color==='black' && pieces[index].type==='king'){

        }else{
            return false;
        }
    }

    function findPiece(xAxis,yAxis){
        let tmp = pieces.findIndex((p)=> p.x===xAxis && p.y ===yAxis);
        return pieces[tmp] ? pieces[tmp] : undefined;
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
        if(turn==='white' && pieces[index].color==='white' && pieces[index].type==='piece' && whiteNeedTake.length===0){
            if( isEmpty(newX,newY) && Math.abs((newX-gridX))<2 && Math.abs((newY-gridY))<2 && (Math.abs(newX-gridX))+(Math.abs(newY-gridY)) < 2 && newX>=gridX  ){
                return true;
            }else{
                return false;
            }      
        }
        //yenilmesi gereken siyah taş var ise durumu
        else if(turn==='white' && pieces[index].type==='piece' && pieces[index].color==='white' && whiteNeedTake.length>0 && whiteNeedTake.includes(pieces[index])){
            if( isEmpty(newX,newY) && Math.abs((newX-gridX))<3 && Math.abs((newY-gridY))<3 && xor(newX,newY) && newX>=gridX ){
                if(Math.abs(newX-gridX)===2 && findPiece(newX-1,newY) !== undefined){
                    deletePiece(newX-1,newY);
                    return true;
                }else if(Math.abs(newY-gridY)===2 && findPiece(newX,newY-1) !== undefined){
                    deletePiece(gridX,gridY+1);
                    return true
                }
                else if(Math.abs(newY-gridY)===2 && findPiece(newX,newY+1) !== undefined){
                    deletePiece(gridX,gridY-1);
                    return true
                }
                else{
                    return false;
                }
            }else{
                return false;
            }   
        }else if(turn==='black' &&pieces[index].color === "black" && pieces[index].type==='piece' && blackNeedTake.length===0 ){
            if( isEmpty(newX,newY) && Math.abs((newX-gridX))<2 && Math.abs((newY-gridY))<2 && (Math.abs(newX-gridX))+(Math.abs(newY-gridY)) < 2 && newX<=gridX ){
                return true;
            }else{
                return false;
            }      
        }
        // yenilmesi gereken beyaz taş var ise durumu
        else if(turn==='black' &&pieces[index].color === "black" && pieces[index].type==='piece' && blackNeedTake.length>0 && blackNeedTake.includes(pieces[index])){
            if( isEmpty(newX,newY) && Math.abs((newX-gridX))<3 && Math.abs((newY-gridY))<3 && xor(newX,newY) && newX<=gridX ){
                if(Math.abs(newX-gridX)===2 && findPiece(newX+1,newY) !== undefined){
                    deletePiece(newX+1,newY);
                    return true;
                }else if(Math.abs(newY-gridY)===2 && findPiece(newX,newY-1) !== undefined){
                    deletePiece(gridX,gridY+1);
                    return true
                }
                else if(Math.abs(newY-gridY)===2 && findPiece(newX,newY+1) !== undefined){
                    deletePiece(gridX,gridY-1);
                    return true
                }
                else{
                    return false;
                }
            }else{
                return false;
            }
            //beyaz damaysa      
        }else if(turn==='white' && pieces[index].type === "king" && pieces[index].color==='white'){
            return true;
            //siyah damaysa
        }else if(turn==='black' && pieces[index].type === 'king' && pieces[index].color==='black'){
            return true
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
                if(turn === 'white' && newX===7){
                    setKing(changedPieces[index]={...changedPieces[index],image:'assets/king.png', type:'king'});
                }
                if(turn === 'black' && newX===0){
                    setKing(changedPieces[index]={...changedPieces[index],image:'assets/blackKing.png', type:'king'});
                }
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

    function endGame(winner){
        console.log(`${winner} kazandı`);
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