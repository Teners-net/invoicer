import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import SelectInput from "../../../Components/Form/Select";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";

const InvoicePaymentMethod = ({ invoice, payment_channels }) => {

  const { data, setData, patch, processing, errors, reset } = useForm({
    draft: true,
    is_recuring: false,
    payment_channels: null
  });

  const submit = async (e) => {
    e.preventDefault();
    patch(route('invoices.setup', invoice))
  };

  const [selectedChannel, setSelectedChannel] = useState([])

  const handleChannelSelected = (selected) => {
    const isSelected = selectedChannel.includes(selected.id);

    isSelected ?
      setSelectedChannel((prev) => prev.filter((channel_id) => channel_id !== selected.id)) :
      setSelectedChannel((prev) => [...prev, selected.id])
  }

  useEffect(()=>{
    setData('payment_channels', selectedChannel)
  }, [selectedChannel])

  const calculateTotalAmountForChannel = (channel) => {
    let amnt_platform = invoice.total_amount / invoice.currency?.base_rate

    return (amnt_platform * channel.currency?.base_rate).toFixed(2)
  }

  const Channel = ({ channel }) => (
    <button type="button" onClick={() => handleChannelSelected(channel)}>
      <Card className={`border ${selectedChannel.includes(channel.id) && '!bg-gray-50'} shadow-none relative text-start hover:bg-slate-200 grid grid-cols-2 space-y-2`}>
        <div>
          <small>Bank Name</small>
          <p>{channel.bank_name}</p>
        </div>
        <div>
          <small>Account Number</small>
          <p>{channel.account_number}</p>
        </div>
        <div>
          <small>Account Name</small>
          <p>{channel.account_name}</p>
        </div>
        <div>
          <small>Currency</small>
          <p>{channel.currency?.name} ({channel.currency?.symbol})</p>
        </div>

        <div className="col-span-2">
          <small>Amount</small>
          <p>{invoice.currency?.symbol} {invoice.total_amount} {'==>'} {channel.currency?.symbol} {calculateTotalAmountForChannel(channel)}</p>
        </div>

        {selectedChannel.includes(channel.id) && (
          <div className="bg-gray-50 border p-2 absolute top-3 right-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-2 h-2">
              <title>check-bold</title>
              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
            </svg>
          </div>
        )}
      </Card>
    </button>
  );

  const handleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value)
  }

  return (
    <AppLayout title={'Invoice Payment Setup'} onBackPress={() => Inertia.visit(route('invoices.edit', invoice))}>

      <Section className={'pb-10 md:pb-20'}>
        <Card>
          <form onSubmit={submit} className="p-3 md:p-6">

            <div className="pb-12 grid gap-4 md:grid-cols-3">
              <div>
                <p>To:</p>
                <Card flat className={' !bg-gray-50 mt-1 mb-6 md:p-4'}>
                  <p>{invoice.customer.full_name}</p>
                  <p>{invoice.customer.email}</p>
                  <p>{invoice.customer.phone}</p>
                  <p>{invoice.customer.address}</p>
                </Card>

                <p>Due On:</p>
                <p className="mt-1 mb-6 p-4 bg-gray-50 dark:bg-gray-950 border ">{invoice.due_at}</p>

                <p>Invoice Amount (Base Currency):</p>
                <p className="mt-1 p-4 bg-gray-50 dark:bg-gray-950 border ">{invoice.currency?.symbol} {invoice.total_amount}</p>
              </div>

              <div></div>

              <div>
                <SelectInput
                  type="checkbox"
                  label={"Recurring Invoice"}
                  required
                  value={data.is_recuring}
                  name={"is_recuring"}
                  error={errors.is_recuring}
                  onChange={handleChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </SelectInput>

              </div>
            </div>

            <div className="pb-12">
              <h5 className="mb-1">Payment Channel</h5>
              {(errors.payment_channels) && <small className="text-red-500">{errors.payment_channels}</small>}
              <div className="grid md:grid-cols-3 gap-4">
                {payment_channels?.map(c => <Channel key={c.id} channel={c} />)}
              </div>
              {
                (!payment_channels || payment_channels?.length < 1) &&
                <div className="text-center border p-4 md:p-8 gap-4 flex flex-col items-center">
                  <p>You have not added any payment channels</p>
                  <Button>Add Payment Channel</Button>
                </div>
              }
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
