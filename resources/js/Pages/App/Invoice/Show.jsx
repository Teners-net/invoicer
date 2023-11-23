import { Inertia } from "@inertiajs/inertia";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";

const ShowInvoice = ({ invoice }) => {

  return (
    <AppLayout title={`Invoice - ${invoice.slug}`} onBackPress={() => Inertia.visit(route('invoices.index'))}>

      <Section className={'pb-10 md:pb-20 grid grid-cols-3'}>
        <Card>
        </Card>

        <div></div>
      </Section>

    </AppLayout>
  );
}

export default ShowInvoice
