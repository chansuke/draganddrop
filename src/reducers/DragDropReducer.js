// @flow

import { Model, ItemType } from '../types';
import { List } from 'immutable';
const init = Model();

type ActionType = 'ADD_ITEM' | 'REORDER_ITEM';

export default function DragDropReducer(
  model: Model = init,
  action: { type: ActionType, payload: ?Object }
) {
  switch (action.type) {
    case 'ADD_ITEM':
      return addItem(model, action.payload);
    case 'REORDER_ITEM':
      return reorderItem(model, action.payload);
    default:
      return model;
  }
}

function addItem(model, payload) {
  return model.updateIn(['items'], items => {
    const maxOrder = model.items.map(item => item.order).max() || 0;
    const itemNumebr = Math.floor(Math.random() * 1000) + 1000;
    return items.push(
      new ItemType({
        id: itemNumebr,
        name: `Item = ${itemNumebr}`,
        order: maxOrder + 1
      })
    );
  });
}

function reorderItem(model, payload) {
  if (payload) {
    const { itemId, order } = payload;
    const items = model.items;
    const maxOrder = model.items.map(item => item.order).sort().max();

    if (order < 1) {
      return model;
    }
    if (items) {
      const nextOrder = order;
      const nextItems = items.map((value, index) => {
        if (value.id === itemId) {
          if (1 <= nextOrder && nextOrder <= maxOrder) {
            return value.set('order', nextOrder);
          } else {
            return value;
          }
        } else {
          if (value.order >= nextOrder) {
            return value.set('order', value.order + 1);
          } else {
            return value;
          }
        }
      });
      return model.setIn(['items'], nextItems);
    } else {
      console.log('no item', itemId);
      return model;
    }
  } else {
    return model;
  }
}
