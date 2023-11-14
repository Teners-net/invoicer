import ApplicationLogo from "./ApplicationLogo"
import Section from "./Section"

const Header = () => {
  return (
    <nav className="bg-white text-black">
      <Section block className={"flex justify-between items-center py-6"}>
        <ApplicationLogo />

        <div></div>
      </Section>
    </nav>
  )
}

export default Header
