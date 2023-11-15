import { Inertia } from "@inertiajs/inertia";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";

const ShowProduct = ({ product }) => {

  return (
    <AppLayout title={`Product - ${product.name}`} onBackPress={() => Inertia.visit(route('products.index'))}>

      <Section className={'pb-10 md:pb-20'}>
      </Section>

    </AppLayout>
  );
}

export default ShowProduct
