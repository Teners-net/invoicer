import Card from "../../Components/Card";
import Section from "../../Components/Section";
import AppLayout from "../../Layouts/AppLayout";

const Dashboard = ({ user }) => {

  const menus = [
    {
      title: 'Products',
      bg: '',
    },
    {
      title: 'Customers',
      bg: '',
    },
    {
      title: 'Invoices',
      bg: '',
    },
    {
      title: 'Brand Setup',
      bg: '',
    },
    {
      title: 'Payment Setup',
      bg: '',
    },
    {
      title: 'Your Profile',
      bg: '',
    },
    {
      title: 'Subscription',
      bg: '',
    }
  ]

  return (
    <AppLayout title='Dashboard'>

      <div className="bg-black-gradient">
        <Section className={'!pt-1'}>
          <h2 className='h4 !font-light'>Overview</h2>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {[1, 2, 3, 4].map(_ => <Card></Card>)}
          </div>
        </Section>
      </div>

      <Section>
        <h2 className='h4 !font-light'>Account Summary</h2>

        <Card className={"grid md:grid-cols-2 !p-0 !py-4 !md:py-8"}>
          <div className="px-4 md:px-8 !py-4 !md:py-8 md:border-r">
            <h5 className="mb-8 h6">Paid Invoices</h5>
            <div className="flex gap-4 items-center">
              <div className="h-36 w-36"></div>
              <div className="space-y-6">
                <div>
                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-4 bg-black"></div>
                    <p>FIAT Currency</p>
                  </div>
                  <p className="h5">$ 200 (130)</p>
                </div>

                <div>
                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-4 bg-pink-500"></div>
                    <p>FIAT Currency</p>
                  </div>
                  <p className="h5">$ 200 (130)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-8 !py-4 !md:py-8 md:border-l">
            <h5 className="mb-8 h6">Unpaid Invoices</h5>
            <div className="flex gap-4 items-center">
              <div className="h-36 w-36"></div>
              <div className="space-y-6">
                <div>
                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-4 bg-black"></div>
                    <p>FIAT Currency</p>
                  </div>
                  <p className="h5">$ 200 (130)</p>
                </div>

                <div>
                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-4 bg-pink-500"></div>
                    <p>FIAT Currency</p>
                  </div>
                  <p className="h5">$ 200 (130)</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Section className={'pb-10 md:pb-20'}>
        <h2 className='h4 !font-light'>Menus</h2>

        <div className="grid md:grid-cols-4">
          <div className="col-span-3 md:border-r pr-0 md:pr-8 ">
            <div className="grid gap-6 md:gap-12 grid-cols-3 md:grid-cols-4">
              {menus.map(menu =>
                <div className="space-y-2 text-center">
                  <div className="h-20 md:h-40 bg-red-200 shadow-lg"></div>
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
