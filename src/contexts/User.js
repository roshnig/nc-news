import { createContext } from "react";
import { useState } from "react";
export const UserContext = createContext();

export const UserProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const [loggedInUser, setLoggedInUser] = useState(() => {
    //     // getting stored value

    //     const saved = localStorage.getItem('token')
    //     //const saved = localStorage.getItem("username");
    //     //const initialValue = JSON.parse(saved);
    //     //return initialValue || "";
    //     return (saved) ? saved : '';
    // });
    // // localStorage.getItem('token')

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isLoggedIn, setIsLoggedIn }}>
            {props.children}
        </UserContext.Provider>
    )
}


