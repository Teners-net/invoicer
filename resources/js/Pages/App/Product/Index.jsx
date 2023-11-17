import DataTable from "react-data-table-component";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import Button from "../../../Components/Button";
import { Inertia } from "@inertiajs/inertia";

const Products = ({ products, overview }) => {

  const columns = [
    {
      name: 'PRODUCT NAME',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'PRICE',
      selector: row => 'NGN' + row.price,
      sortable: true,
    },
    {
      name: 'TYPE',
      selector: row => row.type,
      sortable: true,
    },
    {
      name: 'STOCK',
      selector: row => row.type == 'GOODS' ? (row.stock ? row.stock : 'Unlimited') : 'Not Applicable',
      sortable: true,
    },
    {
      name: 'ACCEPT CRYPTO',
      selector: row => row.accept_crypto ? 'Yes' : 'No',
      sortable: true,
    },
    {
      cell: (row, index, column, id) => <div className="flex gap-3">
        <Button className={'!text-xs !py-2 !px-5'} onClick={()=>{Inertia.visit(route('products.show', row))}}>View</Button>
        <Button outline className={'!text-xs !py-2 !px-5'} onClick={()=>{Inertia.visit(route('products.edit', row))}}>Edit</Button>
      </div>
    },
  ];

  const overviews = [
    {
      label: 'All Products',
      value: overview.all,
    },
    {
      label: 'Goods',
      value: overview.goods,
    },
    {
      label: 'Services',
      value: overview.services,
    },
  ]

  return (
    <AppLayout title='Products' onBackPress={()=>Inertia.visit(route('dashboard'))}>

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
        <Button onClick={() => { Inertia.visit(route('products.create')) }}>Add Product</Button>
        <DataTable
          columns={columns}
          data={products}
          highlightOnHover
          pagination
          responsive
        />
      </Section>

    </AppLayout>
  );
}

export default Products
