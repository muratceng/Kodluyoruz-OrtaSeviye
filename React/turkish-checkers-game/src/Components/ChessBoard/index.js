const vertical =["1","2","3","4","5","6","7","8"];
const horizantal =["a","b","c","d","e","f","g","h"];


function ChessBoard(){
    let board =[]

    for(let i=vertical.length-1;i>=0;i--){
        for(let j=0;j<horizantal.length;j++){
            let total=i+j+2;
            if(total%2===0){
                board.push(
                    <div className="black tile" key={j+i}></div>
                )
            }else{
                board.push(
                    <div className="white tile" key={j+i}></div>
                )
            }
           
                
            
            
        }
    }
    return(
        <div className="board">
            {board}
        </div>
    )
}

export default ChessBoard;