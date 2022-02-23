import callAPI from "callAPI";
import { useEffect } from "react";
import {Header} from './components'
function App() {
  useEffect(() => {
    callAPI.get('/')
    .then(res => {
      
    })
  },[])
  return (
    <div className="App">
      <Header/>

    </div>
  );
}

export default App;
