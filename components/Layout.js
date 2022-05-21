import Nav from './Nav'
import HeadInfo from './HeadInfo'

const Layout = ({ children }) => {
    return (
        <>
            <HeadInfo />
            <Nav />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout