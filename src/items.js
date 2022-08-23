import { Component } from "react";
import { Navigate } from 'react-router-dom';

import { itemsURL } from "./backend"

class Items extends Component {
    constructor(props) {
        super(props);
        this.handleItemChange = this.handleItemChange.bind(this);
        let items_list = []
        for(var i = 0; i < 3; i++) {
            items_list.push({item: "", price: 0})
        }
        this.state = {items: items_list}
    }

    componentDidMount() {
        console.log("mount")
        // this.setState({items: items_list})
    }

    handleItemChange(e, i) {
        console.log(e.target.name, e.target.value, i)
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
                        price: e.target.value
                    },
                    ...this.state.items.slice(i+1),
                ]
            })
        }
    }

    render() {
        // if (this.props.isAuthenticated === false) {
        //     return <Navigate to="/login" />
        // }

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
                    <button type="button">Summary</button>
                </div>
            </form>
        )
    }

}

export default Items;