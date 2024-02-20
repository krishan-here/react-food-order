import { useInput } from "../hooks/useInput";
import {
  EMAIL_ERROR_MESSAGE,
  EMPTY_ERROR_MESSAGE,
} from "../utils/errorMessage";
import { isEmail, isNotEmpty } from "../utils/validation";

function Checkout({ totalPrice, onClose, onChangeModal, carts }) {
  const {
    value: enteredName,
    handleInputChange: handleNameChange,
    handleHasEdit: handleNameEdit,
    isInvalid: isNameHasError,
  } = useInput("", isNotEmpty);
  const {
    value: enteredEmail,
    handleInputChange: handleEmailChange,
    handleHasEdit: handleEmailEdit,
    isInvalid: isEmailHasError,
  } = useInput("", (value) => isNotEmpty(value) && isEmail(value));
  const {
    value: enteredStreet,
    handleInputChange: handleStreetChange,
    handleHasEdit: handleStreetEdit,
    isInvalid: isStreetHasError,
  } = useInput("", isNotEmpty);
  const {
    value: enteredPostal,
    handleInputChange: handlePostalChange,
    handleHasEdit: handlePostalEdit,
    isInvalid: isPostalHasError,
  } = useInput("", isNotEmpty);
  const {
    value: enteredCity,
    handleInputChange: handleCityChange,
    handleHasEdit: handleCityEdit,
    isInvalid: isCityHasError,
  } = useInput("", isNotEmpty);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/orders", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          customer: {
            name: enteredName,
            email: enteredEmail,
            street: enteredStreet,
            "postal-code": enteredPostal,
            city: enteredCity,
          },
          items: carts,
        },
      }),
    });
    const resData = await response.json();
    console.log(resData);
    onChangeModal("SUCCESS");
  }
  return (
    <section>
      <h2>Checkout</h2>
      <p>Total Amount: ${totalPrice}</p>
      <form onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onBlur={handleNameEdit}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          {isNameHasError && (
            <p className="error-text">{EMPTY_ERROR_MESSAGE + "name."}</p>
          )}
        </div>
        <div className="control">
          <label htmlFor="email">E-mail Address</label>
          <input
            type="text"
            id="email"
            value={enteredEmail}
            onBlur={handleEmailEdit}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {isEmailHasError && (
            <p className="error-text">{EMAIL_ERROR_MESSAGE}</p>
          )}
        </div>
        <div className="control">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={enteredStreet}
            onBlur={handleStreetEdit}
            onChange={(e) => handleStreetChange(e.target.value)}
          />
          {isStreetHasError && (
            <p className="error-text">{EMPTY_ERROR_MESSAGE + "street."}</p>
          )}
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal">Postal Code</label>
            <input
              type="text"
              id="postal"
              value={enteredPostal}
              onBlur={handlePostalEdit}
              onChange={(e) => handlePostalChange(e.target.value)}
            />
            {isPostalHasError && (
              <p className="error-text">{EMPTY_ERROR_MESSAGE + "postal"}</p>
            )}
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={enteredCity}
              onBlur={handleCityEdit}
              onChange={(e) => handleCityChange(e.target.value)}
            />
            {isCityHasError && (
              <p className="error-text">{EMPTY_ERROR_MESSAGE + "city."}</p>
            )}
          </div>
        </div>
        <div className="modal-actions">
          <button className="text-button" type="button" onClick={onClose}>
            Close
          </button>
          <button className="button">Submit Order</button>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
