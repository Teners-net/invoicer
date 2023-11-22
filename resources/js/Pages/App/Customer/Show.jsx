import { Inertia } from "@inertiajs/inertia";
import Section from "../../../Components/Section";
import AppLayout from "../../../Layouts/AppLayout";
import Card from "../../../Components/Card";
import Button from "../../../Components/Button";

const ShowCustomer = ({ customer }) => {

  return (
    <AppLayout title={`Customer - ${customer.first_name}`} onBackPress={() => Inertia.visit(route('customers.index'))}>

      <Section bottom className={'grid md:grid-cols-3 gap-6'}>
        <Card>
          <small>Customer Details</small>
          <div className={"space-y-3 mt-1 mb-6"}>
            <div className="grid grid-cols-2">
              <p>
                <small>First Name</small> <br />
                {customer.first_name}
              </p>
              <p>
                <small>Last Name</small> <br />
                {customer.last_name ?? 'Not Set'}
              </p>
            </div>
            <p>
              <small>Email</small> <br />
              {customer.email}
            </p>
            <p>
              <small>Phone</small> <br />
              {customer.phone ?? 'Not Set'}
            </p>
            <p>
              <small>Address</small> <br />
              {customer.address ?? 'Not Set'}
            </p>
          </div>

          <div className="flex gap-4">
            <Button outline>Delete</Button>
            <Button>Edit Customer</Button>
          </div>
        </Card>

        <div>
          <small>Invoice History</small>
          <h3>Coming Soon...</h3>
        </div>
      </Section>

    </AppLayout>
  );
}

export default ShowCustomer
