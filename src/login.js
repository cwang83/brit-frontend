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
        this.state = {password: "", message: ""}
    }

    handleUsernameChange(e) {
        this.props.handleUserChange(e.target.value);
        this.setState({password: "", message: ""});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value, message: ""});
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
                    const respMsg = resp_json["message"]
                    this.setState({password: "", message: respMsg})
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
                    const respMsg = resp_json["message"]
                    this.setState({password: "", message: respMsg})
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
                <div>
                    <label>Username:
                        <input
                            type="text"
                            value={this.props.user}
                            onChange={(e) => this.handleUsernameChange(e)}
                        />
                    </label>
                    <label>Password:
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={(e) => this.handlePasswordChange(e)}
                        />
                    </label>
                    <button type="button" onClick={() => this.handleLoginClick(this.props.user, this.state.password)}>Log in</button>
                    <button type="button" onClick={() => this.handleSignupClick(this.props.user, this.state.password)}>Sign up</button>
                </div>
                <div>
                    <label>{this.state.message}</label>
                </div>
            </form>
        );
    }
}

export default Login;