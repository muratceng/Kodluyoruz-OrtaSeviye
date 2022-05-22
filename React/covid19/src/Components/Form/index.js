import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCountry, fetchData} from "../../redux/covidSlice/covidSlice"

function Form(){
    const data = useSelector((state)=>state.covid);
    const dispatch = useDispatch();
    const [country,setCountry] = useState('')

    useEffect(() => {
     dispatch(fetchCountry())
     console.log("1")
    }, [])
    
    useEffect(() => {
        dispatch(fetchData(country))
    }, [country])
    
    

    return(
        <div className="mt-5 mb-2">
            {data.countryLoading && <div> loading ...</div>

            }

            {data.countries.countries &&
             <select value={country} onChange={(e)=>setCountry(e.target.value)} name="country">
             <option key={''} value={''}>Global</option>
             {data.countries.countries.map((country,i)=>{
                 return <option key={i} value={country.iso2}>{country.name}</option>
             })

             }
            </select>
            }
        </div>
    )
}

export default Form;