import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/covidSlice/covidSlice";

function Cards() {
  const covid = useSelector((state) => state.covid);
  const data = covid.data;

  useEffect(() => {
    console.log(data.lastUpdate);

  }, []);

  if (data.loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {data.confirmed && (
        <div className="row d-flex justify-content-center">
          <div className="confirmed col-lg-3 me-5">
            <div>Confirmed :</div>
            <div> {data.confirmed.value.toLocaleString()}</div>
            <div>Last Updated at:</div>
            <div>{Format(data.lastUpdate)}</div>
            <div>Number of infect cases of COVID-19</div>
          </div>
          <div className="recovered col-lg-3 me-5">
            <div>Recovered :</div>
            <div> {data.recovered.value.toLocaleString()}</div>
            <div>Last Updated at:</div>
            <div>{Format(data.lastUpdate)}</div>
            <div>Number of recoveries from COVID-19</div>
          </div>
          <div className="deaths col-lg-3 me-5">
            <div>Deaths :</div>
            <div> {data.deaths.value.toLocaleString()}</div>
            <div>Last Updated at:</div>
            <div>{Format(data.lastUpdate)}</div>
            <div>Number of deaths caused by COVID-19</div>
          </div>
        </div>
      )}
    </div>
  );

  function Format(str){
    return  new Intl.DateTimeFormat("en-GB",{
        year:"numeric",
        month:"short",
        day:"2-digit",
        hour:"2-digit",
        minute:"2-digit"
    }).format(new Date( str))
  }
}

export default Cards;
