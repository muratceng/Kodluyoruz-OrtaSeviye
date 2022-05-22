import Cards from "../../Components/Cards";
import Chart from "../../Components/Chart";
import Form from "../../Components/Form";
import Header from "../../Components/Header";

function Home(){
    return(
        <div className="container">
            <Header/>
            <Cards/>
            <Form/>
            <Chart/>
        </div>
    )
}

export default Home;