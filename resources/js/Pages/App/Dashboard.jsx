import { Chart as ChartJS, ArcElement, Tooltip, RadialLinearScale, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { Bar, Doughnut, PolarArea } from "react-chartjs-2";
import Card from "../../Components/Card";
import Section from "../../Components/Section";
import AppLayout from "../../Layouts/AppLayout";
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import Button from '../../Components/Button';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip);

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
      title: 'Account Setup',
      icon: '/imgs/icons/pencil.png',
      route: 'company.index'
    },
    {
      title: 'Subscription',
      icon: '/imgs/icons/bill.png',
      route: 'pricing.index'
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
          '#b75d69ff',
          '#1a1423ff',
        ]
      }
    ],
  }

  const inventoryData = {
    labels: ['Out of Stock', 'Critical', 'Low Stocks', 'Adequate Stock'],
    datasets: [
      {
        data: [4, 19, 30, 50],
        backgroundColor: [
          '#1a1423ff',
          '#372549ff',
          '#774c60ff',
          '#b75d69ff',
        ]
      },
    ],
  };

  const Indicator = ({ color, title, children }) =>
    <div>
      <div className="flex gap-2 items-center">
        <div className={`h-3 w-3 ${color}`}></div>
        <small>{title}</small>
      </div>
      {children}
    </div>

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
                  <Indicator color={'bg-redwood'} title={`${invoices.paid_count} Paid Invoices`}>
                    <p>{invoices.paid}</p>
                  </Indicator>

                  <Indicator color={'bg-primary'} title={`${invoices.unpaid_count} Unpaid Invoices`}>
                    <p>{invoices.unpaid}</p>
                  </Indicator>
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

      <Section>
        <h2 className='h4 !font-light'>Menus</h2>

        <div className="grid md:grid-cols-3 gap-4 md:gap-0">
          <div className="col-span-2 md:border-r pr-0 md:pr-8 ">
            <div className="grid gap-4 md:gap-6 grid-cols-3 md:grid-cols-5">
              {menus.map(menu =>
                <div
                  className="space-y-2 text-center cursor-pointer group"
                  key={menu.title}
                  onClick={() => handleItemClick(menu.route)}>
                  <div className="p-6 md:p-8 bg-brand-gradient shadow-lg flex items-center justify-center group-hover:scale-95 transition-transform duration-500">
                    <img
                      src={menu.icon}
                      alt={menu.title}
                      className="h-10 md:h-14 w-10 md:w-14 group-hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                  <p>{menu.title}</p>
                </div>
              )}
            </div>
          </div>

          {/* <div className="col-span-1 md:border-l pl-0 md:pl-8">
            <h2 className='h4 !font-light'>Inventory Notice</h2>
            <Card>
              <p className='text-red-500'>You have {5} goods with stock size less than 5</p>
            </Card>
          </div> */}
        </div>
      </Section>

      <Section bottom className={'grid md:grid-cols-3 gap-4'}>
        <Card flat>
          <h6>Inventory Status</h6>
          <hr />

          <div className='flex gap-6 items-center mt-6'>
            <div className="">
              <Doughnut data={inventoryData} />
            </div>

            <div className='flex flex-col gap-4 justify-center'>
              <Indicator color={'bg-primary'} title={`Out of Stock`}>
                <p>4</p>
              </Indicator>

              <Indicator color={'bg-secondary'} title={`Critical`}>
                <p>19</p>
              </Indicator>

              <Indicator color={'bg-eggplant'} title={`Low Stocks`}>
                <p>30</p>
              </Indicator>

              <Indicator color={'bg-redwood'} title={`Adequate Stocks`}>
                <p>50</p>
              </Indicator>
            </div>
          </div>
        </Card>

        <Card flat>
          <h6>Top Customers</h6>
        </Card>
      </Section>
    </AppLayout>
  );
}

export default Dashboard
