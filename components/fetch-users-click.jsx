import { useEffect, useState } from 'react'
import User from './User.jsx';



export function GetUserOnClick() {
  const
    [value, setValue] = useState(1),
    [user, setUser] = useState(null),
    [error, setError] = useState(null);


  async function run() {
    setError(null);
    setUser(null);
    try {
      const
        response = await fetch('https://jsonplaceholder.typicode.com/users/' + value + '?' + Math.random());
      if (!response.ok)
        throw new Error('response not ok');
      const
        u = await response.json();
      setUser(u);
    } catch (err) {
      setError(err);
    }
  }



  return <>
    <h1>FetchUsersDemo</h1>
    <button onClick={run} on>get</button>
    <input type="number" value={value} onInput={ev => setValue(ev.target.value)} />
    {error && <div className='error'>
      {error.toString()}
    </div>}
    {user && <User user={user} />}
    {!error && !user && <Spinner />}
  </>

}

function Spinner() {
  return <div>loadind...</div>
}