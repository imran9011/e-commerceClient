import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function ProductsPage({ products }) {
  return (
    <div>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products} />
      </Center>
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const queryProducts = context.query.product || null;
  let products = [];
  if (queryProducts) {
    products = await Product.find({ title: { $regex: queryProducts, $options: "i" } });
    products.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    products = await Product.find({}, null, { sort: { _id: -1 } });
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
