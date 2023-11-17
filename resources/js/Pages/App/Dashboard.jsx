import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import Card from "../../Components/Card";
import Section from "../../Components/Section";
import AppLayout from "../../Layouts/AppLayout";
import { Inertia } from '@inertiajs/inertia';

ChartJS.register(ArcElement, Tooltip);

const Dashboard = ({ overview, invoices }) => {

  const menus = [
    {
      title: 'Products',
      icon: '/imgs/icons/product.png',
      route: 'products.index'
    },
    {
      title: 'Customers',
      icon: '/imgs/icons/people.png',
      route: 'customers.index'
    },
    {
      title: 'Invoices',
      icon: '/imgs/icons/bill.png',
      route: 'invoices.index'
    },
    {
      title: 'Brand Setup',
      icon: '/imgs/icons/pencil.png',
      route: 'products.index'
    },
    {
      title: 'Payment Setup',
      icon: '/imgs/icons/payment.png',
      route: 'products.index'
    },
    {
      title: 'Your Profile',
      icon: '/imgs/icons/account.png',
      route: 'profile.index'
    },
    {
      title: 'Subscription',
      icon: '/imgs/icons/bill.png',
      route: 'subscription.index'
    }
  ]

  const handleItemClick = (_route) => {
    Inertia.visit(route(_route));
  };

  const overviews = [
    {
      label: 'Products',
      value: overview.products,
      icon: '/imgs/icons/product.png'
    },
    {
      label: 'Customers',
      value: overview.customers,
      icon: '/imgs/icons/people.png'
    },
    {
      label: 'Invoices',
      value: overview.invoices,
      icon: '/imgs/icons/bill.png'
    },
  ]

  const invoiceData = {
    labels: ['Paid', 'Unpaid'],
    datasets: [
      {
        data: [invoices.paid, invoices.unpaid],
        backgroundColor: [
          '#000030',
          '#860081',
        ]
      }
    ],
  }

  return (
    <AppLayout title='Dashboard'>

      <div className="bg-black-gradient">
        <Section className={'!pt-1'}>
          <h2 className='h4 !font-light'>Overview</h2>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Card className={"md:!p-4 col-span-2 md:col-span-1"}>
              <div className='flex gap-4 items-center'>
                <div className="h-[6.5rem] w-[6.5rem]">
                  <Doughnut data={invoiceData} />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex gap-2 items-center">
                      <div className="h-3 w-3 bg-primary"></div>
                      <small>{invoices.paid_count} Paid Invoices</small>
                    </div>
                    <p>NGN{invoices.paid}</p>
                  </div>

                  <div>
                    <div className="flex gap-2 items-center">
                      <div className="h-3 w-3 bg-secondary"></div>
                      <small>{invoices.unpaid_count} Unpaid Invoices</small>
                    </div>
                    <p>NGN{invoices.unpaid}</p>
                  </div>
                </div>
              </div>
            </Card>

            {overviews.map(_ =>
              <Card key={_.label} className={'flex gap-3 md:gap-6'}>
                <img src={_.icon} alt={_.label} className="h-8 md:h-14 w-8 md:w-14 p-2 md:p-3 bg-gray-50" />
                <div>
                  <h3 className="h1 !mb-2 md:text-5xl">{_.value}</h3>
                  <p>{_.label}</p>
                </div>
              </Card>
            )}
          </div>
        </Section>
      </div>

      <Section bottom>
        <h2 className='h4 !font-light'>Menus</h2>

        <div className="grid md:grid-cols-4">
          <div className="col-span-3 md:border-r pr-0 md:pr-8 ">
            <div className="grid gap-6 md:gap-10 grid-cols-2 md:grid-cols-5">
              {menus.map(menu =>
                <div
                  className="space-y-2 text-center cursor-pointer group"
                  key={menu.title}
                  onClick={() => handleItemClick(menu.route)}>
                  <div className="h-28 md:h-32 bg-brand-gradient shadow-lg flex items-center justify-center group-hover:scale-95 transition-transform duration-500">
                    <img
                      src={menu.icon}
                      alt={menu.title}
                      className="h-14 w-14 p-1 group-hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                  <p>{menu.title}</p>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-1 md:border-l pl-4 md:pl-8"></div>
        </div>
      </Section>
    </AppLayout>
  );
}

export default Dashboard
