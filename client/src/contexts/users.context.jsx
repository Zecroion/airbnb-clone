import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const UserContext = createContext({});


const UserContextProvider = ({ children }) => {
    
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    useEffect(() => {
        if (!user) {
            axios.get('/profile', {withCredentials: true}).then(({data}) => {
                setUser(data);
                setReady(true);
                console.log(ready);
            }).catch(err => console.log(err));
        }
    }, [])
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;