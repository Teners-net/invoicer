import { Inertia } from "@inertiajs/inertia";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import { usePage } from "@inertiajs/inertia-react";

const ShowProduct = ({ product }) => {

  const { user } = usePage().props

  return (
    <AppLayout user={user} title={`Product - ${product.name}`} onBackPress={() => Inertia.visit(route('products.index'))}>

      <Section className={'pb-10 md:pb-20'}>
        <h1>Coming Soon...</h1>
      </Section>

    </AppLayout>
  );
}

export default ShowProduct
