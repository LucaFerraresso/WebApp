"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"; // Correct path
import { redirect } from "next/navigation";
import { toast, Toaster } from "sonner";
import UsersPage from "./components/UserPage";

export default function Page() {
  // If no session exists, redirect to login page
  //voglio rindirizzare l'utente alla pagina login
  const login = () => {
    toast.error("effettua il login");
    redirect("/login");
  };
  const logout = () => {
    toast.success("Logout effettuato con successo");
    redirect("/api/auth/signout");
  };

  return (
    <div className="flex flex-col bg-white text-black h-full">
      <Toaster position="top-center" />
      <h1>Benvenuto,</h1>
      <UsersPage />
      <button onClick={() => login()}>login</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}
