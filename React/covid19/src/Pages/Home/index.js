import Cards from "../../Components/Cards";
import BarChart from "../../Components/BarChart";
import Form from "../../Components/Form";
import Header from "../../Components/Header";

function Home(){
    return(
        <div className="container">
            <Header/>
            <Cards/>
            <Form/>
            <BarChart/>
        </div>
    )
}

export default Home;