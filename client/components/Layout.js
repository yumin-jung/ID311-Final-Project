import HeadInfo from './HeadInfo'
import Nav from './Nav'

const Layout = ({ children }) => {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <HeadInfo />
            <Nav />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout