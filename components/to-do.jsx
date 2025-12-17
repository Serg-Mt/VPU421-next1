import { useState } from 'react';

class ToDoItem {
  id = Math.random(); // + Date.now();
  checked = false;
  text = '-default-';

  constructor(text) {
    Object.assign(this, { text });  // this.text = text;
  }
}

function Button({ children }) {
  return <button>{children}</button>
}

function Form({ }) {
  return <fieldset>
    <legend>Form 0</legend>
    <input />
    <Button>➕</Button>
  </fieldset>
}

export function ToDo({ }) {
  const
    [list, setList] = useState([new ToDoItem('Дело 1'), new ToDoItem('Дело 2')])
  return <>
    <Form />
    <List list={list} />
  </>
}

/**
 * 
 * @param {object} props 
 * @param {ToDoItem} props.item
 * @returns 
 */
function Item({ item }) {
  return <li>
    <label>
      <input type="checkbox" value={item.checked} />
      {item.text}
    </label>
    <Button>❌</Button>
    {item.checked && '✔'}
  </li>
}

/**
 * 
 * @param {object} props
 * @param {ToDoItem[]} props.list 
 * @returns 
 */
function List({ list }) {
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <Item item={item} />)}
    </ol>
  </fieldset>
}