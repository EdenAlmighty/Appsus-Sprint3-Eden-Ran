export function Home() {
    return (
        <section className="home">
            <header>

                <div className="hero">
                    <h1>Let's organize</h1>
                    <p>Appsus is here to help you organize your life, and make it a little easier.</p>
                    <button>Get Started</button>
                    <div className="animated-squares">
                        <div className="square" style={{ animationDelay: '0s' }}></div>
                        <div className="square" style={{ animationDelay: '1s' }}></div>
                        <div className="square" style={{ animationDelay: '2s' }}></div>
                    </div>
                </div>
            </header>

            <section className="features">
                <h2>Our Features</h2>
                <div className="feature">
                    <div className="icon-check"></div>
                    <p>Appsus is here to help you organize your life, and make it a little easier.</p>
                </div>
            </section>
        </section>
    );
}
