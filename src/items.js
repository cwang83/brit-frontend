import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { itemsURL } from "./backend"

const itemRows = 3

class Items extends Component {
    constructor(props) {
        super(props);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleSummaryClick = this.handleSummaryClick.bind(this);
        var items_list = []
        for(var i = 0; i < itemRows; i++) {
            items_list.push({item: "", price: 0.0})
        }
        this.state = {items: items_list}
    }

    componentDidMount() {
        const user = this.props.user
        const isAuth = this.props.isAuthenticated
        if (user.length > 0 && isAuth) {
            const userItemsURL = itemsURL + `/${user}`
            fetch(userItemsURL).then(resp => resp.json()).then(
                userItems => {
                    var itemsList = []
                    for (var i = 0; i < userItems.length; i++) {
                        itemsList.push({item: userItems[i]["item"], price: parseFloat(userItems[i]["price"])})
                    }
                    for (var i = itemsList.length; i < itemRows; i++) {
                        itemsList.push({item: "", price: 0.0})
                    }
                    this.setState({items: itemsList})
                }
            )
        }
    }

    handleItemChange(e, i) {
        if (e.target.name === "item") {
            this.setState({
                items: [
                    ...this.state.items.slice(0, i),
                    {
                        item: e.target.value,
                        price: this.state.items[i].price
                    },
                    ...this.state.items.slice(i+1),
                ]
            })
        }
        if (e.target.name === "price") {
            this.setState({
                items: [
                    ...this.state.items.slice(0, i),
                    {
                        item: this.state.items[i].item,
                        price: parseFloat(e.target.value)
                    },
                    ...this.state.items.slice(i+1),
                ]
            })
        }
    }

    handleSummaryClick(user_items) {
        const user = this.props.user
        const isAuth = this.props.isAuthenticated
        if (user.length > 0 && isAuth) {
            const userItemsURL = itemsURL + `/${user}`
            fetch(userItemsURL, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(user_items)
            })
        }
    }

    render() {
        if (this.props.isAuthenticated === false) {
            return <Navigate to="/login" />
        }

        return (
            <form>
                <div>
                    <input value="Item" readOnly/>
                    <input value="Price(£)" readOnly/>
                </div>
                <div>
                    <input name="item" type="text" value={this.state.items[0].item} onChange={(e) => this.handleItemChange(e, 0)} />
                    <input name="price" type="number" value={this.state.items[0].price} onChange={(e) => this.handleItemChange(e, 0)} />
                </div>
                <div>
                    <input name="item" type="text" value={this.state.items[1].item} onChange={(e) => this.handleItemChange(e, 1)} />
                    <input name="price" type="number" value={this.state.items[1].price} onChange={(e) => this.handleItemChange(e, 1)} />
                </div>
                <div>
                    <input name="item" type="text" value={this.state.items[2].item} onChange={(e) => this.handleItemChange(e, 2)} />
                    <input name="price" type="number" value={this.state.items[2].price} onChange={(e) => this.handleItemChange(e, 2)} />
                </div>
                <div>
                    <Link to="/summary">
                        <button type="button" onClick={() => this.handleSummaryClick(this.state.items)}>Summary</button>
                    </Link>
                </div>
            </form>
        )
    }

}

export default Items;