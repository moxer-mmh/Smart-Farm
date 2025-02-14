import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button";
import Input from "../ui/input";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { authApi } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { LoginCredentials } from "types/auth";

const LoginForm = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  // Move the useEffect to the top level so that whenever the user is set, we navigate
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await authApi.login(data);
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      addToast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch {
      addToast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Login to Smart Farm</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              {...register("username", { required: true })}
              placeholder="Username"
              className="w-full"
            />
            {errors.username && (
              <span className="text-sm text-red-500">Username is required</span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full"
            />
            {errors.password && (
              <span className="text-sm text-red-500">Password is required</span>
            )}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Button
            variant="link"
            onClick={() => {
              navigate("/auth/register");
            }}
          >
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
