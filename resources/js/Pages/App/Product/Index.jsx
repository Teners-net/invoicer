import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import CreateProduct from "./Create";

const Products = ({ products, overview, currencies }) => {

  const [productToEdit, setProductToEdit] = useState(null)
  const [showCreateProduct, setShowCreateProduct] = useState(false)

  useEffect(() => {
    if (productToEdit) setShowCreateProduct(true)
  }, [productToEdit])

  const columns = [
    {
      name: 'PRODUCT NAME',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'PRICE',
      selector: row => row.currency.symbol + ' ' + row.price,
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
      cell: (row, index, column, id) => <div className="flex gap-3">
        <Button className={'!text-xs !py-2 !px-5'} onClick={() => { Inertia.visit(route('products.show', row)) }}>View</Button>
        <Button outline className={'!text-xs !py-2 !px-5'} onClick={() => setProductToEdit(row)}>Edit</Button>
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

  const { user } = usePage().props

  return (
    <AppLayout user={user} title='Products' onBackPress={() => Inertia.visit(route('dashboard'))}>

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
        <Button onClick={() => setShowCreateProduct(true)}>Add Product</Button>
        <DataTable
          columns={columns}
          data={products}
          highlightOnHover
          pagination
          responsive
        />
      </Section>

      <CreateProduct
        currencies={currencies}
        show={showCreateProduct}
        setShow={setShowCreateProduct}
        product={productToEdit}
        setProduct={setProductToEdit}
      />

    </AppLayout>
  );
}

export default Products
