import { Nav } from '../components/nav';
import '../style.css'

export default function App({ Component, pageProps }) {
  return <>
    <Nav />
    <hr />
    <Component {...pageProps} />
    <hr />
    (c)2025 my company
  </>
}