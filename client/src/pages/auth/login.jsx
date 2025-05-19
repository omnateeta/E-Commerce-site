import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { error, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/shop/home");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  function onSubmit(event) {
    event.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
        toast({
        title: "Please fill in all fields",
        variant: "warning",
        });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        toast({
        title: "Please enter a valid email address",
        variant: "warning",
        });
      return;
      }

    dispatch(loginUser(formData));
  }

  return (
    <div className="relative mx-auto w-full max-w-md p-1 rounded-xl animate-border-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg">
  <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl space-y-6 animate-fade-in">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-purple-700 drop-shadow-sm">
        Sign in to your account
      </h1>
      <p className="mt-2 text-gray-600">
        Don't have an account?
        <Link
          className="ml-2 text-pink-600 font-semibold hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
    </div>
    <CommonForm
      formControls={loginFormControls}
          buttonText={isLoading ? "Signing in..." : "Sign In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
          disabled={isLoading}
    />
  </div>
</div>
  );
}

export default AuthLogin;
