import { Provider } from 'react-redux';
import W2Page from './Components/W2/W2Page.tsx'
import '@trussworks/react-uswds/lib/index.css';
import store  from './store.tsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaxHeader from './Components/Header/TaxHeader.tsx';
import TaxFooter from './Components/Footer/TaxFooter.tsx';
import Home from './Components/Home/Home.tsx';
import Results from './Components/Results/Results.tsx';
import UserLogInForm from './Components/User/UserLogInForm.tsx';
import UserRegisterForm from './Components/User/UserRegisterForm.tsx';



function App() {
    return(
        <Provider store={store}>
            <Router>
                <div className='container'>
                    <TaxHeader/>
                    <Routes>
                        <Route path='/' element={<UserLogInForm/>}></Route>
                        <Route path='/home' element={<Home/>}></Route>
                        <Route path='/calculate' element={<W2Page/>}></Route>
                        <Route path='/results' element={<Results/>}></Route>
                    </Routes>
                    <TaxFooter/>
                </div>
            </Router>
        </Provider>
    )


  // return (
  //   <>
  //     <Provider store={store}>
  //       <W2Page />
  //     </Provider>
  //   </>
  // )
}

export default App
