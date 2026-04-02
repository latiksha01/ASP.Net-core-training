export default function Home() {
  return (
    <>
      <h1 className="page-title text-center mb-8">Welcome to E-Commerce Pro</h1>
      
      <div className="hero">
        <h2 className="text-4xl font-bold mb-4">Discover Amazing Products</h2>
        <p className="text-xl mb-8 opacity-90">Enterprise-grade shopping experience with modern design</p>
        <a href="/products" className="btn btn-primary text-lg px-8 py-4 no-underline">🛍️ Shop Now</a>
      </div>

      <div className="grid">
        <div className="card text-center">
        <h3 className="text-2xl font-bold mb-4 text-text-primary">🚀 Fast Delivery</h3>
          <p>Lightning quick shipping worldwide</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold mb-4 text-text-primary">🛡️ Secure Payments</h3>
          <p>Bank-level security for all transactions</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold mb-4 text-text-primary">⭐ 24/7 Support</h3>
          <p>Round the clock customer assistance</p>
        </div>
      </div>
    </>
  );
}
