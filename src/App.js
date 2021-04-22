import {useState}  from "react";
import './App.css';
import ProductComponent from "./components/ProductComponent.jsx";
import RedmiPhoto from "./images/redmi_note_10_5G_phone.jpeg";
import HuaweiPhoto from "./images/huawei_p40_pro_phone.jpg";
import OppoPhoto from "./images/Oppo_Reno_5F.jpg";

function App() {

  const [productsData, setProductsData] = useState([
    {name: "Oppo", cost: 13, photo: <img src={OppoPhoto} width="100px" height="100px" alt="Oppo Photo" />,  quantity: 0 },
    {name: "Redmi", cost: 15, photo: <img src={RedmiPhoto} width="100px" height="100px" alt="RedMi Photo" />, quantity: 0 },
    {name: "Huawei", cost: 17, photo: <img src={HuaweiPhoto} width="100px" height="100px" alt="Huawei Photo" />,  quantity: 0 }
  ]); 
  const [numCart, setNumCart] = useState([]);
  const [numBill, setNumBill] = useState([]);
  const [checkoutAmount, setCheckoutAmount] = useState(0);

  const handleProductQuantityChange = ({ name, quantity}) => {
    const newProductList = [...productsData];
    const prodIndex = productsData.findIndex(x => x.name === name);
    newProductList[prodIndex].quantity = quantity;
    setProductsData(newProductList);
  };

  const handleAddToCart = ( theQuantity, isBill) => {
    const newNumCart = [...numCart];
    const newSum = theQuantity;
    newNumCart.push(newSum);
    setNumCart(newNumCart);
  };

  const quantitySum = numCart.reduce((x, y ) => {
    return x + y;
  }, 0);

  const bill = productsData.reduce((result, {cost, quantity = 0}) => {
    return result += quantity * cost;
  }, 0);

  const billTwo = productsData.reduce((result, {quantity = 0}) => {
    return result += quantity;
  }, 0);
  
  let pushProductCost = [];
  for(let i = 0; i < productsData.length; i++){
    pushProductCost.push(productsData[i].quantity * productsData[i].cost);
    console.log(pushProductCost);
  }
  const sumProductCost = pushProductCost.reduce((x, y) => {
    return x +y;
  }, 0);

  const checkout = () => {
    setCheckoutAmount(bill)
  };

  return (
    <div className="body-section">
      <div>🛒 {quantitySum} <button onClick={checkout}>Proceed to Checkout</button> {/* &nbsp; &nbsp; 💲 ignore: {bill} of {billTwo}&nbsp; &nbsp; 💲 ignore: {sumProductCost} */} </div>
      
      <p>{checkoutAmount}</p>      
      {/* <div>Oppo Quantity: {productsData[0].quantity}</div>
      <div>Oppo Total Cost: {productsData[0].quantity * productsData[0].cost}</div>
      <div>Redmi Total Cost: {productsData[1].quantity * productsData[1].cost}</div>
      <div>Huawei Total Cost: {productsData[2].quantity * productsData[2].cost}</div> */}
      {productsData.map((productData, i) => <ProductComponent key={i} name={productData.name} cost={productData.cost} photo={productData.photo} onQuantityChange={handleProductQuantityChange} onClickAddToCart={handleAddToCart}/>)}
    </div>
  );
}

export default App;
