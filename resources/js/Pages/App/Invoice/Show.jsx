import { Inertia } from "@inertiajs/inertia";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Button from "../../../Components/Button";
import { formatDate } from "../../../utis/date";

const ShowInvoice = ({ invoice }) => {

  const Boxed = ({ children, className, ...rest }) => <div className={`p-4 bg-gray-50 dark:bg-gray-950 border ${className}`} {...rest}>{children}</div>
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
  const transform = (slot) => ({
    ...slot,
    Open: () => <></>,
    PrintMenuItem: () => <></>,

    Print: () => <></>,
    PrintMenuItem: () => <></>,

    Zoom: () => <></>,

    Search: () => <></>,
    ShowSearchPopover: () => <></>,

    SwitchTheme: () => <></>,
    SwitchThemeMenuItem: () => <></>,

    SwitchViewMode: () => <></>,
    SwitchViewModeMenuItem: () => <></>,
  });

  const statusColor = () => {
    const define = {
      'Draft': {
        body: 'bg-gray-300',
        border: 'border-gray-600',
      },
      'Sent': {
        body: 'bg-blue-300',
        border: 'border-blue-600',
      },
      'Pending': {
        body: 'bg-yellow-300',
        border: 'border-yellow-600',
      },
      'Paid': {
        body: 'bg-green-300',
        border: 'border-green-600',
      },
    };

    return define[invoice.status];
  };

  return (
    <AppLayout title={`Invoice - ${invoice.slug}`} onBackPress={() => Inertia.visit(route('invoices.index'))}>

      <Section bottom className={'grid md:grid-cols-3 gap-6 md:gap-12'}>
        <div className="space-y-6">
          <Card>
            <p>Invoice Status</p>
            <div className="flex gap-2 items-center">
              <div className={`p-1 ${statusColor().body} border ${statusColor().border}`}></div>
              <h5>{invoice.status}</h5>
            </div>
          </Card>

          <Card className={"space-y-3 md:space-y-6"}>
            <div>
              <p>To:</p>
              <Boxed>
                {invoice.customer ?
                  <>
                    <p>{invoice.customer?.full_name}</p>
                    <p>{invoice.customer?.email}</p>
                    <p>{invoice.customer?.phone}</p>
                    <p>{invoice.customer?.address}</p>
                  </> :
                  <p className="p-3 text-center">You have not selected the customer</p>
                }
              </Boxed>
            </div>

            <div>
              <p>Due On:</p>
              <Boxed>
                {invoice.due_at ? <p>{formatDate(invoice.due_at, 0, true)}</p> : <p className="text-center">You have not set the due date</p>}
              </Boxed>
            </div>

            <div>
              <p>Invoice Amount (Base Currency):</p>
              <Boxed className={'p'}>{invoice.currency?.symbol} {invoice.total_amount}</Boxed>
            </div>
          </Card>

          <Card className={'flex justify-between'}>
            {invoice.status === 'Draft' && <Button >Delete</Button>}
            <Button onClick={() => { Inertia.visit(route('invoices.edit', invoice)) }}>Edit</Button>
            <Button>Duplicate</Button>
          </Card>

          <Card className={'flex justify-between'}>
            Accepted Payment Channels
            <div></div>
          </Card>
        </div>

        <div className="md:col-span-2 border">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
            <Viewer
              fileUrl={invoice.pdf_url}
              plugins={[toolbarPluginInstance]} />
          </Worker>
        </div>
      </Section>

    </AppLayout>
  );
}

export default ShowInvoice
