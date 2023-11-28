import Button from "../Components/Button";
import Card from "../Components/Card";
import Section from "../Components/Section";
import GuestLayout from "../Layouts/GuestLayout";

const Welcome = () => {

  const GetStarted = ({ ...rest }) => <Button {...rest} link href={route('dashboard')}>Create a Free Invoice Now</Button>

  const features = [
    {
      'title': "Easy Inventory Management",
      'description': "Know what stock sells faster and what item is low on stock"
    },
    {
      'title': "Multiple Currency",
      'description': "Don't be restricted, create your invoices in any currency and work smoothly with your international customers"
    },
    {
      'title': "Amplify your brand",
      'description': "Get your invoice looking the way you want with your own logo, brand colors and extra notes. Create beautiful, customised invoices quickly."
    },
  ]

  return (
    <GuestLayout title={'Home'}>
      <div className="bg-white">
        <Section block className={'grid md:grid-cols-2 gap-6 md:gap-12 items-center'}>
          <div className="space-y-6 py-6 md:py-0">
            <h1>Effortless Invoicing and Seamless Inventory Management for Your Business</h1>
            <p>
              The world's simplest way to manage your payments and customers.
              Save time, stay organized and professional, keep proper records and manage your inventory.
            </p>

            <div className="flex gap-3 md:gap-6">
              <GetStarted />
              <Button outline>See a Demo</Button>
            </div>
          </div>

          <img src="/imgs/assets/invoicer_banner.png" alt="Invoicer" className="hidden md:block w-full py-12" />
        </Section>
      </div>

      <Section bottom className={"space-y-6"}>
        <div>
          <h2>Focus on Growing Your Business</h2>
          <p>We're here to help you get your finances out of the way — <span>invoicer</span> is free, simple and secure.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-3 md:gap-6">
          {features.map(_ =>
            <Card className={"space-y-3 md:space-y-6"}>
              <h3 className="h4">{_.title}</h3>
              <p>{_.description}</p>
            </Card>
          )}
        </div>
      </Section>

      <div className="bg-black text-white">
        <Section bottom className={'flex items-center gap-4 justify-center'}>
          <GetStarted outline />
          <p>It's FREE!</p>
        </Section>
      </div>
    </GuestLayout>
  );
}

export default Welcome
