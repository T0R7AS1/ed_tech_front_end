import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './guest/Login';
import Register from './guest/Register';
import i18n from './i18n';
import AuthIndex from './auth/index.jsx';
import { 
    useEffect,
    useState,
    createContext,
} from "react";
import useUser from "./hooks/useUser";
import Loader from './components/Loader';
export const RegisterMessage = createContext('');

function App() {
    const [message, setMessage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const {userInfo, userError} = useUser();
    useEffect(() => {
        if (!userInfo || !userError) {
            setTimeout(() => {
                setIsLoaded(true);
            }, 1500);
        }
    }, [userInfo, userError, isLoaded]);

    useEffect(() => {
        i18n.changeLanguage('enUS');
    }, []);

    return (
        <RegisterMessage.Provider value={{ message, setMessage }}>
            <Router>
                <Routes>
                    <Route path="/*" element={(
                        isLoaded
                            ? userInfo
                                ? <AuthIndex/>
                                : <Login setIsLoaded={setIsLoaded}/>
                            : <Loader/>
                    )}/>
                    <Route path="/register" exact element={
                        <Register/>
                    }/>
                </Routes>
            </Router>
        </RegisterMessage.Provider>
    );
}

export default App;
