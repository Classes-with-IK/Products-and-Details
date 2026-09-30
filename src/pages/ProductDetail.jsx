import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useCartStore from "../store/cartStore";
import { useShallow } from "zustand/shallow";

function Icon({ name, size = 14 }) {
  const path =
    name === "back" ? (
      <>
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </>
    ) : (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    );
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [items, setItem] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cartItems, addToCart, updateQuantity] = useCartStore(
    useShallow((state) => [
      state.cartItems,
      state.addToCart,
      state.updateQuantity,
    ]),
  );

  const checkProduct = () => {
return cartItems.find((item) => item.id === product.id);
};
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading)
    return (
      <div className="site-width py-20">
        <div className="loading-box">Loading product...</div>
      </div>
    );
  if (error || !product)
    return (
      <div className="site-width py-20 text-center">
        <p className="text-red-500">{error || "Product not found"}</p>
        <Link to="/products" className="mt-5 inline-block text-[#c96b55]">
          Back to products
        </Link>
      </div>
    );

  return (
    <section className="site-width py-10 sm:py-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-[#c96b55]"
      >
        <span className="flex items-center gap-2">
          <Icon name="back" /> Back
        </span>
      </button>

      <article className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="detail-image-wrap">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
          />
        </div>

        <div>
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Icon name="star" /> {product.rating}
            </span>
            <span>{product.stock} in stock</span>
            <span>{product.brand}</span>
          </div>
          <p className="mt-6 text-2xl font-semibold text-[#c96b55]">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">
            {product.description}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 text-xs text-slate-500 sm:grid-cols-3">
            <div className="border border-slate-100 p-4">
              <span className="block text-[10px] uppercase tracking-widest text-slate-400">
                Brand
              </span>
              <b className="mt-1 block text-slate-700">
                {product.brand || "Luxe"}
              </b>
            </div>
            <div className="border border-slate-100 p-4">
              <span className="block text-[10px] uppercase tracking-widest text-slate-400">
                Discount
              </span>
              <b className="mt-1 block text-slate-700">
                {product.discountPercentage.toFixed(1)}%
              </b>
            </div>
            <div className="border border-slate-100 p-4">
              <span className="block text-[10px] uppercase tracking-widest text-slate-400">
                SKU
              </span>
              <b className="mt-1 block text-slate-700">#{product.id}</b>
            </div>
          </div>

          {checkProduct() ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                aria-label="Decrease quantity"
                className="h-7 w-7 border border-slate-200 text-sm hover:border-[#c96b55] hover:text-[#c96b55]"
              >
                −
              </button>


              <button
                onClick={() => updateQuantity(product.id, 1)}
                aria-label="Increase quantity"
                className="h-7 w-7 border border-slate-200 text-sm hover:border-[#c96b55] hover:text-[#c96b55]"
              >
                +
              </button>

            </div>
          ) : (
            <button
              onClick={()=> addToCart(product)}
              className="mt-8 w-full bg-slate-900 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#c96b55] transition sm:w-auto"
            >
              Add to cart
            </button>
          )}
        </div>
      </article>
    </section>
  );
}

export default ProductDetail;
