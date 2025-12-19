import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TodoList from "../components/ToDoList";
import PieChart from "../components/PieChart";
import {useNavigate,Link} from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return (<div>
    
    <h4>Please login</h4>
    <Link to="/login" className="text-blue-600 hover:underline">
     Click here to Login
    </Link>

    
    </div>)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Welcome, {user.name}</h1>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 hover:bg-red-600">Logout</button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TodoList userId={user.id} />
      <PieChart userId={user.id} />
      </div>
    </div>
  );
};

export default Dashboard;