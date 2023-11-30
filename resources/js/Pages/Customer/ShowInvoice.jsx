import { Inertia } from "@inertiajs/inertia";
import { Viewer } from "@react-pdf-viewer/core";
import Button from "../../Components/Button";
import Card from "../../Components/Card";
import { Channel, statusColor } from "../../Components/Partials";
import Section from "../../Components/Section";
import CustomerLayout from "../../Layouts/CustomerLayout";

const ShowInvoice = ({ invoice }) => {
  return (
    <CustomerLayout>
      <Section bottom className={'grid md:grid-cols-3 gap-6'}>

        <div className="md:col-span-2 border">
          <Viewer
            fileUrl={invoice.pdf_url}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <p>Invoice Status</p>
            <div className="flex gap-2 items-center">
              <div className={`p-1 ${statusColor(invoice).body} border ${statusColor(invoice).border}`}></div>
              <h5>{invoice.status === "Paid" ? "Paid" : "Pending"}</h5>
            </div>
          </Card>

          <Card >
            <p>Payment Channels</p>
            <small>Pay through any of the following channels</small>
            <div className="mt-4 grid gap-2">
              {invoice?.allowed_channels.map(channel => <Channel channel={channel} transform={{
                amount: invoice?.total_amount,
                from: invoice?.currency
              }} />)}
            </div>
          </Card>

          {!invoice.customer_marked_paid_at && <Button className={'w-full '} onClick={() => Inertia.put(route('invoice.update', invoice), {})}>I have made this payment</Button>}
        </div>
      </Section>
    </CustomerLayout>
  );
}

export default ShowInvoice
