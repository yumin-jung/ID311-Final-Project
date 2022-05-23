import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/photos">
                        <a>Photos</a>
                    </Link>
                </li>
                <li>
                    <Link href="/signIn">
                        <a>SignIn</a>
                    </Link>
                </li>
                <li>
                    <Link href="/signUp">
                        <a>SignUp</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav