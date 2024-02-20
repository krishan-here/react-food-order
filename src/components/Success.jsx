function Success({ onClose }) {
  return (
    <section>
      <h2>Order Created!</h2>
      <p>We will get back to you in your email address.</p>
      <div className="modal-actions">
        <button className="button" onClick={onClose}>
          Okay
        </button>
      </div>
    </section>
  );
}

export default Success;
