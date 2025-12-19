import React, { useState } from "react";
import { signupSchema } from "../utils/validation";
import { getUsers, saveUsers } from "../utils/localStorage";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate,Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signupSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const users = getUsers();
    if (users.some(u => u.email === form.email)) {
      toast.error("User already exists");
      return;
    }
    users.push({ id: uuid(), email: form.email, password: form.password, name: form.name });
    saveUsers(users);
    toast.success("Signup successful!");
    window.location.href = "/login";
  };

  return (
     <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow">

    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <div className="space-y-3">
      <input placeholder="Name" name="name" className="w-full" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" name="email" className="w-full"  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" name="password" className="w-full"  placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <input type="password" name="cnfpassword" className="w-full"  placeholder="Confirm Password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
      </div>
      <button type="submit" className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">Signup</button>
    </form>
    <p className="mt-4 text-center text-sm">
     Already registered?{" "}
    <Link to="/login" className="text-blue-600 hover:underline">
     Login here
    </Link>
      </p>

    </div>
  );
};

export default Signup;