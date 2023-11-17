import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import TextInput from "../../../Components/Form/TextInput";
import SecondaryInput from "../../../Components/Form/SecondaryInput";

const InvoicePaymentMethod = ({ invoice, payment_channels }) => {

  const { data, setData, patch, processing, errors, reset } = useForm({
    customer_id: invoice?.customer_id ?? '',
    due_at: invoice?.due_at ?? '',
    total_amount: 0.00,
    draft: true,
    is_recuring: false,
    accept_fiat: true,
    accept_crypto: false,
    payment_channels: []
  });

  const submit = async (e) => {
    e.preventDefault();

    patch(route('invoices.setup', invoice))
  };

  const Channel = ({ }) => {
    return (<Card className="border bg-transparent"></Card>)
  }

  return (
    <AppLayout title={'Invoice Payment Setup'} onBackPress={() => Inertia.visit(route('invoices.edit', invoice))}>

      <Section className={'pb-10 md:pb-20'}>
        <Card>
          <form onSubmit={submit} className="p-3 md:p-6">
            {/* Summary */}

            {/*  */}
            <div className="pb-2">
              <h5>Invoice Summary</h5>
            </div>

            <div className="pb-2">
              <h5>Payment Channel</h5>
              <div className="grid grid-cols-4">
                {payment_channels?.map(c => <Channel key={c.id} />)}
                {/* {payment_channels?.length() < 1 && } */}
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <Button
                type="submit"
                outline
                onClick={() => setData('draft', true)}
                isLoading={processing}>
                Save Draft
              </Button>

              <Button
                type="submit"
                onClick={() => setData('draft', false)}
                isLoading={processing}>
                Send Invoice
              </Button>
            </div>

          </form>
        </Card>
      </Section>

    </AppLayout>
  );
}

export default InvoicePaymentMethod
