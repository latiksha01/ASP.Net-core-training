import { useParams, Link, Outlet } from "react-router-dom";

export default function ProductDetails() {
  const { productId } = useParams();

  return (
    <div>
      <h2>📦 Product ID: {productId}</h2>

      <nav>
        <Link to="reviews">Reviews</Link> |{" "}
        <Link to="specs">Specs</Link>
      </nav>

      <Outlet />
    </div>
  );
}