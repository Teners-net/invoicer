import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Section from "../Components/Section";
import AppLayout from "../Layouts/AppLayout";

const WelcomePage = ({ user }) => {
  return (
    <>
      <Header />

      <Section>
        <div className="">Home</div>
      </Section>

      <Footer />
    </>
  );
}

export default WelcomePage