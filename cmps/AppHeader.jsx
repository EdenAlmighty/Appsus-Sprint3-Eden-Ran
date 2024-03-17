const { Link, NavLink } = ReactRouterDOM
export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <img className='main-logo' src=".././assets/img/appsus-logo.png" alt="" />
            {/* <h3 className='logo'>LOGO!</h3> */}
        </Link>
        
        <nav>
            <NavLink to="/"></NavLink>
            <NavLink to="/about"></NavLink>

            <NavLink to="/mail"><section className="logo-container flex align-center">
                <img className='mail-logo' src=".././assets/img/gmail-logo.png" alt="mail-logo" />
                <label className="mail-logo-txt" htmlFor="logo">Mail</label>
            </section>
            </NavLink>

            <NavLink to="/note"><section className="logo-container flex align-center">
                <img className='keep-logo' src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" alt="keep-logo" />
                <label className="logo-txt" htmlFor="logo">Keep</label>
            </section>
            
            </NavLink>
            <NavLink to="/books">Book</NavLink>
        </nav>
    </header>
}
