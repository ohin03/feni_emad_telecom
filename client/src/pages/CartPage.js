import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsBagCheck, BsShieldCheck } from "react-icons/bs";
import { MdOutlineLocationOn, MdPayment } from "react-icons/md";

import "./CardPage.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [trxId, setTrxId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = cart?.reduce((acc, item) => acc + (item.price * (item.cartQuantity || 1)), 0);
      return total;
    } catch (error) {
      return 0;
    }
  };

  const removeCartItem = (pid) => {
    let myCart = cart.filter((item) => item._id !== pid);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    toast.success("Item removed");
  };

  const updateQuantity = (pid, type) => {
    const newCart = cart.map((item) => {
      if (item._id === pid) {
      let newQty = type === "inc" ? (item.cartQuantity || 1) + 1 : (item.cartQuantity || 1) - 1;
return { ...item, cartQuantity: Math.max(1, newQty) };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const formattedProducts = cart.map((item) => ({
        _id: item._id,
        quantity: Number(item.cartQuantity || 1),
      }));

      const { data } = await axios.post(
        "/api/v1/order/place-order",
        {
          products: formattedProducts,
          paymentMethod,
          trxId: paymentMethod !== "COD" ? trxId : null,
          address: auth?.user?.address,
          totalAmount: totalPrice(),
        },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      if (data?.success) {
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/dashboard/user/orders");
        toast.success("Order placed successfully!");
      }
    } catch (error) {
      toast.error("Order failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-main-wrapper">
        <div className="container py-5">
          {/* Progress Step (Visual Guide) */}
          <div className="cart-stepper mb-5 d-none d-md-flex">
            <div className="step active"><span>1</span> Cart Items</div>
            <div className="step-line"></div>
            <div className="step active"><span>2</span> Checkout Details</div>
            <div className="step-line"></div>
            <div className="step"><span>3</span> Success</div>
          </div>

          <div className="row g-4">
            {/* Left side: Cart Items */}
            <div className="col-lg-8">
              <div className="glass-card p-4">
                <h4 className="fw-bold mb-4">Shopping Cart ({cart?.length || 0} Items)</h4>
                <hr />
                {cart?.length === 0 ? (
                  <div className="text-center py-5">
                    <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="empty" width="120" className="mb-3 opacity-50" />
                    <h5 className="text-muted">Your cart is feeling lonely!</h5>
                    <button className="btn btn-primary rounded-pill px-4 mt-3" onClick={() => navigate("/")}>Go Shopping</button>
                  </div>
                ) : (
                  cart.map((p) => (
                    <div className="cart-item-row" key={p._id}>
                      <div className="item-img">
                        <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                      </div>
                      <div className="item-info">
                        <h6 className="fw-bold text-dark mb-1">{p.name}</h6>
                        <p className="text-muted small mb-2">{p.description?.substring(0, 40)}...</p>
                        <div className="qty-price-flex">
                          <div className="qty-counter">
                            <button onClick={() => updateQuantity(p._id, "dec")}><AiOutlineMinus /></button>
                            <span>{p.cartQuantity || 1}</span>
                            <button onClick={() => updateQuantity(p._id, "inc")}><AiOutlinePlus /></button>
                          </div>
                          <h6 className="price-tag mb-0">{p.price} TK</h6>
                        </div>
                      </div>
                      <div className="item-actions">
                        <button className="delete-btn" onClick={() => removeCartItem(p._id)}><AiOutlineDelete /></button>
                        <p className="fw-bold text-primary mt-2 d-none d-md-block">{(p.price * (p.cartQuantity || 1))} TK</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right side: Summary & Payment */}
            <div className="col-lg-4">
              <div className="glass-card p-4 sticky-top" style={{ top: "100px" }}>
                <h5 className="fw-bold mb-4">Order Summary</h5>
                  <span className="text-warning  ">Delivery: FREE (inside Feni-Sadar),</span> 
                  <span className="text-warning "> 130 TK (Outside Feni)</span>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{totalPrice()} TK</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span className="text-success fw-bold ">FREE (inside Feni-Sadar)</span>
             
                </div>
                <hr />
                <div className="summary-row total mb-4">
                  <span className="fw-bold">Total Amount</span>
                  <span className="fw-bold text-primary fs-4">{totalPrice()} TK</span>
                </div>

                {!auth?.token ? (
                  <button className="btn btn-warning w-100 py-3 rounded-3" onClick={() => navigate("/login", { state: "/cart" })}>Login to Checkout</button>
                ) : (
                  <>
                    <div className="checkout-section mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0 fw-bold"><MdOutlineLocationOn /> Address</h6>
                        <button className="btn btn-sm text-primary p-0" onClick={() => navigate("/dashboard/user/profile")}>Change</button>
                      </div>
                      <div className="address-pill">{auth?.user?.address || "No address added yet!"}</div>
                    </div>

                    <div className="payment-method-box mb-4">
                      <h6 className="fw-bold mb-3"><MdPayment /> Payment Method</h6>
                      <div className={`pay-option ${paymentMethod === "COD" ? "active" : ""}`} onClick={() => setPaymentMethod("COD")}>
                        <input type="radio" checked={paymentMethod === "COD"} readOnly />
                        <span>Cash on Delivery</span>
                      </div>
                      <div className={`pay-option ${paymentMethod === "BKASH" ? "active" : ""}`} onClick={() => setPaymentMethod("BKASH")}>
                        <input type="radio" checked={paymentMethod === "BKASH"} readOnly />
                        <span>bKash (Personal)</span>
                      </div>
                    </div>

                    {paymentMethod === "BKASH" && (
                      <div className="animate__animated animate__fadeIn mb-3">
                        <div className="alert alert-primary py-2 px-3 small">
                          Send Money: <strong>01832-574007</strong>
                        </div>
                        <input type="text" className="form-control mb-2" placeholder="Enter Transaction ID" value={trxId} onChange={(e) => setTrxId(e.target.value)} />
                      </div>
                    )}

                    <button className="btn btn-primary w-100 py-3 rounded-3 fw-bold shadow-sm" disabled={!cart.length || loading} onClick={placeOrder}>
                      {loading ? "Processing..." : <>Confirm Order <BsBagCheck className="ms-2" /></>}
                    </button>
                  </>
                )}
                
                <div className="trust-footer mt-4 text-center">
                  <p className="text-muted small"><BsShieldCheck className="text-success" /> Secure SSL Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;