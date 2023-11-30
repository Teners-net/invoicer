import { Chart as ChartJS, ArcElement, Tooltip, RadialLinearScale, BarElement, LinearScale, CategoryScale, LineElement, PointElement } from 'chart.js';
import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2";
import Card from "../../Components/Card";
import Section from "../../Components/Section";
import AppLayout from "../../Layouts/AppLayout";
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import Button from '../../Components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextInput from '../../Components/Form/TextInput';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip);

const Dashboard = ({ overview, invoices }) => {

  const [salesData, setSalesData] = useState({})
  const [productsData, setProductsData] = useState({})

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
      title: 'Account Settings',
      icon: '/imgs/icons/account.png',
      route: 'account.index'
    },
    {
      title: 'Subscription',
      icon: '/imgs/icons/bill.png',
      route: 'pricing.index'
    }
  ]

  useEffect(() => {
    axios.get(route('dashboard.sales'))
      .then((res) => setSalesData(res.data))
      .catch((error) => console.error('Error fetching sales data:', error));

    axios.get(route('dashboard.products'))
      .then((res) => setProductsData(res.data))
      .catch((error) => console.error('Error fetching sales data:', error));
  }, [])

  const handleItemClick = (_route) => {
    Inertia.visit(route(_route));
  }

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

  const invoiceChartData = {
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

  const inventoryChartData = {
    labels: ['Out of Stock', 'Low Stocks', 'Adequate Stock'],
    datasets: [
      {
        data: [productsData?.stock?.out, productsData?.stock?.low, productsData?.stock?.adequate],
        backgroundColor: [
          '#eacdc2ff',
          '#774c60ff',
          '#1a1423ff',
        ]
      },
    ],
  }

  const salesChartData = {
    labels: salesData?.dates,
    datasets: [
      {
        label: 'Paid',
        data: salesData?.paid,
        borderColor: '#1a1423ff',
        backgroundColor: '#1a1423ff',
      },
      {
        label: 'Unpaid',
        data: salesData?.unpaid,
        borderColor: '#b75d69ff',
        backgroundColor: '#b75d69ff',
      },
    ],
  }

  const productsChartData = {
    labels: ['Goods', 'Services'],
    datasets: [
      {
        data: [productsData?.goods, productsData?.services],
        backgroundColor: [
          '#b75d69ff',
          '#372549ff',
        ]
      }
    ],
  }

  const Indicator = ({ color, title, value }) =>
    <div>
      <div className="flex gap-2 items-start">
        <div className={`h-3 w-3 ${color}`}></div>
        <small>{title}</small>
      </div>
      <p className='font-bold'>{value}</p>
    </div>

  return (
    <AppLayout title='Dashboard'>

      <div className="bg-black-gradient">
        <Section className={'!pt-1'}>
          <h2 className='h6 !font-light'>Overview</h2>

          <div className="grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-4">
            <Card className={"md:!p-4 col-span-2 md:col-span-1"}>
              <div className='flex gap-2 md:gap-3 items-center'>
                <div className="h-[6.5rem] w-[6.5rem]">
                  <Doughnut data={invoiceChartData} />
                </div>
                <div className="space-y-4">
                  <Indicator color={'bg-redwood'} title={`${invoices.paid_count} Paid Invoices`} value={invoices.paid} />
                  <Indicator color={'bg-primary'} title={`${invoices.unpaid_count} Unpaid Invoices`} value={invoices.unpaid} />
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

      <Section className="grid md:grid-cols-3 gap-2 md:gap-0">
        <div className="md:col-span-1 md:border-r pr-0 md:pr-4">
          <h2 className='h6 !font-light'>Product Page</h2>
          <div className="flex items-center">
            <p className="flex-1 border px-5 py-3" ></p>
            <Button>Visit</Button>
          </div>

          <p className='mt-4'>Share</p>
          <div className='flex'>
          </div>
        </div>

        <div className="md:col-span-2 pl-0 md:pl-4">
          <h2 className='h6 !font-light'>Menus</h2>
          <div className="grid gap-2 md:gap-3 grid-cols-3 md:grid-cols-5">
            {menus.map(menu =>
              <div
                className="space-y-2 text-center cursor-pointer group"
                key={menu.title}
                onClick={() => handleItemClick(menu.route)}>
                <div className="p-6 md:p-8 bg-brand-gradient shadow-lg flex items-center justify-center group-hover:scale-95 transition-transform duration-500">
                  <img
                    src={menu.icon}
                    alt={menu.title}
                    className="h-10 w-10 group-hover:scale-125 transition-transform duration-500"
                  />
                </div>
                <p>{menu.title}</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section bottom className='grid md:grid-cols-12 gap-3'>
        <div className='md:col-span-3 flex flex-col gap-2 md:gap-3 justify-between'>
          <Card flat className=' !p-4'>
            <h2 className='h6 !font-light'>Product Distribution Status</h2>
            <div className='grid grid-cols-8 gap-3 items-center mt-6'>
              <div className="col-span-4 md:col-span-5">
                <Doughnut data={productsChartData} />
              </div>

              <div className='col-span-3 flex flex-col gap-2 md:gap-3 justify-center'>
                <Indicator color={'bg-redwood'} title={`GOODS`} value={productsData?.goods} />
                <Indicator color={'bg-secondary'} title={`SERVICES`} value={productsData?.services} />
              </div>
            </div>
          </Card>

          <Card flat className=' !p-4'>
            <h2 className='h6 !font-light'>GOODS Inventory Status</h2>
            <div className='grid grid-cols-8 gap-3 items-center mt-6'>
              <div className="col-span-4 md:col-span-5">
                <Doughnut data={inventoryChartData} />
              </div>

              <div className='col-span-3 flex flex-col gap-2 md:gap-3 justify-center'>
                <Indicator color={'bg-dogwood'} title={`Out of Stock`} value={productsData?.stock?.out} />
                <Indicator color={'bg-eggplant'} title={`Low Stocks`} value={productsData?.stock?.low} />
                <Indicator color={'bg-primary'} title={`Adequate`} value={productsData?.stock?.adequate} />
              </div>
            </div>
          </Card>
        </div>

        <Card flat className='md:col-span-9 !p-4'>
          <h2 className='h6 !font-light'>Sales</h2>
          <hr />
          <div className='grid grid-cols-8 gap-2 md:gap-3 items-center mt-6'>
            <div className='col-span-7'>
              <Line data={salesChartData} />
            </div>
            <div className='col-span-1 flex flex-col gap-2 md:gap-3 justify-center'>
              <Indicator color={'bg-primary'} title={`Paid`} value={salesData?.paid?.reduce((a, val) => { return a + val }, 0)} />
              <Indicator color={'bg-redwood'} title={`UnPaid`} value={salesData?.unpaid?.reduce((a, val) => { return a + val }, 0)} />
            </div>
          </div>
        </Card>
      </Section>
    </AppLayout>
  );
}

export default Dashboard
