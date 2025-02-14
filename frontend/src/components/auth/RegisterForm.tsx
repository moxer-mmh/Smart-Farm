import React from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import Input from "../ui/input";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { authApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { RegisterCredentials } from "../../types/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>();

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      await authApi.register(data);
      addToast({
        title: "Registration Successful",
        description: "You can now log in.",
      });
      navigate("/auth/login");
    } catch {
      addToast({
        title: "Error",
        description: "Registration failed.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Register to Smart Farm</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-sm text-red-500">Email is required</span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              {...register("username", { required: true })}
              placeholder="Username"
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
            />
            {errors.password && (
              <span className="text-sm text-red-500">Password is required</span>
            )}
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Button
            variant="link"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
