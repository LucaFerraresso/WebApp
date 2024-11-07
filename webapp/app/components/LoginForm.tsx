"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { prisma } from "@/lib/prisma";
import { Toaster, toast } from "sonner";

type FormData = {
  username: string;
  password: string;
  email?: string; // solo per il form di registrazione
};

const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    console.log(isRegistering);
    setIsRegistering(isRegistering);
    if (isRegistering) {
      // Registrazione utente
      try {
        const hashedPassword = data.password; // Cripta la password

        const user = await prisma.user.create({
          data: {
            username: data.username,
            email: data.email!,
            password: hashedPassword, // Salva la password criptata
          },
        });

        console.log("Utente registrato con successo:", user);
        // Effettua il login appena registrato l'utente
        await signIn("credentials", {
          username: data.username,
          password: data.password,
          redirect: false,
        });

        router.push("/");
        toast.success("Registrazione avvenuta con successo");
      } catch (error) {
        console.error("Errore durante la registrazione", error);
        toast.error("Errore durante la registrazione");
      }
    } else {
      // Effettua il login
      if (data.username === "" || data.password === "") {
        toast.error("Username e password sono obbligatori");
        return;
      }
      // Login
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false, // Non redirigere automaticamente
      });

      if (result?.error) {
        console.log("Errore di login", result.error);
      } else {
        toast.success("login avvenuto con successo");
        console.log("Login avvenuto con successo");
        console.log(result);
        // Redirect alla home se il login ha successo
        router.push("/");
      }
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegistering ? "Registrati" : "Login"}
        </h2>
        <Toaster position="top-center" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-black"
        >
          {/* Campo Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Campo Email (solo per la registrazione) */}
          {isRegistering && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          )}

          {/* Campo Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Pulsante di Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {isRegistering ? "Registrati" : "Login"}
          </button>
        </form>

        {/* Link tra Login e Registrazione */}
        <div className="mt-4 text-center">
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:text-blue-700"
          >
            {isRegistering
              ? "Hai già un account? Login"
              : "Non hai un account? Registrati"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
