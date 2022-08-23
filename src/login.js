import { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.state = {password: ""}
    }

    handleUsernameChange(e) {
        this.props.handleUserChange(e.target.value);
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleAuthChange(isAuthenticated) {
        this.props.handleAuthChange(isAuthenticated)
    }

    handleLoginClick() {
        console.log("Logging in ...")
    }

    handleSignupClick() {
        console.log("Signing up ...")
    }

    render() {
        return (
            <form>
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
                <button type="button" onClick={this.handleLoginClick}>Log in</button>
                <button type="button" onClick={this.handleSignupClick}>Sign up</button>
            </form>
        );
    }
}

export default Login;