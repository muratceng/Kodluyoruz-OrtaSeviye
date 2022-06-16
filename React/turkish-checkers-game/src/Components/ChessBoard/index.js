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
    const [winner,setWinner]=useState(undefined);
    const dispatch = useDispatch();

    function xor(xAxis,yAxis){
        return ((Math.abs(xAxis-gridX)>0 && Math.abs(yAxis-gridY)===0) || (Math.abs(xAxis-gridX)===0 && Math.abs(yAxis-gridY)>0))
    }

    useEffect(() => {
        console.log(whiteNeedTake);
    }, [whiteNeedTake])
    

    useEffect(() => {
        if(king !== undefined){
            let changedPieces =[...pieces];
            const index = changedPieces.findIndex((p)=>p.x===king.x && p.y===king.y);
            changedPieces[index]={...changedPieces[index],type:king.type,image:king.image};
            setPieces(changedPieces);
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

    function kingDeletePiece(piece,xAxis,yAxis){
        let x = xAxis-piece.x;
        let y = yAxis-piece.y;
        let items =[];
        console.log(x,y)

        if(x!==0){
            items = pieces.filter((p)=>
                p.y===piece.y && piece.color !== p.color
            )
            items.map((p)=>{
                deletePiece(p.x,p.y);
            })
        }
        if(y!==0){
            items = pieces.filter((p)=>
                p.x===piece.x && piece.color !== p.color
            )
            items.map((p)=>{
                deletePiece(p.x,p.y);
            })
        }

        console.log(items);

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
            setWinner("black");
        }
        let arr=[]
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
            setWinner("white");
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
        let index = pieces.findIndex((p)=>p.x===xAxis && p.y ===yAxis);
        let top = pieces.findIndex((p)=>p.x===xAxis+1 && p.y===yAxis);
        let left = pieces.findIndex((p)=>p.x===xAxis && p.y===yAxis-1);
        let right = pieces.findIndex((p)=>p.x===xAxis && p.y===yAxis+1);
        let bottom = pieces.findIndex((p)=>p.x===xAxis-1 && p.y===yAxis);

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
            top = pieces.filter((p)=>p.y===yAxis && p.color!=='white')
            left = pieces.filter((p)=>p.x===xAxis && p.color!=="white");
            let res = false;

            if(top){
                top.map((p)=>{
                    if(p.x-pieces[index].x>0){
                        if(isEmpty(p.x+1,p.y) && (isEmpty(p.x-1,p.y) || p.x-1===pieces[index].x)){
                            res = true;
                        }
                    }else{
                        if(isEmpty(p.x-1,p.y) && (isEmpty(p.x+1,p.y) || p.x+1===pieces[index].x)){
                            res = true;
                        }
                    }
                })
            }if(left){
                left.map((p)=>{
                    if(p.y-pieces[index].y>0){
                        if(isEmpty(p.x,p.y+1) && (isEmpty(p.x,p.y-1) || p.y-1===pieces[index].y)){
                            res = true;
                        }
                    }else{
                        if(isEmpty(p.x,p.y-1) && (isEmpty(p.x,p.y+1) || p.y+1===pieces[index].y)){
                            res = true;
                        }
                    }
                })
            }
            return res;
        }else if(pieces[index] && pieces[index].color==='black' && pieces[index].type==='king'){
            top = pieces.filter((p)=>p.y===yAxis && p.color!=='black')
            left = pieces.filter((p)=>p.x===xAxis && p.color!=="black");
            let res = false;

            if(top){
                top.map((p)=>{
                    if(p.x-pieces[index].x>0){
                        if(isEmpty(p.x+1,p.y) && (isEmpty(p.x-1,p.y) || p.x-1===pieces[index].x)){
                            res = true;
                        }
                    }else{
                        if(isEmpty(p.x-1,p.y) && (isEmpty(p.x+1,p.y) || p.x+1===pieces[index].x)){
                            res = true;
                        }
                    }
                })
            }if(left){
                left.map((p)=>{
                    if(p.y-pieces[index].y>0){
                        if(isEmpty(p.x,p.y+1) && (isEmpty(p.x,p.y-1) || p.y-1===pieces[index].y)){
                            res = true;
                        }
                    }else{
                        if(isEmpty(p.x,p.y-1) && (isEmpty(p.x,p.y+1) || p.y+1===pieces[index].y)){
                            res = true;
                        }
                    }
                })
            }
            return res;
        }else{
            return false;
        }
    }

    function findPiece(xAxis,yAxis){
        let tmp = pieces.findIndex((p)=> p.x===xAxis && p.y ===yAxis);
        return pieces[tmp] ? pieces[tmp] : undefined;
    }

    function isEmpty(x,y){
        if( pieces.findIndex((p)=>p.x===x && p.y===y)===-1 && x<8 && y<8 && x>=0 && y>=0){
            return true
        }else{
            return false;
        }

    }

    function maxKingxAxis(piece){
        const xItems= pieces.filter((p)=> p.y===piece.y && p.x >piece.x);
        let max = 8;
        xItems.map((p)=>{
            if(piece.color === p.color && p.x<max){
                max=p.x
            }else if(piece.color !== p.color && p.x<max && isEmpty(p.x+1,p.y) === false){
                max=p.x
            }
        })
        return max
    }

    function minKingxAxis(piece){
        const xItems= pieces.filter((p)=> p.y===piece.y && p.x <piece.x);
        let min = -1;
        xItems.map((p)=>{

            if(piece.color === p.color && p.x>min){
                min=p.x
            }else if(piece.color !== p.color && p.x>min && isEmpty(p.x-1,p.y) === false){
                min=p.x
            }
        })
        return min
    }

    function maxKingyAxis(piece){
        const xItems= pieces.filter((p)=> p.y>piece.y && p.x === piece.x);
        let max = 8;
        xItems.map((p)=>{
            if(piece.color === p.color && p.y<max){
                max=p.y
            }else if(piece.color !== p.color && p.y<max && isEmpty(p.x,p.y+1) === false){
                max=p.y
            }
        })
        return max
    }

    function minKingyAxis(piece){
        const xItems= pieces.filter((p)=> p.y<piece.y && p.x ===piece.x);
        let min = -1;
        xItems.map((p)=>{
            if(piece.color === p.color && p.y>min){
                min=p.y
            }else if(piece.color !== p.color && p.y>min && isEmpty(p.x,p.y-1) === false){
                min=p.y
            }
        })
        return min
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
        }else if(turn==='white' && pieces[index].type === "king" &&isEmpty(newX,newY) && pieces[index].color==='white' && whiteNeedTake.length===0){
            if(isEmpty(newX,newY) && xor(newX,newY) && newX<maxKingxAxis(pieces[index]) && newX>minKingxAxis(pieces[index]) && newY>minKingyAxis(pieces[index]) && newY<maxKingyAxis(pieces[index])){
                return true;
            }
        }//beyaz damanın taş yemesi zorunluysa
        else if(turn==='white' && pieces[index].type === "king" && isEmpty(newX,newY) && whiteNeedTake.length>0 && pieces[index].color==='white' && whiteNeedTake.length>0 && whiteNeedTake.includes(pieces[index]) && newX<maxKingxAxis(pieces[index]) && newX>minKingxAxis(pieces[index]) && newY>minKingyAxis(pieces[index]) && newY<maxKingyAxis(pieces[index])){
            kingDeletePiece(pieces[index],newX,newY);
            return true;
        }
        //siyah damaysa
        else if(turn==='black' && pieces[index].type === 'king' && isEmpty(newX,newY) && blackNeedTake.length===0 &&pieces[index].color==='black' && newX<maxKingxAxis(pieces[index]) && newX>minKingxAxis(pieces[index]) && newY>minKingyAxis(pieces[index]) && newY<maxKingyAxis(pieces[index])){
            if(isEmpty(newX,newY) && xor(newX,newY)){
                return true;
            }
        }// siyah damanın taş yemesi zorunluysa
        else if(turn==='black' && pieces[index].type === 'king' && isEmpty(newX,newY) &&blackNeedTake.length>0 && pieces[index].color==='black' && blackNeedTake.length>0 && blackNeedTake.includes(pieces[index]) && newX<maxKingxAxis(pieces[index]) && newX>minKingxAxis(pieces[index]) && newY>minKingyAxis(pieces[index]) && newY<maxKingyAxis(pieces[index])){
            kingDeletePiece(pieces[index],newX,newY);
            return true;
        }
        else{
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

    function restart(){
    setActivePiece(null);
    setGridX(0);
    setGridY(0);
    setPieces(data.pieces);
    setTurn('white');
    setWhiteNeedTake([]);
    setBlackNeedTake([]);
    setDeletedPiece(undefined);
    setMorecheck(false);
    setKing(undefined);
    setWinner(undefined);
    }
    
    renderingPieces();

   


    return(
        <div>
        <
        div className="board" 
        onMouseDown={(e)=>grabPiece(e)}
        onMouseMove={(e)=>movePiece(e)}
        onMouseUp={(e)=>dropPiece(e)}
        ref={ChessBoardRef}
        >
            {board}
        </div>
        { winner &&
            <div className="alert alert-success" onClick={()=>restart()} role="alert">
            {winner} is won click for play again
            </div>
        }
        <div>
            <button className="btn btn-primary" onClick={()=>restart()}>Restart</button>
        </div>
    </div>
    )
}

export default ChessBoard;