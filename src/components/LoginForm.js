import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserContext } from "../contexts/User";
import { getUsers } from "../utils/api";


const LoginForm = () => {
    const { setLoggedInUser, setIsLoggedIn } = React.useContext(UserContext);
    const [users, setUsers] = React.useState([]);
    const [lopen, setlOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);

    React.useEffect(() => {
        getUsers().then((res) => {
            console.log(res, '<<users')
            setUsers(res)
        })
    }, [])

    const handleLClickOpen = () => {
        setlOpen(true);
    };

    const handleLClose = () => {
        setlOpen(false);
    };

    const handleLSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            const user = users.filter((user) => {
                return user.username === username
            })
            if (user.length === 0) {
                alert('user not found');
            } else {
                const loggedUser = user[0];
                setLoggedInUser(loggedUser);
                setIsLoggedIn(true);
                setlOpen(false);
                window.sessionStorage.setItem('username', loggedUser.username);
            }
        } else {
            alert('username is not valid')
        }
    }

    const usernameHandler = (evt) => {
        let inputVal = evt.target.value;
        var letters = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
        const isValidInput = letters.test(inputVal);
        if (isValidInput) {
            setUsername(evt.target.value);
            setIsValid(true)
        } else {
            setIsValid(false)
            alert('username should contain letters and numbers only')
        }
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleLClickOpen}>
                Login
            </Button>
            <Dialog open={lopen} onClose={handleLClose}>
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide your username.
                    </DialogContentText>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            placeholder="Please enter your username ...."
                            required={true}
                            onChange={usernameHandler}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLSubmit} type='submit'>Login</Button>
                    <Button onClick={handleLClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default LoginForm;
