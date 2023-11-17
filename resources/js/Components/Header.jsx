import ApplicationLogo from "./ApplicationLogo"
import Button from "./Button"
import Section from "./Section"

const Header = () => {
  return (
    <nav className="bg-white text-black">
      <Section block className={"flex justify-between items-center py-4"}>
        <ApplicationLogo />

        <div className="hidden md:flex gap-4">
          <Button outline className={"border-0 px-3 md:px-6 hover:bg-white hover:underline hover:underline-offset-4"}>About</Button>
          <Button outline className={"border-0 px-3 md:px-6 hover:bg-white hover:underline hover:underline-offset-4"}>Help Center</Button>
          <Button outline className={"border-0 px-3 md:px-6 hover:bg-white hover:underline hover:underline-offset-4"} link href={route('pricing.index')}>Pricing</Button>
          <Button link href={route('login')}>Get Started</Button>
        </div>

        <div className="block md:hidden"></div>
      </Section>
    </nav>
  )
}

export default Header
