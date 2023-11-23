import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  @media screen and (min-width: 680px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  margin-top: 50px;
`;

const ProductInfoCell = styled.td`
  padding: 10px;
`;

const ProductImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100px;
  img {
    max-width: 70px;
    max-height: 70px;
  }
  padding: 2px;
  border: 1px solid #aaa;
  border-radius: 5px;
  @media screen and (min-width: 660px) {
    padding: 5px;
    width: 100px;
    height: 100px;
    img {
      max-width: 100px;
      max-height: 100px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 660px) {
    display: inline-flex;
    padding: 10px;
  }
`;

const QunatityWrap = styled.div`
  display: inline-flex;
  padding-right: 15px;
  @media screen and (min-width: 660px) {
    display: inline-flex;
    padding: 10px;
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction:column;
  gap:5px;
  }
`;

export default function CartPage() {
  const { cartProducts, addProductToCart, removeProductFromCart, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setstreetAddress] = useState("");
  const [town, setTown] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [successPay, setSuccessPay] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setSuccessPay(true);
      clearCart();
    }
    if (session) {
      setEmail(session?.user.email);
      setName(session?.user?.name);
    }
  }, []);

  function addMoreProduct(id) {
    addProductToCart(id);
  }

  function minusProduct(id) {
    removeProductFromCart(id);
  }

  async function goToCheckout() {
    const details = [name, email, streetAddress, town, postCode, city];
    if (details.includes("")) {
      alert("Please fill in all details");
      return;
    }

    const res = await axios.post("/api/checkout", {
      name,
      email,
      streetAddress,
      town,
      postCode,
      city,
      cartProducts,
    });
    if (res.data.url) {
      window.location = res.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (successPay) {
    return (
      <div>
        <Header />
        <Center>
          <WhiteBox>
            <h1>Order Successful!</h1>
          </WhiteBox>
        </Center>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <div>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {cartProducts?.length > 0 && (
              <div>
                <h2>Cart</h2>
                {products?.length > 0 && (
                  <Table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product) => (
                        <tr key={product._id}>
                          <ProductInfoCell>
                            <ProductImageBox>
                              <img src={product.images[0]} />
                            </ProductImageBox>
                            {product.title}
                          </ProductInfoCell>
                          <td>
                            <QunatityWrap>
                              <Button onClick={() => minusProduct(product._id)}>-</Button>
                              <QuantityLabel>{cartProducts.filter((id) => id === product._id).length}</QuantityLabel>
                              <Button onClick={() => addMoreProduct(product._id)}>+</Button>
                            </QunatityWrap>
                          </td>
                          <td>£{product.price * cartProducts.filter((id) => id === product._id).length}</td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td>Total:</td>
                        <td>£{total}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </div>
            )}
          </div>
          {!!cartProducts?.length && (
            <InputWrap>
              <h2>Order Information</h2>
              <Input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" />
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email" />
              <Input value={streetAddress} onChange={(e) => setstreetAddress(e.target.value)} type="text" name="streetAddress" placeholder="Street Address" />
              <Input value={town} onChange={(e) => setTown(e.target.value)} type="text" name="town" placeholder="Town" />
              <Input value={postCode} onChange={(e) => setPostCode(e.target.value)} type="text" name="postCode" placeholder="Post Code" />
              <Input value={city} onChange={(e) => setCity(e.target.value)} type="text" name="city" placeholder="City" />
              <Button onClick={goToCheckout} $block={1} $black={1} $width="full" $size="l">
                Continue to checkout
              </Button>
              <input name="products" type="hidden" value={JSON.stringify(cartProducts)} />
            </InputWrap>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
