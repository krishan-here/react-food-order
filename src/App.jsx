import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.jpg";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Modal from "./components/Modal.jsx";
import Success from "./components/Success.jsx";

const BASE_URL = "http://localhost:3000/";

function App() {
  const [meals, setMeals] = useState([]);
  const [carts, setCarts] = useState([]);
  const [currentModal, setCurrentModal] = useState("CART");
  const dialogRef = useRef();

  const totalCartCount = carts.reduce(
    (prevValue, item) => prevValue + item.count,
    0
  );
  const totalPrice = carts
    .reduce((prevValue, item) => prevValue + item.count * Number(item.price), 0)
    .toFixed(2);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch(BASE_URL + "meals");
      const resData = await response.json();
      console.log(resData);
      setMeals(resData);
    }

    fetchMeals();
  }, []);

  function handleOpenModal() {
    dialogRef.current.open();
  }

  function handleCloseModal() {
    dialogRef.current.close();
    setCurrentModal("CART");
  }

  function handleAddToCart(meal) {
    setCarts((currentCarts) => {
      let cartLength = currentCarts.length;
      if (cartLength) {
        const mealIndex = currentCarts.findIndex((item) => item.id === meal.id);
        if (mealIndex === -1) {
          return [{ ...meal, count: 1 }, ...currentCarts];
        }
        const updatedCarts = [...currentCarts];
        updatedCarts[mealIndex].count += 1;
        return updatedCarts;
      }
      return [{ ...meal, count: 1 }];
    });
  }

  function handleChangeModal(modal) {
    setCurrentModal(modal);
  }

  function handleCartDecrement(mealId) {
    setCarts((currentCarts) => {
      const mealIndex = currentCarts.findIndex((item) => item.id === mealId);
      if (currentCarts[mealIndex].count) {
        currentCarts[mealIndex].count -= 1;
      }
      return [...currentCarts];
    });
  }

  function handleCartIncrement(mealId) {
    setCarts((currentCarts) => {
      const mealIndex = currentCarts.findIndex((item) => item.id === mealId);
      currentCarts[mealIndex].count += 1;
      return [...currentCarts];
    });
  }

  return (
    <>
      <Modal ref={dialogRef}>
        {currentModal === "CART" && (
          <Cart
            onClose={handleCloseModal}
            carts={carts}
            onAdd={handleCartIncrement}
            onRemove={handleCartDecrement}
            onChangeModal={handleChangeModal}
            totalPrice={totalPrice}
          />
        )}
        {currentModal === "CHECKOUT" && (
          <Checkout
            totalPrice={totalPrice}
            onClose={handleCloseModal}
            onChangeModal={handleChangeModal}
            carts={carts}
          />
        )}
        {currentModal === "SUCCESS" && <Success onClose={handleCloseModal} />}
      </Modal>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="meal_logo" />
          <h1>ReactMeal</h1>
        </div>
        <button className="text-button" onClick={handleOpenModal}>
          Cart({totalCartCount})
        </button>
      </header>

      <ul id="meals">
        {meals.map((mealItem) => {
          return (
            <li className="meal-item" key={mealItem.id}>
              <article>
                <img src={BASE_URL + mealItem.image} alt={mealItem.name} />
                <h3>{mealItem.name}</h3>
                <p className="meal-item-price">${mealItem.price}</p>
                <p className="meal-item-description">{mealItem.description}</p>
                <div className="meal-item-actions">
                  <button
                    className="button"
                    onClick={() => handleAddToCart(mealItem)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
