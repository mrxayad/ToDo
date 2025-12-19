import React, { useState, useContext } from "react";
import { loginSchema } from "../utils/validation";
import { getUsers } from "../utils/localStorage";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import {useNavigate,Link} from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const users = getUsers();
    const user = users.find(u => u.email === form.email && u.password === form.password);
    if (!user) {
      toast.error("Invalid credentials");
      return;
    }
    login(user);
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow">
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
       <div className="space-y-3">
      <input name="email" placeholder="Email" className="w-full" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input name="password"type="password"   className="w-full" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      </div>
      <button type="submit" className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">Login</button>
    </form>
        <p className="mt-4 text-center text-sm">
     Not registered?{" "}
    <Link to="/signup" className="text-blue-600 hover:underline">
     Sign Up
    </Link>
      </p>
      </div>
  );
};

export default Login;