import ApplicationLogo from "./ApplicationLogo"
import Section from "./Section"

const Footer = () => {
    return (
        <footer className="bg-white text-black">
            <Section block className={"flex flex-col md:flex-row justify-between gap-6 py-16"}>
                <ApplicationLogo />

                <div>
                    <h6 className="mb-1 md:mb-4">Resources</h6>
                    <a href="">Blog</a> <br />
                </div>

                <div>
                    <h6 className="mb-1 md:mb-4">Contact</h6>
                    <a href="tel:+2347014293952">+2347014293952</a> <br />
                    <a href="mailto:contact@teners.net">contact@teners.net</a>
                </div>
            </Section>

            <Section block className={"flex justify-between items-center py-6 border-t"}>
                <small>{'\u00A9'} {new Date().getFullYear()}. <a href="https://teners.net" className="underline small">Teners.</a> All rights reserved</small>
                <small><a href="" className="small">Legal</a> &bull; <a href="" className="small">Privacy</a> &bull; <a href="" className="small">Terms of Use</a></small>
            </Section>
        </footer>
    )
}

export default Footer