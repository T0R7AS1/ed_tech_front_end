import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './guest/Login';
import Register from './guest/Register';
import i18n from './i18n';
import { 
    useEffect,
    useState,
    createContext,
} from "react";

export const RegisterMessage = createContext('');

function App() {
    const [message, setMessage] = useState('');
    useEffect(() => {
        i18n.changeLanguage('enUS');
    }, []);
  return (
    <RegisterMessage.Provider value={{ message, setMessage }}>
        <Router>
            <Routes>
                <Route path="/" element={
                    (<> index </>)
                }/>
                <Route path="/login" element={
                    <Login/>
                }/>
                <Route path="/register" element={
                    <Register/>
                }/>
                <Route path="/products/:action" element={
                    (<> products </>)
                }/>
            </Routes>
        </Router> // NOTE Creating all needed routes for the app 
    </RegisterMessage.Provider>
  );
}

export default App;
