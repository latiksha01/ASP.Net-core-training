import { Link } from "react-router-dom";

export default function Products() {
  const products = [
    { id: 1, name: "Premium Laptop", price: "$1299", image: "💻" },
    { id: 2, name: "Wireless Headphones", price: "$299", image: "🎧" },
    { id: 3, name: "Smart Watch", price: "$499", image: "⌚" },
    { id: 4, name: "Gaming Mouse", price: "$89", image: "🖱️" },
    { id: 5, name: "Mechanical Keyboard", price: "$199", image: "⌨️" },
    { id: 6, name: "4K Monitor", price: "$799", image: "🖥️" },
  ];

  return (
    <>
      <h1 className="page-title">🛍️ Our Products</h1>
      
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <div className="text-5xl mb-4">{product.image}</div>
            <h3 className="text-2xl font-bold mb-2 text-text-primary">{product.name}</h3>
            <div className="text-3xl font-bold text-text-primary mb-6">{product.price}</div>
            <a 
              href={`/products/${product.id}`}
              className="btn btn-primary w-full no-underline"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
