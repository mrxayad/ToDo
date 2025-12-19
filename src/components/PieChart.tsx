import React, { useEffect, useState } from "react";
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getTodos } from "../utils/localStorage";

interface Props {
  userId: string;
}

const COLORS = ["#3B82F6", "#F59E0B"]; // blue for completed, amber for pending

const PieChart: React.FC<Props> = ({ userId }) => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const todos = getTodos().filter(t => t.userId === userId);
    const completed = todos.filter(t => t.status === "completed").length;
    const pending = todos.filter(t => t.status === "pending").length;
    setData([
      { name: "Completed", value: completed },
      { name: "Pending", value: pending },
    ]);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 -z-10">
      <h2 className="text-lg font-semibold mb-4">Task Overview</h2>
      <RePieChart width={300} height={300}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </div>
  );
};

export default PieChart;






// import React, { useEffect, useState } from "react";
// import { PieChart as RePieChart, Pie, Cell, Tooltip } from "recharts";
// import { getTodos } from "../utils/localStorage";

// interface Props {
//   userId: string;
// }

// const COLORS = ["#00C49F", "#FF8042"];

// const PieChart: React.FC<Props> = ({ userId }) => {
//   const [data, setData] = useState<{ name: string; value: number }[]>([]);

//   const refresh = () => {
//     const todos = getTodos().filter(t => t.userId === userId);
//     const completed = todos.filter(t => t.status === "completed").length;
//     const pending = todos.filter(t => t.status === "pending").length;
//     setData([
//       { name: "Completed", value: completed },
//       { name: "Pending", value: pending },
//     ]);
//   };

//   useEffect(() => {
//     refresh();
//   }, []);

//   return (
//     <div className="mt-6">
//       <RePieChart width={300} height={300}>
//         <Pie
//           data={data}
//           cx={150}
//           cy={150}
//           innerRadius={60}
//           outerRadius={100}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </RePieChart>
//     </div>
//   );
// };

// export default PieChart;