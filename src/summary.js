import { Component } from "react";
import { Link, Navigate } from 'react-router-dom';
import { summaryURL } from "./backend"

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {totalcost: 0.0}
    }

    componentDidMount() {
        const user = this.props.user
        const isAuth = this.props.isAuthenticated
        if (user.length > 0 && isAuth) {
            const userSummaryURL = summaryURL + `/${user}`
            fetch(userSummaryURL).then(resp => resp.json()).then(
                userItemsSummary => {
                    var totalcostUpdate = parseFloat(userItemsSummary["total_cost"])
                    this.setState({totalcost: totalcostUpdate})
                }
            )
        }
    }

    render() {
        if (this.props.isAuthenticated === false) {
            return <Navigate to="/login" />
        }

        return(
            <form>
                <label>Total Cost:
                    <input type="number" value={this.state.totalcost} readOnly/>
                </label>
                <Link to="/items">
                    <button type="button">Back</button>
                </Link>
            </form>
        )
    }
}

export default Summary;