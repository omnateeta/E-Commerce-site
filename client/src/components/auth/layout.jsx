import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Animated Gradient Left Side */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 animate-gradient-x">
        <div className="max-w-md text-center text-white animate-fade-in space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md">
            Welcome to ECommerce Shopping
          </h1>
          <p className="text-lg opacity-90">
            Discover amazing products, great deals, and fast delivery.
          </p>
        </div>
      </div>

      {/* Right Side (Form, etc.) */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
