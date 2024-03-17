import { HeroSvg } from "../cmps/HeroSvg.jsx";


export function Home() {
    return (
        <section className="home">
            <header>
                
                <div className="hero">
                    <section className="hero-title">
                        <h2>Let's organize</h2>
                        <p>appsus is here to help you organize your life, and make it a little easier.</p>
                        <button className="hero-cta">Get Started</button>
                    </section>
                    <section className="hero-svg">
                        <HeroSvg />
                    </section>
                    {/* <div className="animated-squares">
                        <div className="square" style={{ animationDelay: '0s' }}></div>
                        <div className="square" style={{ animationDelay: '1s' }}></div>
                        <div className="square" style={{ animationDelay: '2s' }}></div>
                    </div> */}
                </div>
            </header>

            <section className="features">
                <h2>Our Apps</h2>
                <div className="feature">
                </div>
                    <div className="apps-container">
                        <div className="app-info">
                        <div className="mail-logo">mail</div>
                        <p>Appsus is here to help you organize your life, and make it a little easier.</p>
                        </div>
                        <div className="app-info">
                        <div className="mail-logo">notes</div>
                        <p>Appsus is here to help you organize your life, and make it a little easier.</p>
                        </div>
                    </div>

            </section>
        </section>
    )
}
