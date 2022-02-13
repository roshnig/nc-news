import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { getUser } from "../utils/api";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const Header = () => {
    let navigate = useNavigate();
    const { loggedInUser, isLoggedIn, setLoggedInUser, setIsLoggedIn } = useContext(UserContext);

    useEffect(() => {
        // if (localStorage.getItem('username')) {
        //     setLoggedInUser({ username: localStorage.getItem('username') })
        //     setIsLoggedIn(true);
        // }
        if (!loggedInUser.username) {
            return null
        } else {
            getUser(loggedInUser.username).then((res) => {
                setLoggedInUser(res);
            })
        }
    }, [loggedInUser.username])

    const onSignOut = () => {
        setLoggedInUser({});
        setIsLoggedIn(false);
        //localStorage.removeItem('username');
    }

    const homeButtonHandler = () => {
        navigate('/');
    }

    return (
        <div className="header_maindiv">
            <div>
                <Button
                    color="secondary"
                    size="large"
                    onClick={homeButtonHandler}
                    startIcon={
                        <HomeIcon color="primary" fontSize="inherit" />
                    }>
                    Home
                </Button>
            </div>
            <div>
                <h2>News Feed</h2>
            </div>
            <div>
                {
                    (!isLoggedIn) ? (
                        <div className="header_maindiv_login">
                            <LoginForm></LoginForm>
                        </div>
                    ) : (
                        <>
                            <img className="user_avatar" src={loggedInUser.avatar_url} alt={loggedInUser.name}></img>
                            <Button onClick={onSignOut}>SignOut</Button>
                        </>
                    )
                }
            </div>
        </div>

    )
}
export default Header