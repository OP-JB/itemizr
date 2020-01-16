import React, {useState} from 'react'
import {connect} from 'react-redux'
import {updateItem} from '../store'

const EditItem = ({listId, storeId, name, onHand, par, orderQty, putItem, deleteItem}) => {
  const item = {storeId, name, onHand, par, orderQty}
  const [itemState, setItemState] = useState(item)

  const handleChange = event => {
    const {value} = event.target
    const item = {...itemState}
    item[event.target.name] = value
    setItemState(item)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const {name, value} = event.target
    const item = {listId, ...itemState}
    item[name] = value
    putItem(storeId, item)
  }

  return (
    <form className='item-row item-form' onSubmit={handleSubmit} onBlur={handleSubmit}>
      <div className='column'>
        <input type="text" name='name' value={itemState.name || name} onChange={handleChange} />
      </div>
      <div className='column'>
        <input type="number" name='onHand' value={itemState.onHand || onHand} onChange={handleChange} />
      </div>
      <div className='column'>
        <input type="number" name='par' value={itemState.par || par} onChange={handleChange} />
      </div>
      <div className='column'>
        <input type="number" name='orderQty' value={itemState.orderQty || orderQty} onChange={handleChange} />
      </div>
      <div onClick={() => deleteItem(storeId)} >
        <h4>&times;</h4>
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  putItem: (storeId, itemData) => dispatch(updateItem(storeId, itemData))
})

export default connect(null, mapDispatchToProps)(EditItem)
