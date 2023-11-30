import { usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Button from "../../../../Components/Button";
import Card from "../../../../Components/Card";
import PaymentChannel from "../../../../Components/Modals/PaymentChannel";
import Section from "../../../../Components/Section";
import AppLayout from "../../../../Layouts/AppLayout";
import AccountLayout from "../Layout";

const PaymentChannels = ({ paymentChannels }) => {

  const { currencies } = usePage().props
  const [toEdit, setToEdit] = useState(null)
  const [openChannelModal, setOpenChannelModal] = useState(false)

  useEffect(() => {
    toEdit ? setOpenChannelModal(true) : setOpenChannelModal(false)
  }, [toEdit])

  const Channel = ({ channel }) => (
    <button onClick={() => setToEdit(channel)}>
      <Card flat className={`text-start grid grid-cols-2`}>
        <div>
          <small>Bank Name</small>
          <p className="mb-2">{channel.bank_name}</p>

          <small>Account Number</small>
          <p>{channel.account_number}</p>
        </div>

        <div>
          <small>Account Name</small>
          <p className="mb-2">{channel.account_name}</p>

          <small>Currency</small>
          <p>{channel.currency?.name} ({channel.currency?.symbol})</p>
        </div>
      </Card>
    </button>
  );

  const NewChannelButton = <Button onClick={() => setOpenChannelModal(true)}>Add Payment Channel</Button>

  return (
    <AccountLayout page="Payment Channels">
      <Card>
        <h3>Payment Channels</h3>
        <p className="mb-4">Setup how you accept payments</p>
        {paymentChannels?.length ? NewChannelButton : ''}
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {paymentChannels?.map(c => <Channel key={c.id} channel={c} />)}
        </div>
        {!paymentChannels?.length &&
          <div className="text-center border p-4 md:p-8 gap-4 flex flex-col items-center">
            <p>You have not added any payment channels</p>
            {NewChannelButton}
          </div>}
      </Card>

      <PaymentChannel
        show={openChannelModal}
        setClose={() => {
          setToEdit(null)
          setOpenChannelModal(false)
        }}
        currencies={currencies}
        channel={toEdit}
      />
    </AccountLayout >
  );
}

export default PaymentChannels
