import { useState } from "react";
import Button from "../Components/Button";
import Card from "../Components/Card";
import Section from "../Components/Section";
import GuestLayout from "../Layouts/GuestLayout";
import { GetStarted } from "../Components/Partials";

const Pricing = () => {
  const [pricingType, setPricingType] = useState('YEARLY')

  const plans = [
    {
      name: 'Free',
      price: {
        monthly: 0.00,
        yearly: 0.00
      },
      bg: 'bg-gray-200',
      features: [
        'Product Page and bio link',
        'Up to 30 invoices monthly',
        'Up to 3 payment channels',
        'Basic Invoice Templates',
        'Limited Brand Watermark',
        'Single user access',
        '1 custom currency conversion pair',
        'Auto-updated currency exchange rate',
        'Auto-delete data older than 1 year',
      ]
    },
    {
      name: 'Basic',
      price: {
        monthly: 5.99,
        yearly: 4.99
      },
      bg: 'bg-blue-200',
      features: [
        'Product Page and bio link',
        'Up to 75 invoices monthly',
        'Up to 8 payment channels',
        'Enhanced Invoice Templates',
        'No Brand Watermark',
        'Up to 5 users',
        'Up to 5 custom currency conversion pairs',
        'Automatic Overdue Notice',
        'Priority email support',
      ]
    },
    {
      name: 'Pro',
      price: {
        monthly: 14.99,
        yearly: 13.99
      },
      bg: 'bg-yellow-200',
      features: [
        'Customizable Product Page and custom link',
        'Unlimited invoices monthly',
        'Up to 15 payment channels',
        'Premium Invoice Templates',
        'No Brand Watermark',
        'Up to 30 users',
        'Up to 15 custom currency conversion pairs',
        'Advanced Reporting',
        'Automatic Overdue Notice with Customization Options',
        '24/7 Priority customer support',
      ]
    },
  ];

  const Plan = ({ plan }) => {
    const price = pricingType === 'YEARLY' ? plan.price.yearly : plan.price.monthly

    return (
      <Card key={plan.name} className="!p-0 flex flex-col justify-between">
        <div>
          <div className={`p-4 space-y-2 ${plan.bg}`}>
            <h3>{plan.name}</h3>
            <h4>${price}<small>/monthly</small></h4>
            {pricingType === 'YEARLY' && <h5 className="p">${price * 12} billed yearly</h5>}
          </div>

          <div className="p-4">
            {plan.features.map(feature =>
              <div key={feature} className="pb-3 flex gap-2 items-center">
                <p>{'\u2022'}</p>
                {feature}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 space-y-2">
          <Button className="w-full">{plan.name == 'Free' ? 'Get Started' : 'Buy Now'}</Button>
        </div>
      </Card>
    )
  }

  return (
    <GuestLayout title={"Pricing Plans"}>
      <div className="bg-white">
        <Section className="flex flex-col items-center text-center !py-24 space-y-6" bottom >
          <h1>Friendly Pricing Plan <span className="p">-Coming Soon</span></h1>
          <p>We're offering a generous Free Plan and affordable premium pricing plans that grows with your business</p>
          <div className="flex items-center gap-4">
            <GetStarted outline />
            <p>It's FREE!</p>
          </div>
        </Section>
      </div>

      <Section block bottom className="-mt-12 md:max-w-[65vw]">
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map(plan => <Plan key={plan.name} plan={plan} />)}
        </div>
      </Section>

    </GuestLayout>
  );
}

export default Pricing
