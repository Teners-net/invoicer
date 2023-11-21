import { usePage } from "@inertiajs/inertia-react";
import Button from "../Components/Button";
import Card from "../Components/Card";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Section from "../Components/Section";

const Welcome = () => {

  const { user } = usePage().props

  const GetStarted = ({...rest}) => <Button {...rest}>Create a Free Invoice Now</Button>

  return (
    <>
      <Header user={user} />

      <Section className={'grid md:grid-cols-2'}>
        <div className="space-y-6">
          <h1>Invoice Your Customers in Seconds</h1>
          <p>
            The world's simplest way to manage your payments and customers.
            Save time, stay organized and professional, keep proper records and manage your inventory.
          </p>

          <div className="flex gap-4">
            <GetStarted />
            <Button outline>See a Demo</Button>
          </div>
        </div>
        <div></div>
      </Section>

      <Section bottom className={"space-y-6"}>
        <h2>Focus on Growing Your Business</h2>
        <p>We're here to help you get your finances out of the way — <span>invoicer</span> is free, simple and secure.</p>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className={"space-y-6"}>
            <h3></h3>
            <p></p>
          </Card>
          <Card className={"space-y-6"}>
            <h3>Easy Inventory Management</h3>
            <p>Know what stock sells faster and what ite is low on stock</p>
          </Card>
          <Card>
            <h3>Multiple Currency</h3>
            <p>Don't be restricted, create your invoices in any currency and work smoothly with your international customers</p>
          </Card>
          <Card></Card>
        </div>
      </Section>

      <div className="bg-black text-white">
        <Section bottom className={'flex items-center gap-4 justify-center'}>
          <GetStarted outline />
          <p>It's FREE!</p>
        </Section>
      </div>

      <Section></Section>

      <Footer />
    </>
  );
}

export default Welcome
