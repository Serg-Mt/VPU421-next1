import { useEffect, useState } from 'react'
import User from './User.jsx';

export function FetchUsersDemo() {
  const
    [value, setValue] = useState(1);
  return <>

    <h1>FetchUsersDemo</h1>
    <input type="number" value={value} onInput={ev => setValue(ev.target.value)} />
    <GetUser id={value} />
  </>
}

function GetUser({ id }) {
  const
    [user, setUser] = useState(null),
    [error, setError] = useState(null);
  useEffect(() => {
    async function run() {
      setError(null);
      setUser(null);
      try {
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/' + id + '?' + Math.random());
        if (!response.ok)
          throw new error('response not ok');
        const
          u = await response.json();
        setUser(u);
      } catch (err) {
        setError(err);
      }
    }
    run();
  }, [id]);


  if (error)
    return <div className='error'>
      {error.toString()}
    </div>

  if (user)
    return <User user={user} />

  return <Spinner />
}

function Spinner() {
  return <div>loadind...</div>
}