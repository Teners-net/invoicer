import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Editor } from "@tinymce/tinymce-react";
import { memo, useEffect, useRef, useState } from "react";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import SelectInput from "../../../Components/Form/Select";
import Input from "../../../Components/Form/Input";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import { transformCurrency } from "../../../utis/currency";
import { dateInputFormat } from "../../../utis/date";
import CreateCustomer from "../Customer/Create";
import CreateProduct from "../Product/Create";

const CreateInvoice = ({ invoice, products, customers, base_currency }) => {

  const { currencies, config } = usePage().props
  const [showCreateProduct, setShowCreateProduct] = useState(false)
  const [showCreateCustomer, setShowCreateCustomer] = useState(false)
  const [subTotal, setSubTotal] = useState(0.00)
  const editorRef = useRef(null);

  const emptyProduct = {
    price: 0.00,
    id: null,
    currency: {}
  }

  const [rows, setRows] = useState([
    { row_id: 1, product: emptyProduct, quantity: 1, amount_in_base: 0.00 }
  ])

  const [isProcessing, setIsProcessing] = useState()
  const [errors, setErrors] = useState({})

  const { data, setData, post, patch, processing, errors: err, transform } = useForm({
    customer_id: invoice?.customer_id ?? '',
    discount_type: invoice?.discount_type ?? 'PERCENTAGE',
    discount_value: invoice?.discount_value ?? '',
    due_at: dateInputFormat(invoice?.due_at) ?? '',
    products: invoice?.products ?? [],
    note: invoice?.note ?? '',
  });

  useEffect(() => {
    if (invoice) {
      const newRows = invoice.products.map((product, index) => ({
        row_id: index + 1,
        product: {
          id: product.product_id,
          currency: product.product.currency ?? product.currency,
          currency_id: product.product.currency_id ?? product.currency_id,
          price: product.product.price ?? product.amount,
          name: product.product.name ?? product.name,
        },
        quantity: product.quantity,
        amount_in_base: product.amount_in_base
      }));

      setRows(newRows);
    }
  }, [invoice]);

  useEffect(() => {
    let total = rows.reduce((total_A, row) => {
      const productAmount = row.quantity * transformCurrency(row.product?.price, row.product?.currency, base_currency?.company);
      return total_A + productAmount;
    }, 0).toFixed(2);

    setSubTotal(total)
  }, [rows])

  const handleChange = (e) => {
    setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value)
  }

  const getTotalAmount = () => {
    let value = 0
    if (data.discount_type == 'PERCENTAGE') value = subTotal - ((data.discount_value / 100) * subTotal)
    else value = (subTotal > 0 && subTotal >= data.discount_value) ? (subTotal - data.discount_value) : 0
    return value.toFixed(2)
  }

  const options = {
    onError: e => {
      setErrors(e)
      setIsProcessing(false)
    },
  }

  const submit = (e) => {
    e.preventDefault();

    setIsProcessing(true)

    const newData = {
      ...data,
      products: rows,
      sub_amount: subTotal,
      total_amount: getTotalAmount(),
      note: editorRef?.current?.getContent(),
    }

    // transform((data) => ({
    //   ...data,
    //   products: rows,
    //   sub_amount: subTotal,
    //   total_amount: getTotalAmount(),
    //   note: editorRef?.current?.getContent(),
    // }));

    if (invoice) Inertia.patch(route('invoices.update', invoice), newData, options)
    else Inertia.post(route('invoices.store'), newData, options)
  };

  const addNewRow = () => {
    const lastRowId = rows.length > 0 ? rows[rows.length - 1].row_id : 0;
    const newRow = {
      row_id: lastRowId + 1,
      product: emptyProduct,
      quantity: 1,
      amount_in_base: transformCurrency(emptyProduct?.price, emptyProduct?.currency, base_currency?.company)
    }
    setRows([...rows, newRow]);
  };

  const removeRow = (row_id) => {
    setRows((prevRows) => prevRows.filter((row) => row.row_id !== row_id));
  }

  const Row = memo(({ sn, row }) => {

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

    const handleProductChange = (e) => {
      const selectedProduct = (!e.target.value || e.target.value == "null") ? emptyProduct : products.find((p) => p.id.toString() === e.target.value);

      updateRowProperty(row.row_id, 'product', selectedProduct);
      updateRowProperty(row.row_id, 'amount_in_base', row.quantity * transformCurrency(selectedProduct?.price, selectedProduct?.currency, base_currency?.company))
    }

    const setQuantity = (q, product) => {
      updateRowProperty(row.row_id, 'quantity', q)
      updateRowProperty(row.row_id, 'amount_in_base', q * transformCurrency(product?.price, product?.currency, base_currency?.company))
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
            <option value="null" >Select Product</option>
            {products.map(_ => <option value={_.id} key={_.id}>{_.name}</option>)}
          </SelectInput>
        </td>
        <td>
          <Input
            value={row.quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value, row.product)}
            min={1}
            required
            wrapperStyle={'!p-2'}
          />
        </td>
        <td>{row.product?.currency?.symbol} {row.product.price}</td>
        <td>{row.product?.currency?.symbol} {row.quantity * row.product.price}</td>
        <td>{base_currency?.company.symbol} {row.amount_in_base}</td>
        <td>
          <Button
            className={'bg-red-500 !px-4 !py-2'}
            onClick={() => removeRow(row.row_id)}>
            -
          </Button>
        </td>
      </tr>
    )
  }, (prevProps, nextProps) => {
    return (
      prevProps.sn === nextProps.sn &&
      prevProps.row.product.id === nextProps.row.product.id &&
      prevProps.row.quantity === nextProps.row.quantity
    );
  })

  return (
    <AppLayout title={invoice ? 'Edit Invoice' : 'New Invoice'} onBackPress={() => Inertia.visit(route('invoices.index'))}>

      <Section className={'pb-10 md:pb-20'}>
        <Card>
          <form onSubmit={submit} className="p-3 md:p-6 space-y-6 md:space-y-12">
            <div className="grid md:grid-cols-2 gap-5 md:gap-10">
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <SelectInput
                    label="Customer"
                    name="customer_id"
                    value={data.customer_id}
                    error={errors.customer_id}
                    onChange={handleChange}
                  >
                    <option value="" disabled></option>
                    {customers.map(_ => <option value={_.id} key={_.id}>{_.first_name} {_.last_name}</option>)}
                  </SelectInput>
                  <Button
                    outline
                    onClick={() => setShowCreateCustomer(true)}>
                    Create New Custoner
                  </Button>
                </div>

                <Input
                  label="Due Date"
                  name="due_at"
                  type="date"
                  value={data.due_at}
                  error={errors.due_at}
                  onChange={handleChange}
                />
              </div>

              <div></div>
            </div>

            <div>
              <p>Products</p>
              <div className="overflow-x-auto pb-3">
                <table className="min-w-full divide-gray-200 bg-white text-sm text-left table-auto">
                  <thead className="border">
                    <tr className="divide-x">
                      <th className="!w-[50px]">SN</th>
                      <th>PRODUCT</th>
                      <th className="!w-[150px]">QUANTITY</th>
                      <th className="!w-[150px]">RATE</th>
                      <th className="!w-[150px]">AMOUNT</th>
                      <th className="!w-[150px]">IN BASE CURRENCY</th>
                      <th className="!w-[50px]"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, index) => <Row key={index} sn={index + 1} row={row} />)}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-4 flex-wrap-reverse">
                <Button
                  outline
                  onClick={() => setShowCreateProduct(true)}
                  className={'!py-3'}>
                  Create New Product
                </Button>

                <Button
                  onClick={addNewRow}
                  className={'!py-3'}>
                  New Row
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-10">
              <div>
                <label htmlFor="note" className='p'>{"Add Note"}</label>
                <Editor
                  initialValue={data.note}
                  apiKey={config.tiny_mce}
                  textareaName='note'
                  init={{
                    height: 300,
                  }}
                  onInit={(evt, editor) => editorRef.current = editor}
                />
              </div>

              <div className="space-y-3 md:space-y-6">
                <Input
                  label="Sub Total"
                  prepend={<span className="pr-1 ">{base_currency?.company.symbol}</span>}
                  value={subTotal}
                  readOnly
                />

                <Input
                  value={data.discount_value}
                  type="number"
                  onChange={handleChange}
                  wrapperStyle={'!py-0'}
                  label="Discount"
                  name='discount_value'
                  max={data.discount_type == 'PERCENTAGE' ? 100 : subTotal}
                  step={0.01}
                  postpend={
                    <SelectInput
                      wrapperStyle={'!border-none !mt-0'}
                      value={data.discount_type}
                      name='discount_type'
                      onChange={handleChange}
                      error={errors.discount_type}>
                      <option value="PERCENTAGE">Percentage </option>
                      <option value="FIXED">Fixed</option>
                    </SelectInput>
                  }
                />

                <Input
                  label="Total"
                  prepend={<span className="pr-1 ">{base_currency?.company.symbol}</span>}
                  value={getTotalAmount()}
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={isProcessing}>
                {invoice ? 'Update and Proceed' : 'Save and Proceed'}
              </Button>
            </div>
          </form>
        </Card>
      </Section>

      <CreateProduct
        currencies={currencies}
        show={showCreateProduct}
        setShow={setShowCreateProduct}
      />

      <CreateCustomer
        show={showCreateCustomer}
        setShow={setShowCreateCustomer}
      />

    </AppLayout>
  );
}

export default CreateInvoice
