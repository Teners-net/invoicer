import { Head } from '@inertiajs/inertia-react';
import Section from '../Components/Section';

const CustomerLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Head title={title} />

      <main className='flex-1'>
        {children}
      </main>

      <footer>
        <Section className={"flex justify-center py-6 "}>
          <p>Powered <a href={route('dashboard')} className="underline p">Invoicer</a>. Create your free invoice now</p>
        </Section>
      </footer>
    </div>
  );
}

export default CustomerLayout
