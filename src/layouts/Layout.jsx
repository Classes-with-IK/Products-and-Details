import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import useCartStore from "../store/cartStore";

function Icon({ name, size = 18, className = "" }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    heart: <path d="M20.8 8.7c0 5.1-8.8 10.1-8.8 10.1S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    back: <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  );
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-[#c96b55] font-medium"
      : "text-slate-600 hover:text-[#c96b55] transition";

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="bg-[#f8f6f4] border-b border-slate-100 text-[11px] text-slate-500">
        <div className="site-width flex min-h-8 items-center justify-between gap-4">
          <p>Welcome to The Luxe Store</p>
          <div className="hidden sm:flex items-center gap-5">
            <span>USD</span><span>Help</span><span>Track My Order</span><span>My Account</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="site-width flex h-[74px] items-center justify-between gap-8">
          <Link to="/" className="text-[25px] font-black tracking-[-1.5px] text-slate-900">
            The<span className="text-[#c96b55]">Luxe</span>.
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px]">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/products" className={linkClass}>Shop</NavLink>
            <NavLink to="/collections" className={linkClass}>Collections</NavLink>
            <NavLink to="/blog" className={linkClass}>Blog</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </nav>

          <div className="flex items-center gap-3 text-slate-500">
            <button aria-label="Search" className="icon-btn"><Icon name="search" /></button>
            <button aria-label="Wishlist" className="icon-btn"><Icon name="heart" /></button>
            <Link to="/cart" aria-label="Shopping bag" className="icon-btn relative">
              <Icon name="bag" />
              <span className="absolute -right-1 -top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#c96b55] text-[8px] text-white">{cartCount}</span>
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-1" aria-label="Menu"><Icon name="menu" size={21} /></button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-slate-100 bg-white px-6 py-5">
            <div className="site-width flex flex-col gap-4 text-sm">
              <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClass}>Home</NavLink>
              <NavLink to="/products" onClick={() => setMenuOpen(false)} className={linkClass}>Shop</NavLink>
              <NavLink to="/collections" onClick={() => setMenuOpen(false)} className={linkClass}>Collections</NavLink>
              <NavLink to="/blog" onClick={() => setMenuOpen(false)} className={linkClass}>Blog</NavLink>
              <NavLink to="/about" onClick={() => setMenuOpen(false)} className={linkClass}>About</NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={linkClass}>Contact</NavLink>
            </div>
          </nav>
        )}
      </header>

      <main><Outlet /></main>

      <footer className="mt-20 border-t border-slate-100 bg-[#f8f6f4]">
        <div className="site-width grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-2xl font-black tracking-[-1px]">The<span className="text-[#c96b55]">Luxe</span>.</h3>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">Curated everyday products with a clean, modern shopping experience.</p>
            <p className="mt-5 font-medium">(+1) 000 123 456</p>
            <p className="mt-1 text-xs text-slate-400">123 Main Street, New York, NY 10001</p>
          </div>
          <div>
            <h4 className="footer-title">Terms Of Use</h4>
            <div className="footer-links"><Link to="/products">Privacy Policy</Link><Link to="/products">Return Policy</Link><Link to="/products">Shipping</Link></div>
          </div>
          <div>
            <h4 className="footer-title">About</h4>
            <div className="footer-links"><Link to="/products">Our Story</Link><Link to="/products">Shopping Cart</Link><Link to="/products">Track My Order</Link></div>
          </div>
          <div>
            <h4 className="footer-title">Subscribe Newsletter</h4>
            <p className="text-sm leading-6 text-slate-500">Join our newsletter for new products and offers.</p>
            <form className="mt-4 flex border border-slate-200 bg-white">
              <input aria-label="Email address" type="email" placeholder="Your email address" className="min-w-0 flex-1 px-3 py-3 text-xs outline-none" />
              <button type="button" className="bg-[#c96b55] px-4 text-[11px] font-semibold uppercase text-white">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">© 2026 The Luxe. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default Layout;
