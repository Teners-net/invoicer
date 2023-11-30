import Card from "../../../Components/Card";
import { Share } from "../../../Components/Partials";
import Section from "../../../Components/Section";
import CustomerLayout from "../../../Layouts/CustomerLayout";

const StoreFront = ({ company, products }) => {

  const shareLinkInBio = {
    title: "Check out my products catalogue",
    url: route('store.index', company.slug)
  }

  return (
    <CustomerLayout title={company.name}>
      <div className="bg-black-gradient">
        <Section>
          <Card className="inline-block">
            <img src={company.logo_url} alt={company.name} className="max-w-sm max-h-40" />
            <p className="mt-4">Share</p>
            <Share shareLinkInBio={shareLinkInBio} />
          </Card>
        </Section>
      </div>

      <Section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {products.length < 1 && <div className="p md:col-span-4 text-center">No products available</div>}
        {products?.map(product => {
          return (
            <Card>
              <h6>{product.name}</h6>
              <p className="my-2 font-bold">{product.currency.symbol} {product.price}</p>
              <p
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </Card>
          )
        })}
      </Section>
    </CustomerLayout>
  )
}

export default StoreFront