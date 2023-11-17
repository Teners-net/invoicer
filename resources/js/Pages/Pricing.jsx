import Button from "../Components/Button";
import Card from "../Components/Card";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Section from "../Components/Section";
import AppLayout from "../Layouts/AppLayout";

const WelcomePage = ({ user }) => {
  return (
    <>
      <Header />
      <Section className={'pb-10 md:pb-20'}>
        <h1>Coming Soon...</h1>
      </Section>
      <Footer />
    </>
  );
}

export default WelcomePage
