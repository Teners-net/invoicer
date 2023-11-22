import { Inertia } from "@inertiajs/inertia";
import Button from "../../../Components/Button";
import Card from "../../../Components/Card";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";

const ShowProduct = ({ product }) => {

  return (
    <AppLayout title={`Product - ${product.name}`} onBackPress={() => Inertia.visit(route('products.index'))}>

      <Section bottom className={'grid md:grid-cols-3 gap-6'}>
        <Card>
          <small>Product Details</small>
          <div className={"space-y-3 mt-1 mb-6"}>
            <p>
              <small>Name</small> <br />
              {product.name}
            </p>
            <div className="grid grid-cols-2">
              <p>
                <small>Currency</small> <br />
                {product.currency?.symbol}
              </p>
              <p>
                <small>Price</small> <br />
                {product.price}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p>
                <small>Type</small> <br />
                {product.type}
              </p>
              {product.type == "GOODS" && <p>
                <small>Available Stock</small> <br />
                {product.stock}
              </p>}
            </div>
          </div>

          <div className="flex gap-4">
            <Button outline>Delete</Button>
            <Button>Edit Product</Button>
          </div>
        </Card>

        <div>
          <small>Product Trend</small>
          <h3>Coming Soon...</h3>
        </div>
      </Section>

    </AppLayout>
  );
}

export default ShowProduct
