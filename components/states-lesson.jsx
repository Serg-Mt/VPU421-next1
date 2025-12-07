import { Component, useState } from 'react'
import classes from './like.module.css';


class LikeC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: this.props.start || 1,
      border: !!this.props.border
    }
  }

  render() {
    let
      className = '';
    if (this.props.big) className += ' ' + classes.big;
    if (this.state.border) className += ' ' + classes.bordered;
    if ('green' === this.props.color) className += ' ' + classes.green;
    return <button
      onClick={() => this.setState((prev) => ({ like: (+this.props.step || 1) + +prev.like }))}
      onContextMenu={() => this.setState(({ border }) => ({ border: !border }))}
      className={className}
    >
      Like:{this.state.like}
    </button>
  }
}

export function StateLesson() {
  return <>
    <h1>Состояния компонент</h1>
    <InputForm />
    <hr />
    <LikeF color="green" start="100" />
    <LikeF big step="9" start={99} />
    <LikeF step="100" border />
    <hr />
    <LikeC color="green" start="100" />
    <LikeC big step="9" start={99} />
    <LikeC step="100" border />
  </>
}

function LikeF({ start = 1, step = 1, color, big, border }) {
  const
    [like, setLike] = useState(+start || 0),
    [bordered, setBordered] = useState(!!border);
  return <button
    className={[
      big && classes.big,
      bordered && classes.bordered,
      'green' === color && classes.green]
      .filter(Boolean)
      .join(' ')}
    onClick={() => setLike(prev => +step + prev)}
    onContextMenu={() => setBordered(prev => !prev)}
  >
    Like:{like}
  </button>
}


function InputForm() {
  const
    [value, setValue] = useState('-start-');
  return <>
    <input value={value} onInput={event=>setValue(event.currentTarget.value)}/>
    <button onClick={() => alert(value)}>show</button>
    value={value}
  </>
}
