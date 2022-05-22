import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { useSelector } from "react-redux";

function BarChart(){
Chart.register(...registerables);
    const data = useSelector((state)=> state.covid);
    return(
        <div>
          {data.data.confirmed &&
           <Bar
          data={{
            labels:['Covid 19 cases'],
            datasets:[
              {
                label:['Confirmed'],
                data:[data.data.confirmed.value],
                backgroundColor:['#66B3FF80'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
              },
              {
                label:['Recovered'],
                data:[data.data.recovered.value],
                backgroundColor:['#Bff2ca80'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
              },
              {
                label:['Deaths'],
                data:[data.data.deaths.value],
                backgroundColor:['#edb2b280'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
              }
            ]
          }}
          options={{
            title:{
              display:true,
              text:'Covid 19 cases',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      }
        </div>
    )
}

export default BarChart;