const { useNavigate } = ReactRouter
const { NavLink } = ReactRouterDOM

export function AppHeader(){
    const navigate = useNavigate()
    function onGoHome(){
        navigate('/')
    }

    return <header className="app-header">
        <h1 className="logo" onClick={onGoHome}>React Book Shop</h1>
        <nav className="app-nav">
            <NavLink to="/">Home</NavLink> |
			<NavLink to="/about">About</NavLink> |
			<NavLink to="/books">Books</NavLink>
        </nav>
    </header>
}

{/* <a href="" onClick={(ev) => onSetPage(ev,'home')}>Home</a>
<a href="" onClick={(ev) => onSetPage(ev,'about')}>About</a>
<a href="" onClick={(ev) => onSetPage(ev,'books')}>Books</a> */}
