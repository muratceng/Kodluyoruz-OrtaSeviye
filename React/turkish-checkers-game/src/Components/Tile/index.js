export default function Tile({number,image}){

    if(number%2 ===0){
       return <div className={"black tile"} >
           {image && <div className="piece" style={{backgroundImage:`url(${image})`}}></div>}
       </div>
    }else{
        return <div className={"white tile"} >
        {image && <div className="piece" style={{backgroundImage:`url(${image})`}}></div>}
        </div>
    }
}

