import { usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Button from "../../../../Components/Button";
import Card from "../../../../Components/Card";
import PaymentChannel from "../../../../Components/Modals/PaymentChannel";
import { Channel } from "../../../../Components/Partials";
import AccountLayout from "../Layout";

const PaymentChannels = ({ paymentChannels }) => {

  const { currencies } = usePage().props
  const [toEdit, setToEdit] = useState(null)
  const [openChannelModal, setOpenChannelModal] = useState(false)

  useEffect(() => {
    toEdit ? setOpenChannelModal(true) : setOpenChannelModal(false)
  }, [toEdit])

  const NewChannelButton = <Button onClick={() => setOpenChannelModal(true)}>Add Payment Channel</Button>

  return (
    <AccountLayout page="Payment Channels">
      <Card>
        <h3>Payment Channels</h3>
        <p className="mb-4">Setup how you accept payments</p>
        {paymentChannels?.length ? NewChannelButton : ''}
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {paymentChannels?.map(c => <button key={c.id} onClick={() => setToEdit(c)}> <Channel channel={c} /> </button>)}
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
