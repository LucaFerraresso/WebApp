"use client";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
