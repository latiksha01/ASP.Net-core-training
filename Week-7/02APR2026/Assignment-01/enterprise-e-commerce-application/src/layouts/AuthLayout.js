// layouts/AuthLayout.js
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="app-container flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="page-title mt-6 text-center text-3xl">Welcome Back</h2>
          <p className="mt-2 text-center text-text-secondary">Please sign in to your account</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
