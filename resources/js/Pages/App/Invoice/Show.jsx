import { Inertia } from "@inertiajs/inertia";
import { Viewer } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { useContext } from "react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import { statusColor } from "../../../Components/InvoiceParts";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import AppContext from "../../../context";
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

  const { setConfirmation } = useContext(AppContext)

  const handleInvoiceActions = (action) => {
    // Check User and Due date
    // Send
    Inertia.post(route('invoices.action', [invoice, action]), {});
  }

  return (
    <AppLayout title={`Invoice - ${invoice.slug}`} onBackPress={() => Inertia.visit(route('invoices.index'))}>

      <Section bottom className={'grid md:grid-cols-3 gap-6 md:gap-12'}>
        <div className="space-y-6">
          <Card>
            <p>Status</p>
            <hr />
            <div className="flex justify-between mt-4">
              <div className="flex gap-2 items-center">
                <div className={`p-1 ${statusColor(invoice).body} border ${statusColor(invoice).border}`}></div>
                <h5>{invoice.status}</h5>
              </div>
              {invoice.status == "Draft" && <Button onClick={()=>handleInvoiceActions('SEND')}>Send Invoice</Button>}
              {(invoice.status == "Pending" || invoice.status == "Sent")&& <Button onClick={()=>handleInvoiceActions('MARK_PAID')}>Confirm Payment Receipt</Button>}
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

          <Card>
            <p>Payment Channels</p>
            <div className="mt-4">
              <p className="text-center p-6">Coming Soon...</p>
            </div>
            <Button isComing>Select Payment Channels</Button>
          </Card>

          <Card className={'flex justify-between'}>
            <Button
              outline
              onClick={() => setConfirmation({
                title: "Delete Invoice?",
                message: "Are you sure you want to delete this Invoice",
                onConfirm: () => {
                  Inertia.delete(route('invoices.destroy', invoice))
                }
              })}>
              Delete
            </Button>
            <Button onClick={() => { Inertia.visit(route('invoices.edit', invoice)) }}>Edit</Button>
            <Button isComing>Duplicate</Button>
          </Card>
        </div>

        <div className="md:col-span-2 border">
          <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
          <Viewer
            fileUrl={invoice.pdf_url}
            plugins={[toolbarPluginInstance]}
          />
        </div>
      </Section>

    </AppLayout>
  );
}

export default ShowInvoice
