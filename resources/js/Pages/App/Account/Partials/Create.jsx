import Card from "../../../../Components/Card";
import Section from "../../../../Components/Section";
import AppLayout from "../../../../Layouts/AppLayout";
import BasicDetails from "../Forms/Basics";

const Create = () => {
  return (
    <AppLayout title='Company Setup'>

      <Section className={'pb-10 md:pb-20'}>
        <Card >
          <BasicDetails />
        </Card>
      </Section>

    </AppLayout>
  );
}

export default Create
