const {useState } = React
const { Link, NavLink } = ReactRouterDOM



export function AppHeader() {

    const [isBurger, setIsBurger] = useState(true)


    return <header className="app-header">
        <Link to="/">
            <img className='main-logo' src=".././assets/img/appsus-logo.png" alt="" />
            {/* <h3 className='logo'>LOGO!</h3> */}
        </Link>
        <div onClick={() => setIsBurger((prevIsBurger) => !prevIsBurger)} className={`burger-toggle ${isBurger ? 'show' : 'hide'}` }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg></div>


        <nav className={isBurger ? 'show' : 'hide'}>
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
            <NavLink to="/books"><section className="logo-container flex align-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg><span>Book</span></section></NavLink>
        </nav>
    </header>
}
