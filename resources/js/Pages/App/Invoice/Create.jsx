import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import TextInput from "../../../Components/Form/TextInput";
import SelectInput from "../../../Components/Form/Select";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import { useEffect, useState } from "react";

const CreateInvoice = ({ invoice, products, customers, base_currency }) => {
  // TODO: load products from API for performance

  const emptyProduct = {
    price: 0.00,
    id: null,
    currency: {}
  }

  const [rows, setRows] = useState([
    { row_id: 1, product: emptyProduct, quantity: 1 }
  ]);

  const { data, setData, post, patch, processing, errors, reset } = useForm({
    customer_id: invoice?.customer_id ?? '',
    due_at: invoice?.due_at ?? '',
    total_amount: 0.00,
    draft: true,
    products: [],
    note: '',
    is_recuring: false,
  });

  const addNewRow = () => {
    const lastRowId = rows.length > 0 ? rows[rows.length - 1].row_id : 0;
    const newRow = { row_id: lastRowId + 1, product: emptyProduct, quantity: 1 }
    setRows([...rows, newRow]);
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    rows.forEach((row) => {
      totalAmount += row.quantity * row.product.price;
    });

    return (totalAmount.toFixed(2) * base_currency?.base_rate).toFixed(2);
  };

  useEffect(() => {
    setData('products', rows)
  }, [rows])

  const onHandleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value)
  }

  const submit = async (e) => {
    e.preventDefault();

    setData('total_amount', calculateTotalAmount());
    await new Promise((resolve) => setTimeout(resolve, 1200));
    invoice ? patch(route('invoices.update', invoice)) : post(route('invoices.store'))
  };

  const updateRowProperty = (row_id, property, value) => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (row.row_id === row_id) {
          return {
            ...row,
            [property]: value,
          };
        }
        return row;
      })
    })
  };

  const Row = ({ sn, row }) => {

    const handleProductChange = (e) => {
      if (!e.target.value) {
        updateRowProperty(row.row_id, 'product', emptyProduct)
        return;
      }

      const selectedProduct = products.find((p) => p.id.toString() === e.target.value);
      updateRowProperty(row.row_id, 'product', selectedProduct);
    }

    const setQuantity = (q) => updateRowProperty(row.row_id, 'quantity', q)

    const removeRow = (row_id) => {
      setRows((prevRows) => {
        return prevRows.filter((row) => row.row_id !== row_id);
      });
    }

    return (
      <tr className="border divide-y divide-x divide-gray-200">
        <td>{sn}</td>
        <td>
          <SelectInput
            wrapperStyle={'!p-2'}
            value={row.product?.id ?? ''}
            onChange={handleProductChange}
            error={errors && errors[`products.${sn - 1}.product.id`]}
            inputStyle={'!w-fit'}>
            <option value="null" ></option>
            {products.map(_ => <option value={_.id} key={_.id}>{_.name}</option>)}
          </SelectInput>
        </td>
        <td>
          <TextInput
            value={row.quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            min={1}
            required
            wrapperStyle={'!p-2'}
          />
        </td>
        <td>{row.product.price.toFixed(2)}</td>
        <td>{row.product?.currency?.symbol} {(row.quantity * row.product.price).toFixed(2)}</td>
        <td>{base_currency?.symbol} {((row.quantity * row.product.price).toFixed(2) * base_currency?.base_rate).toFixed(2)}</td>
        <td>
          <Button
            className={'bg-red-500 !px-4 !py-2'}
            onClick={() => removeRow(row.row_id)}>
            -
          </Button>
        </td>
      </tr>
    )
  }

  return (
    <AppLayout title={invoice ? 'Edit Invoice' : 'New Invoice'} onBackPress={() => Inertia.visit(route('invoices.index'))}>

      <Section className={'pb-10 md:pb-20'}>
        <Card>
          <form onSubmit={submit} className="p-3 md:p-6">

            <div className="grid md:grid-cols-3">
              <div className="py-2 md:pt-12 md:pb-12 md:pr-12 space-y-4 md:space-y-6 col-span-2">
                <SelectInput
                  label="Customer"
                  name="customer_id"
                  value={data.customer_id}
                  error={errors.customer_id}
                  onChange={onHandleChange}
                >
                  <option value="" disabled></option>
                  {customers.map(_ => <option value={_.id} key={_.id}>{_.first_name} {_.last_name}</option>)}
                </SelectInput>

                <TextInput
                  label="Due Date"
                  name="due_at"
                  type="date"
                  value={data.due_at}
                  error={errors.due_at}
                  onChange={onHandleChange}
                />
              </div>
            </div>

            <div className="pb-2">
              <h5>Products</h5>
              <div className="overflow-x-auto pb-3">
                <table className="min-w-full divide-gray-200 bg-white text-sm text-left table-auto">
                  <thead className="border">
                    <tr className="divide-x">
                      <th className="!w-[50px]">SN</th>
                      <th>PRODUCT</th>
                      <th className="!w-[150px]">QUANTITY</th>
                      <th className="!w-[150px]">RATE</th>
                      <th className="!w-[150px]">AMOUNT</th>
                      <th className="!w-[150px]">AMOUNT IN BASE CURRENCY</th>
                      <th className="!w-[50px]"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, index) => (
                      <Row key={index} sn={index + 1} row={row} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap-reverse">
              <Button
                outline
                className={'!py-3'}>
                Create New Product
              </Button>
              <Button
                onClick={addNewRow}
                className={'!py-3'}>
                New Row
              </Button>
            </div>

            <div className="grid md:grid-cols-2">
              <div className="py-2 md:pt-12 md:pb-12 md:pr-12 space-y-4 md:space-y-6">
                <TextInput
                  label="Add Note"
                  value={data.note}
                  name={'note'}
                  placeholder='notes'
                  onChange={onHandleChange}
                  textarea
                  rows={4}
                />
              </div>

              <div className="py-2 md:pt-12 md:pb-12 md:pr-12 space-y-4 md:space-y-6">
                <TextInput
                  label="Total"
                  value={base_currency?.symbol + ' ' + calculateTotalAmount()}
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <Button
                type="submit"
                outline
                onClick={() => setData('draft', true)}
                isLoading={processing}>
                Save Draft
              </Button>

              {data.customer_id && <Button
                type="submit"
                onClick={() => setData('draft', false)}
                isLoading={processing}>
                {invoice ? 'Update and Proceed' : 'Save and Proceed'}
              </Button>}
            </div>

          </form>
        </Card>
      </Section>

    </AppLayout>
  );
}

export default CreateInvoice