import { Inertia } from "@inertiajs/inertia";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import { usePage } from "@inertiajs/inertia-react";

const ShowInvoice = ({ invoice }) => {

  const { user } = usePage().props

  return (
    <AppLayout user={user} title={`Invoice - ${invoice.slug}`} onBackPress={() => Inertia.visit(route('invoices.index'))}>

      <Section className={'pb-10 md:pb-20'}>
        <h1>Coming Soon...</h1>
      </Section>

    </AppLayout>
  );
}

export default ShowInvoice
