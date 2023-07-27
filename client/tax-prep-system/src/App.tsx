import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css'
import TaxHeader from "./Components/Header/TaxHeader";

function App() {
    return(
        <Router>
            <div className="container">
                <TaxHeader/>
                
                <Routes>
                    {/* <Route path='/' element={<Welcome/>}/> */}
                </Routes>

            </div>
        </Router>
    )
}

export default App
