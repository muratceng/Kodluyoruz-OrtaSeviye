import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux';

function Preview(){

    const data = useSelector((state)=>state.text);

    if(data.toggle){
        return(
            <div className='preview'>
            <ReactMarkdown>{data.texthelp}</ReactMarkdown>
            </div>
        )
    }

    return(
        <div className='preview'>
            <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
    )
}

export default Preview;