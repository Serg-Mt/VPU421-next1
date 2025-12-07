import Link from 'next/link';

const
  pages = [
    { href: '/', name: 'Home' },
    { href: '/state', name: 'States' },
    { href: '/effect', name: 'Fetch users' },
  ]

export function Nav() {
  return <nav>
    <ul>
      {pages.map(({ href, name }) =>
        <li key={href}>
          <Link href={href} >{name}</Link>
        </li>)}
    </ul>
  </nav>
}