import './App.css';


function App() {
  return (
   <div className='container'>
     <div>
       <h1 className='title'>React Sample Text Generator</h1>
     </div>
     <div className='row'>
       <div className='col-2'>
         <div>
           <label> count</label>
         </div>
         <div>
           <input type="number" className="formControl"></input>
         </div>
       </div>
      <div className='col-2'>
        <div> include Html</div>
        <select>
          <option value="No">No</option>
          <option value="Yes"> Yes</option>
        </select>
      </div>
     </div>

   </div>
  );
}

export default App;
