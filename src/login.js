import { Component } from "react";
import { Navigate } from 'react-router-dom';
import { signupURL, loginURL } from "./backend"

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleSignupClick = this.handleSignupClick.bind(this)
        this.state = {password: ""}
    }

    handleUsernameChange(e) {
        this.props.handleUserChange(e.target.value);
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleLoginClick(username, password) {
        if (username.length > 0 && password.length > 0) {
            fetch(loginURL, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({username: username, password: password})
            }).then(resp => resp.json()).then(
                resp_json => {
                    const success = resp_json["success"]
                    this.props.handleAuthChange(success)
                }
            )
        }
    }

    handleSignupClick(username, password) {
        if (username.length > 0 && password.length > 0) {
            fetch(signupURL, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({username: username, password: password})
            }).then(resp => resp.json()).then(
                resp_json => {
                    const success = resp_json["success"]
                    this.props.handleAuthChange(success)
                }
            )
        }
    }

    render() {
        if (this.props.isAuthenticated === true) {
            return <Navigate to="/items" />
        }

        return (
            <form>
                <label>Username:
                    <input
                        type="text"
                        onChange={(e) => this.handleUsernameChange(e)}
                    />
                </label>
                <label>Password:
                    <input
                        type="password"
                        onChange={(e) => this.handlePasswordChange(e)}
                    />
                </label>
                <button type="button" onClick={() => this.handleLoginClick(this.props.user, this.state.password)}>Log in</button>
                <button type="button" onClick={() => this.handleSignupClick(this.props.user, this.state.password)}>Sign up</button>
            </form>
        );
    }
}

export default Login;