import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { error } = useSelector((state) => state.auth);

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
    if (!formData.userName || !formData.email || !formData.password) {
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

    // Password strength validation
    if (formData.password.length < 6) {
      toast({
        title: "Password must be at least 6 characters long",
        variant: "warning",
      });
      return;
    }

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          variant: "success",
        });
        navigate("/auth/login");
      }
    });
  }

  return (
    <div className="relative mx-auto w-full max-w-md p-1 rounded-xl animate-border-gradient bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg">
  <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl space-y-6 animate-fade-in">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-indigo-700 drop-shadow-sm">
        Create new account
      </h1>
      <p className="mt-2 text-gray-600">
        Already have an account?
        <Link
          className="ml-2 text-blue-600 font-semibold hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </p>
    </div>
    <CommonForm
      formControls={registerFormControls}
      buttonText={"Sign Up"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
  </div>
</div>
  );
}

export default AuthRegister;
