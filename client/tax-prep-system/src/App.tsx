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
import UserInfo from './Components/User/UserInfo.tsx';



function App() {
    return(
        <Provider store={store}>
            <Router>
                <div className='app-container'>
                    <TaxHeader/>
                    <div className='content'>
                    <main id="main-content" >
                        <div className='bg-base-lightest' >

                            <Routes>
                                <Route path='/' element={<Home/>}></Route>
                                <Route path='/home' element={<Home/>}></Route>
                                <Route path='/calculate' element={<W2Page/>}></Route>
                                <Route path='/results' element={<Results/>}></Route>
                                <Route path='/userInfo' element={<UserInfo/>}></Route>
                                <Route path='/login' element={<UserLogInForm/>}></Route>
                                <Route path='/register' element={<UserRegisterForm/>}></Route>
                            </Routes>

                        </div>
                    
                    </main>
                    </div>
                    <TaxFooter/>
                </div>
            </Router>
        </Provider>
    )


}

export default App
