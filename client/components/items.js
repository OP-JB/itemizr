import React,{Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
const axios = require('axios') //API libary ajax
import {connect} from 'react-redux'
import UserPage from './user-page'
import AddItem from './add-item'
import Item from './item'
import ColHeader from './col-header'
import {getItems, addItem, removeItem} from '../store'

class Items extends Component {
  async componentDidMount() {
    const {loggedInUser, history, loadItems} = this.props
    if(!loggedInUser.id) history.push('/')
    try {
      const res = await loadItems()
    } catch(err) {
      console.error(err)
    }
    history.listen(location => {
      if (location.pathname !== this.props.location.pathname) {
        this.props.location.pathname = location.pathname;
        this.forceUpdate();
      }
    })
  }

  render() {
    const {items, logoutUser, deleteItem, location} = this.props
    const {pathname} = location
    const listId = pathname.split('/')[2]
    return (
      <div id='items-container'>
        <UserPage navbar={true}/>
        <AddItem listId={listId}/> {/*add supplier*/}
        <div className='col-header row'>
          <ColHeader num={'four'} headers={['Name', 'On Hand', 'Par', 'Order Qty']} />
        </div>
        {items.length < 1 ? <h2> no items </h2>
        :items.map((item, index) => <Item
            key={item.id + item.name}
            id={item.id}
            name={item.name}
            onHand={item.onHand}
            par={item.par}
            orderQty={item.orderQty}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user,
  items: state.items
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadItems: () => dispatch(getItems()),
  createItem: () => dispatch(addItem()),
  deleteItem: id => dispatch(removeItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Items)




