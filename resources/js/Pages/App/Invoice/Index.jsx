import DataTable from "react-data-table-component";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import Button from "../../../Components/Button";
import { Inertia } from "@inertiajs/inertia";

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
  ]

  const columns = [
    {
      name: "INVOICE NUMBER",
      selector: row => row.slug,
      sortable: true,
    },
    {
      name: "CUSTOMER'S NAME",
      selector: row => row.customer?.name,
      sortable: true,
    },
    {
      name: 'AMOUNT',
      selector: row => row.total_amount,
      sortable: true,
    },
    {
      name: 'DUE DATE',
      selector: row => row.due_at,
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

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
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
