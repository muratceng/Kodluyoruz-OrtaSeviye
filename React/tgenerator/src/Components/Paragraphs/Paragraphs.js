import { useSelector } from "react-redux"

function Paragraphs(){
    const data = useSelector((state) => state.text)
    
    
    if(data.isloading){
        return <div>Loading...</div>
    }

    return(
        <div>
            <div className="paragraphs">
                {data.content}
            </div>
        </div>
    )
}

export default Paragraphs;