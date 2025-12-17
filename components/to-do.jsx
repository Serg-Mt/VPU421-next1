import { useState } from 'react';

class ToDoItem {
  id = Math.random(); // + Date.now();
  checked = false;
  text = '-default-';

  constructor(text) {
    Object.assign(this, { text });  // this.text = text;
  }
  toggleCheckbox() {
    this.checked = !this.checked
    return this;
  }
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

function Form({ addItem }) { // c управляемым input
  const
    [value, setValue] = useState('=start=');
  return <fieldset>
    <legend>Form 0</legend>
    <input value={value} onInput={event => setValue(event.currentTarget.value)} />
    <Button onClick={() => addItem(value)}>➕</Button>
  </fieldset>
}



export function ToDo({ }) {
  const
    [list, setList] = useState([new ToDoItem('Дело 1'), new ToDoItem('Дело 2')]),
    addItem = text => setList(prev => [...prev, new ToDoItem(text)]),
    delItem = id => setList(prev => prev.filter(el => id !== el.id)),
    toggleCheckbox = id => setList(prev => {
      const
        index = prev.findIndex(el => id === el.id),
        elem = prev[index];

      return prev.with(index, elem.toggleCheckbox());
    });
  return <>
    <Form addItem={addItem} />
    <List list={list} delItem={delItem} toggleCheckbox={toggleCheckbox} />
  </>
}

/**
 * 
 * @param {object} props 
 * @param {ToDoItem} props.item
 * @returns 
 */
function Item({ item, delItem, toggleCheckbox }) {
  const
    { id, text, checked } = item;
  return <li>
    <label>
      <input type="checkbox" value={checked} onChange={() => toggleCheckbox(id)} />
      {text}
    </label>
    <Button onClick={() => delItem(id)}>❌</Button>
    {item.checked && '✔'}
  </li>
}

/**
 * 
 * @param {object} props
 * @param {ToDoItem[]} props.list 
 * @returns 
 */
function List({ list, delItem, toggleCheckbox }) {
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <Item key={item.id} item={item} delItem={delItem} toggleCheckbox={toggleCheckbox} />)}
    </ol>
  </fieldset>
}