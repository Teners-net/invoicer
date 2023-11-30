import ApplicationLogo from "./ApplicationLogo"
import Section from "./Section"

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <Section block className={"flex flex-col md:flex-row justify-between gap-10 py-8 md:py-16"}>
        <ApplicationLogo />

        <div className="space-y-2">
          <h5 className="mb-1 md:mb-4">Resources</h5>
          <p><a href="">Blog</a></p>
          {/* <p><a href="">Teners</a></p> */}
        </div>

        <div className="space-y-2">
          <h5 className="mb-1 md:mb-4">Contact</h5>
          <p><a href="tel:+2347014293952">+2347014293952</a></p>
          <p><a href="mailto:contact@invoicer.teners.net">contact@invoicer.teners.net</a></p>
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
