export default function Tile({number,image}){

    if(number%2 ===0){
       return <div className="black tile"><img src={image}></img></div>
    }else{
        return <div className="white tile"><img src={image}></img></div>
    }
}

