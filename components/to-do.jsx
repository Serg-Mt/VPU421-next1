import { useRef, useState } from 'react';

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

const Button =function Button({ children, onClick }) {
  console.debug('Button render', children);
  return <button onClick={onClick}>{children}</button>
}

function Form0({ addItem }) { // c управляемым input
  const
    [value, setValue] = useState('=start=');
  console.log('Form 0 render', value);
  return <fieldset>
    <legend>Form 0</legend>
    <input value={value} onInput={event => setValue(event.currentTarget.value)} />
    <Button onClick={() => addItem(value)}>➕</Button>
  </fieldset>
}

function Form1({ addItem }) { // ref
  const
    ref = useRef(null);
  console.log('Form 1 render', ref);
  return <fieldset>
    <legend>Form 1</legend>
    <input ref={ref} />
    <Button onClick={() => addItem(ref.current.value)}>➕</Button>
  </fieldset>
}

function Form2({ addItem }) { // form
  console.log('Form 2 render');
  return <fieldset>
    <legend>Form 2</legend>
    <form
      style={{ backgroundColor: 'azure', padding: '10px' }}
      onSubmit={event => {
        event.preventDefault();
        const
          formData = new FormData(event.currentTarget);
        addItem(formData.get("input-name"))
      }}
    >
      <input name="input-name" />
      <input type='submit' />
    </form>

  </fieldset>
}

const Form = [Form0, Form1, Form2][0];



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
  console.log('Item render', item);
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
  console.debug('List render');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <Item key={item.id} item={item} delItem={delItem} toggleCheckbox={toggleCheckbox} />)}
    </ol>
  </fieldset>
}