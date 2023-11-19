import { usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import PaymentChannel from "../../../Components/Modals/PaymentChannel";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";

const Company = ({ company }) => {

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
    <AppLayout title='Company Setup'>

      <Section className={'grid md:grid-cols-3 gap-4'}>
        <Card className={'col-span-2'}>
          <div className=" grid grid-cols-2 mb-4">
            <div>
              <small>Company Name</small>
              <p className="mb-4">{company.name}</p>

              <small>RC Number</small>
              <p className="mb-4">{company.rc_number ?? 'Not Set'}</p>

              <small>Company Website</small>
              <p className="mb-4">{company.website ?? 'Not Set'}</p>

              <small>Address</small>
              <p className="mb-4">{company.address ?? 'Not Set'}</p>

              <small>Contact</small>
              <p>{company.contact_email ?? 'Email Not Set'}</p>
              <p>{company.contact_number ?? 'Phone Not Set'}</p>
            </div>

            <div>
              <small className="underline">Branding</small>
              <img src={company.logo_url} alt={company.name} className="max-h-32 md:max-h-40 object-contain border my-4 p-2" />

              <small>Primary</small>
              <div className="flex gap-2 items-center mb-4">
                <div className="h-6 w-6" style={{ backgroundColor: company.primary_color }}></div>
                <p>{company.primary_color}</p>
              </div>

              <small>Secondary</small>
              <div className="flex gap-2 items-center">
                <div className="h-6 w-6" style={{ backgroundColor: company.secondary_color }}></div>
                <p>{company.secondary_color}</p>
              </div>
            </div>
          </div>

          <Button>Edit Company</Button>
        </Card>

        {/* <div>
          <small>Preview</small>
          <Card></Card>
        </div> */}
      </Section>

      <Section>
        <Card>
          <h3>Payment Channels</h3>
          <p className="mb-4">Setup how you accept payments</p>
          {company.payment_channels?.length ? NewChannelButton : ''}
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {company.payment_channels?.map(c => <Channel key={c.id} channel={c} />)}
          </div>
          {!company.payment_channels?.length &&
            <div className="text-center border p-4 md:p-8 gap-4 flex flex-col items-center">
              <p>You have not added any payment channels</p>
              {NewChannelButton}
            </div>}
        </Card>
      </Section>

      <PaymentChannel
        show={openChannelModal}
        setClose={() => {
          setToEdit(null)
          setOpenChannelModal(false)
        }}
        currencies={currencies}
        channel={toEdit}
      />
    </AppLayout>
  );
}

export default Company
