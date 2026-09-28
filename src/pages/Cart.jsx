import { Link } from "react-router";
import useCartStore from "../store/cartStore";
import { useShallow } from "zustand/shallow";

function Cart() {
  // const cartItems = useCartStore((state) => state.cartItems);
  // const updateQuantity = useCartStore((state) => state.updateQuantity);
  // const removeFromCart = useCartStore((state) => state.removeFromCart);

  // Object useShallow
//   const {cartItems, updateQuantity,removeFromCart} = useCartStore(useShallow((state)=>({
// cartItems:state.cartItems,
// updateQuantity:state.updateQuantity,
// removeFromCart:state.removeFromCart
//   })))

//Array shallow
const [cartItems, updateQuantity,removeFromCart]= useCartStore(useShallow((state)=>[state.cartItems,state.updateQuantity,state.removeFromCart]))

 const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

if (cartItems.length === 0) {
    return (
      <section className="site-width py-20 text-center">
        <p className="eyebrow">Your cart</p>
        <h1 className="section-title">Your cart is empty</h1>
        <Link to="/products" className="outline-btn mt-8 inline-block">Continue shopping</Link>
      </section>
    );
  }

  return (
    <section className="site-width py-10 sm:py-16">
      <div className="mb-10">
        <p className="eyebrow">Your cart</p>
        <h1 className="section-title">Shopping Cart</h1>
      </div>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-5 border-b border-slate-100 pb-6">
            <img src={item.thumbnail} alt={item.title} className="h-20 w-20 flex-shrink-0 object-contain" style={{ mixBlendMode: "multiply", background: "#f5f5f3" }} />

            <div className="min-w-0 flex-1">
              <h2 className="product-title">{item.title}</h2>
              <p className="mt-1 text-sm text-[#c96b55] font-semibold">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity" className="h-7 w-7 border border-slate-200 text-sm hover:border-[#c96b55] hover:text-[#c96b55]">−</button>
              <span className="w-5 text-center text-sm">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity" className="h-7 w-7 border border-slate-200 text-sm hover:border-[#c96b55] hover:text-[#c96b55]">+</button>
            </div>

            <p className="w-20 text-right text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>

            <button onClick={() => removeFromCart(item.id)} className="text-xs uppercase tracking-widest text-slate-400 hover:text-[#c96b55]">Remove</button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-end gap-4">
        <p className="text-lg font-semibold">Total: <span className="text-[#c96b55]">${cartTotal.toFixed(2)}</span></p>
        <Link to="/products" className="outline-btn">Continue shopping</Link>
      </div>
    </section>
  );
}

export default Cart;
