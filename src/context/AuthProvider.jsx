import React, { useState} from 'react';
import {auth} from "../firebase/config";
import { useNavigate } from 'react-router';
import Spiner from '../components/Spiner';


export const AuthContext = React.createContext(null);

function AuthProvider({children}) {

    const [user, setUser] = React.useState({});
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();

    React.useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(user => {
            console.log(user);
            if(user) {
                const {displayName, uid, email, photoURL } = user;
                setUser({
                    displayName, 
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

