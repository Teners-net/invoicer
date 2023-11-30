import Card from "../../../Components/Card"
import Section from "../../../Components/Section"
import AppLayout from "../../../Layouts/AppLayout"

const AccountLayout = ({
  active = 'setup',
  children
}) => {
  const menus = [
    {
      title: "Brand Settings",
      onclick: () => null
    },
    {
      title: "Payment Channels",
      onclick: () => null
    },
    {
      title: "Exchange Rates",
      onclick: () => null
    }
  ]

  return (
    <AppLayout title='Account' >
      <Section className="grid md:grid-cols-12 gap-8" bottom>
        <div className="md:col-span-3">
          <Card flat>
            <small>Menus</small>

            {menus.map(menu => <button key={menu.title} className="block my-4" onClick={menu.onclick}>{menu.title}</button>)}
          </Card>
        </div>

        <div className="md:col-span-9">{children}</div>
      </Section>
    </AppLayout>
  )
}

export default AccountLayout