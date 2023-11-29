import { Inertia } from "@inertiajs/inertia";
import DataTable from "react-data-table-component";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import { formatDate } from "../../../utis/date";
import { statusColor } from "../../../Components/Partials";

const Invoices = ({ invoices, overview }) => {

  const overviews = [
    {
      label: 'All Invoices',
      value: overview.all,
    },
    {
      label: 'Paid',
      value: overview.paid,
    },
    {
      label: 'Unpaid',
      value: overview.unpaid,
    },
    {
      label: 'Overdue',
      value: overview.overdue,
    },
    {
      label: 'Drafts',
      value: overview.draft,
    },
  ]

  const columns = [
    // {
    //   cell: (row, index, column, id) => index + 1
    // },
    {
      name: "INVOICE NUMBER",
      selector: row => row.slug,
      sortable: true,
    },
    {
      name: "CUSTOMER'S NAME",
      selector: row => row.customer?.full_name,
      sortable: true,
    },
    {
      name: 'AMOUNT',
      selector: row => row.currency?.symbol + " " + row.total_amount,
      sortable: true,
    },
    {
      name: 'STATUS',
      selector: row => <p className={`${statusColor(row).text} py-1 px-2 ${statusColor(row).body} `}>{row.status}</p>,
      sortable: true,
    },
    {
      name: 'DUE DATE',
      selector: row => formatDate(row.due_at, 0, true),
      sortable: true,
    },
    {
      cell: (row, index, column, id) => <div className="flex gap-3">
        <Button className={'!text-xs !py-2 !px-5'} onClick={() => { Inertia.visit(route('invoices.show', row)) }}>View</Button>
        <Button outline className={'!text-xs !py-2 !px-5'} onClick={() => { Inertia.visit(route('invoices.edit', row)) }}>Edit</Button>
      </div>
    }
  ]

  return (
    <AppLayout title='Invoices' onBackPress={() => Inertia.visit(route('dashboard'))}>

      <div className="bg-black-gradient">
        <Section className={'!pt-1'}>
          <h2 className='h4 !font-light'>Overview</h2>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
            {overviews.map(_ =>
              <Card key={_.label}>
                <h3 className="h1 !mb-1">{_.value}</h3>
                <p>{_.label}</p>
              </Card>
            )}
          </div>
        </Section>
      </div>

      <Section bottom className={'space-y-4'}>
        <Button onClick={() => { Inertia.visit(route('invoices.create')) }}>New Invoice</Button>
        <DataTable
          columns={columns}
          data={invoices}
          highlightOnHover
          pagination
          responsive
        />
      </Section>

    </AppLayout>
  );
}

export default Invoices
