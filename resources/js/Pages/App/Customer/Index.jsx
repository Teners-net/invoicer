import DataTable from "react-data-table-component";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import Button from "../../../Components/Button";
import { Inertia } from "@inertiajs/inertia";

const Customers = ({ customers, overview }) => {

  const overviews = [
    {
      label: 'All Users',
      value: overview.all,
    }
  ]

  const columns = [
    {
      name: "CUSTOMER'S NAME",
      selector: row => row.first_name + ' ' + row.last_name,
      sortable: true,
    },
    {
      name: 'EMAIL',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'PHONE',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'ADDRESS',
      selector: row => row.address,
      sortable: true,
    },
    {
      cell: (row, index, column, id) => <div className="flex gap-3">
        <Button className={'!text-xs !py-2 !px-5'} onClick={() => { Inertia.visit(route('customers.show', row)) }}>View</Button>
        <Button outline className={'!text-xs !py-2 !px-5'} onClick={() => { Inertia.visit(route('customers.edit', row)) }}>Edit</Button>
      </div>
    },
  ];

  return (
    <AppLayout title='Customers' onBackPress={() => Inertia.visit(route('dashboard'))}>

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
        <Button onClick={() => { Inertia.visit(route('customers.create')) }}>Add Customer</Button>
        <DataTable
          columns={columns}
          data={customers}
          highlightOnHover
          pagination
          responsive
        />
      </Section>

    </AppLayout>
  );
}

export default Customers
