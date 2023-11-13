import { Head } from '@inertiajs/inertia-react';
import Section from '../Components/Section';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const AppLayout = ({ children, title }) => {

  return (
    <div className="min-h-screen">
      <Head title={title} />

      <Header />

      <main className='min-h-[75vh]'>

        <div className="bg-black">
          <Section className={'!pb-1 text-gray-50'}>
            <h1 className='h3'>{title}</h1>
          </Section>
        </div>

        {children}

      </main>

      <Footer />
    </div>
  );
}

export default AppLayout
