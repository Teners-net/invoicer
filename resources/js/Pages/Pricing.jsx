import Button from "../Components/Button";
import Card from "../Components/Card";
import Section from "../Components/Section";
import GuestLayout from "../Layouts/GuestLayout";

const Pricing = () => {
  return (
    <GuestLayout>
      <Section className={'md:grid grid-cols-2'} bottom>
        <div className={'md:-mr-14 z-10 flex flex-col justify-center'}>
          <Card>
            <h3 className="h4">Free Forever</h3>
          </Card>
        </div>

        <Card className={'md:!pl-20'}>
          <h3 className="h4">Premium</h3>

          <Button className="w-full">Subscribe</Button>
        </Card>
      </Section>
    </GuestLayout>
  );
}

export default Pricing
