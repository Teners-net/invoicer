import Card from "../../Components/Card";
import Section from "../../Components/Section";
import AppLayout from "../../Layouts/AppLayout";

const Customers = ({ }) => {
    return (
        <AppLayout title='Customers'>

            <div className="bg-black-gradient">
                <Section className={'!pt-1'}>
                    <h2 className='h4 !font-light'>Overview</h2>

                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                        {[1, 2, 3, 4].map(_ => <Card></Card>)}
                    </div>
                </Section>
            </div>

        </AppLayout>
    );
}

export default Customers