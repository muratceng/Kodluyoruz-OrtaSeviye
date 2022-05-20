import Form from "../../Components/Form"
import Header from "../../Components/Header"
import Preview from "../../Components/Preview"

function Home(){
    return(
        <div className="container">
            <Header/>
            <div className="row">
                <div className="col-6">
                    <Form/>
                </div>
                <div className="col-6">
                    <Preview/>
                </div>
                

            </div>

        </div>
    )
}

export default Home