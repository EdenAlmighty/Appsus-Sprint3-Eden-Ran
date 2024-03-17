import { HeroSvg } from "../cmps/HeroSvg.jsx";
import { MailSvg } from "../cmps/MailSvg.jsx";
import { KeepSvg } from "../cmps/KeepSvg.jsx";
import '../assets/img/'
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
                </div>
            </header>

            <section className="features">
                <h2>Our Apps</h2>
                <div className="feature">
                </div>
                <div className="apps-container">
                    <div className="app-info">
                        <div className="app-logo">
                            <MailSvg />
                        </div>
                        <p>appsus Mail</p>
                    </div>
                    <div className="app-info">
                        <div className="app-logo">
                            <KeepSvg />
                        </div>
                        <p>appsus Keep</p>
                    </div>
                    <div className="app-info">
                        <div className="app-logo">
                            <KeepSvg />
                        </div>
                        <p>appsus Keep</p>
                    </div>
                </div>

            </section>

            <section className="features">
                <h2>Our Team</h2>
                <div class="team-section">
                    <div class="info-card">
                        <div class="avatar-circle">
                            <img className="team" src="./assets/img/eden.jpg" alt="" srcset="" />
                        </div>
                        <div class="info-content">
                            <h2>Eden Gilady</h2>
                            <p>28 years old from Tel Aviv, Israel. Always looking <br /> for a new challenge. All about learning new things.<br /> Studying web development in Coding-Academy.</p>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="avatar-circle">
                            <img className="team" src="./assets/img/ran.jpg" alt="" srcset="" />
                        </div>
                        <div class="info-content">
                            <h2>Ran Sabban</h2>
                            <p>25 years old from Shoham, Israel. Always looking <br /> for a new challenge. All about learning new things.<br /> Studying web development in Coding-Academy.</p>
                        </div>
                    </div>
                </div>
            </section>


        </section >
    )
}
