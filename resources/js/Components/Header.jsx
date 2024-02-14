import { useState } from "react"
import ApplicationLogo from "./ApplicationLogo"
import Button from "./Button"
import Section from "./Section"

const Header = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState()

  const MenuItems = ({ className }) =>
    <div className={`${className}`}>
      <Button outline className={"border-0 px-3 md:px-6 hover:bg-white hover:underline hover:underline-offset-4"}>About</Button>
      <Button outline className={"border-0 px-3 md:px-6 hover:bg-white hover:underline hover:underline-offset-4"}>Help Center</Button>
      <Button outline className={"border-0 px-3 md:px-6 hover:bg-white hover:underline hover:underline-offset-4"} link href={route('pricing.index')}>Pricing</Button>
      <Button link href={route('dashboard')}>{user ? 'Dashboard' : 'Get Started'}</Button>
    </div>

  return (
    <nav className="bg-white text-black border-b sticky top-0 z-50">
      <Section block className={"flex justify-between items-center py-4"}>
        <ApplicationLogo />

        <MenuItems className={"hidden md:flex gap-4"} />

        <div className="flex items-center sm:hidden">
          <button title="Menu Hamburger" onClick={() => setMenuOpen(!menuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path className={`${menuOpen ? 'hidden' : 'inline-flex'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              <path className={`${menuOpen ? 'inline-flex' : 'hidden'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </Section>

      <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}>
        <MenuItems className={"flex flex-col p-4 "} />
      </div>
    </nav>
  )
}

export default Header
