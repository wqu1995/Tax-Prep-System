import { Provider } from 'react-redux';
import '@trussworks/react-uswds/lib/index.css';
import store  from './store.tsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaxHeader from './Components/Header/TaxHeader.tsx';
import TaxFooter from './Components/Footer/TaxFooter.tsx';
import Home from './Components/Home/Home.tsx';
import UserLogInForm from './Components/User/UserLogInForm.tsx';
import UserRegisterForm from './Components/User/UserRegisterForm.tsx';
import UserInfo from './Components/User/UserInfo.tsx';
import ResultsPage from './Components/Results/ResultsPage.tsx';
import W2AndTen99Page from './Components/W2/W2AndTen99Page.tsx';



function App() {
    return(
        <Provider store={store}>
            <Router>
                <div className='container'>
                    <TaxHeader/>
                    <Routes>
                        <Route path='/' element={<UserLogInForm/>}></Route>
                        <Route path='/home' element={<Home/>}></Route>
                        <Route path='/calculate' element={<W2AndTen99Page/>}></Route>
                        <Route path='/results' element={<ResultsPage/>}></Route>
                        <Route path='/userInfo' element={<UserInfo/>}></Route>
                    </Routes>
                    <TaxFooter/>
                </div>
            </Router>
        </Provider>
    )


}

export default App
