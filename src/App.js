import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { DragDropActions } from './actions';
import Item from './components/Item';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// stateless compoent
const App = props => {
  const { reorderItem } = props;
  const itemsToRender = props.items
    .sortBy(item => item.order)
    .map((item, index) => (
      <Item
        name={item.name}
        id={item.id}
        order={item.order}
        reorderItem={reorderItem}
        key={item.id}
      />
    ));

  return (
    <div className='App'>
      {itemsToRender}
      <button onClick={() => props.addItem()}>Add</button>
    </div>
  );
};

export const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      items: state.get("items")
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      reorderItem: (itemId, order) =>
        dispatch(DragDropActions.reorderItem(itemId, order)),
      addItem: () => dispatch(DragDropActions.addItem())
    };
  }
)(App);

export default DragDropContext(HTML5Backend)(AppContainer);
