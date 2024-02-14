import { Inertia } from "@inertiajs/inertia"
import Card from "../../../Components/Card"
import Section from "../../../Components/Section"
import AppLayout from "../../../Layouts/AppLayout"

const AccountLayout = ({
  page = 'Brand Settings',
  children
}) => {
  const menus = [
    {
      title: "Brand Settings",
      icon: '/imgs/icons/pencil.png',
      onclick: () => Inertia.visit(route('account.index'))
    },
    {
      title: "Payment Channels",
      icon: '/imgs/icons/payment.png',
      onclick: () => Inertia.visit(route('payment_channels.index'))
    },
    {
      title: "Exchange Rates",
      icon: '/imgs/icons/exchange-rate.png',
      onclick: () => Inertia.visit(route('account.index'))
    },
    {
      title: "Templates",
      icon: '/imgs/icons/bill.png',
      onclick: () => Inertia.visit(route('account.index'))
    },
    {
      title: "Users",
      icon: '/imgs/icons/people.png',
      onclick: () => Inertia.visit(route('account.index'))
    },
    {
      title: "Subscription",
      icon: '/imgs/icons/subscription.png',
      onclick: () => Inertia.visit(route('account.index'))
    },
    {
      title: "Logout",
      icon: '/imgs/icons/logout.png',
      onclick: () => {
        Inertia.post(route('logout'), {
          onFinish: () => Inertia.visit(route('home'))
        })
      }
    }
  ]

  return (
    <AppLayout title='Account' onBackPress={() => Inertia.visit(route('dashboard'))}>
      <Section className="grid md:grid-cols-5 gap-4" bottom>
        <div className="md:col-span-1">
          <Card flat>
            <small>Menus</small>
            {menus.map(menu => {
              return (
                <button onClick={menu.onclick} key={menu.title} className={`w-full hover:bg-dogwood/50 flex items-center gap-1 px-2 my-2 border-l-4 ${menu.title === page ? 'bg-dogwood border-redwood' : 'border-transparent'}`}>
                  <img src={menu.icon} alt={menu.title} className="h-5 w-5" />
                  <h6 className={`text-start px-2 py-3 font-light`}>{menu.title}</h6>
                </button>
              )
            })}
          </Card>
        </div>

        <div className="md:col-span-4">{children}</div>
      </Section>
    </AppLayout>
  )
}

export default AccountLayout