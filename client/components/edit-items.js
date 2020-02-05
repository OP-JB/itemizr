import React, {useState, useEffect, Fragment} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import UserBar from './user-bar'
import AddItemButton from './add-item-button'
import EditItem from './edit-item'
import ColHeader from './col-header'
import {getItems, addItem, removeItem, saveItems, cancelUpdate} from '../store'

const EditItems = ({user, loadItems, items, createItem, deleteItem, saveChanges, cancelChanges, history, location}) => {
  if(!user.id) history.push('/')
  const {pathname} = location
  const listId = pathname.split('/')[2]

  const [list, setList] = useState([])

  useEffect(() => {
    getList(listId)
  }, [])

  useEffect(() => {
    loadItems(listId)
  }, [])

  const getList = async id => {
    try {
      const {data} = await axios.get(`/api/lists/${id}`)
      setList(data)
    } catch(err) {
      console.error(err)
    }
  }

  const addNewItem = async () => {
    try {
      const {data} = await axios.get('/api/items/new')
      let id = data
      items.forEach(item => {
        if(item.id === id) id += 1
      })
      if(id) {
        const newItem = {id, name: '', onHand: '', par: '', orderQty: '', listId}
        createItem(newItem)
      }
    } catch(err) {
      console.error(err)
    }
  }

  const cancelEdit = () => {
    history.push('/lists')
  }

  return list ? (
    <Fragment>
      <UserBar />
      <div id='edit-items-page' className='page-pdg'>
        <div className='header ft-20'>
        <h3>{list.name}</h3>
        </div>
        <div className='col-header row secondary-txt'>
          <ColHeader headers={['ITEM', 'ON HAND', 'PAR', 'ORDER QTY']} />
        </div>
        <div className='row-container bg-white box-shadow'>
          {items.length > 0 && items.map(({id, name, onHand, par, orderQty}, index) => (
            <EditItem
              key={Math.random() + name}
              listId={listId}
              id={id}
              name={name}
              onHand={onHand}
              par={par}
              orderQty={orderQty}
              createItem={createItem}
              deleteItem={deleteItem}
            />
          ))}
          <AddItemButton listId={list.id} addNewItem={addNewItem} />
        </div>
        <div className='save'>
          <button className='action-btn white bg-drk-blue pointer' onClick={() => saveChanges(list.id, items)}>SAVE CHANGES</button>
          <button className='action-btn cancel-btn pointer light-font' onClick={cancelEdit}>CANCEL</button>
        </div>
      </div>
    </Fragment>
  ) : null
}

const mapStateToProps = ({user, items}) => ({user, items})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadItems: listId => dispatch(getItems(listId)),
  createItem: newItem => dispatch(addItem(newItem)),
  deleteItem: storeId => dispatch(removeItem(storeId)),
  saveChanges: (listId, items) => dispatch(saveItems(listId, items)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItems)