import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../services/supabase";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    try {

      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({

          email,

          password,

        });

      if (error)
        throw error;

      navigate("/admin");

    }

    catch (err) {

      alert(err.message);

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-red-50 p-6">

      <form

        onSubmit={handleLogin}

        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl"

      >

        <img

          src={`${import.meta.env.BASE_URL}images/logo-pmr.png`}

          alt="PMR"

          className="mx-auto h-28"

        />

        <h1 className="mt-6 text-center text-3xl font-black">

          Login Admin

        </h1>

        <p className="mt-2 text-center text-gray-500">

          PMR SMAN 1 AIKMEL

        </p>

        <div className="mt-10">

          <label className="font-semibold">

            Email

          </label>

          <input

            type="email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="mt-2 w-full rounded-2xl border p-4 outline-none focus:border-red-600"

            required

          />

        </div>

        <div className="mt-6">

          <label className="font-semibold">

            Password

          </label>

          <input

            type="password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            className="mt-2 w-full rounded-2xl border p-4 outline-none focus:border-red-600"

            required

          />

        </div>

        <button

          disabled={loading}

          className="mt-10 w-full rounded-2xl bg-red-700 py-4 font-bold text-white hover:bg-red-800 disabled:opacity-60"

        >

          {

            loading

              ? "Masuk..."

              : "Login"

          }

        </button>

      </form>

    </div>

  );

}

export default Login;