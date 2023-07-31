import { Provider } from 'react-redux';
import W2Form from './Components/W2/W2Form.tsx';
import W2Page from './Components/W2/W2Page.tsx'
import '@trussworks/react-uswds/lib/index.css';
import store  from './store.tsx';


function App() {


  return (
    <>
      <Provider store={store}>
        <W2Page />
      </Provider>
    </>
  )
}

export default App
