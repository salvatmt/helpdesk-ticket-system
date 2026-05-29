import {
  useState
} from "react";

import { toast } from "react-toastify";

import {
  useNavigate
} from "react-router-dom";

import {
  loginRequest
} from "../../services/auth.service";

import {
  useAuth
} from "../../hooks/useAuth";


function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginRequest(form);

login(data);

toast.success(
  "Bienvenido al sistema"
);

navigate("/dashboard");

    } catch (error) {

  toast.error(
    "Correo o contraseña incorrectos"
  );
}
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Help Desk Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <button
          className="w-full bg-black text-white p-3 rounded"
        >
          Iniciar Sesión
        </button>

      </form>

    </div>
  );
}

export default LoginPage;