import { useEffect, useState } from 'react'
import User from './User.jsx';

export function FetchUsersDemo() {
  return <>
    <h1>FetchUsersDemo</h1>
    <GetUser id="10" />
  </>
}

function GetUser({ id }) {
  const
    [user, setUser] = useState(null),
    [error, setError] = useState(null);
  useEffect(() => {
    async function run(params) {
      try {
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
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
  }, []);


  if (error) return <div className='error'>
    {error.toString()}
  </div>

  if (user) return <User user={user} />

  return <Spinner />
}

function Spinner() {
  return <>loadind...</>
}