const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <section className="logo-container flex align-center">
                <img className='keep-logo' src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" alt="keep-logo" />
                <label className="keep-logo-txt" htmlFor="logo">Keep</label>
            </section>

            <section className="logo-container flex align-center">
                <img className='mail-logo' src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png" alt="mail-logo" />
                <label htmlFor="logo"></label>
            </section>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            {/* <NavLink to="/books">Books</NavLink> */}
        </nav>
    </header>
}
