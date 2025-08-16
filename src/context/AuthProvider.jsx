import React, { useState} from 'react';
import {auth} from "../firebase/config";
import { useNavigate } from 'react-router';
import Spiner from '../components/Spiner';


const AuthContext = React.createContext();

function AuthProvider({children}) {

    const [user, setUser] = React.useState({});
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();

    React.useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(user => {
            console.log(user);
            if(user) {
                const {displayname, uid, email, photoURL } = user;
                setUser({
                    displayname, 
                    uid, 
                    email, 
                    photoURL 
                });
                setLoading(false);
                navigate('/appchat', { replace: true });
            } else {
                setUser({});
                setLoading(false);
                navigate('/', { replace: true });
            }
        })
        //clean function
        return () => unsubcribe();
    }, [navigate]);

    // const login = async (email, password) => {
    //     try {
    //         await auth.signInWithEmailAndPassword(email, password);
    //         navigate('/chat');
    //     } catch (error) {
    //         console.error("Error logging in:", error);
    //     }
    // };

    // const logout = async () => {
    //     try {
    //         await auth.signOut();
    //         navigate('/');
    //     } catch (error) {
    //         console.error("Error logging out:", error);
    //     }
    // };

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <Spiner /> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

