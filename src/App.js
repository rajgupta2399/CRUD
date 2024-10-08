import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [records, setRecords] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3030/users").then((res) => {
      // Filter out the 'id' column to prevent it from being displayed
      const filteredColumns = Object.keys(res.data[0]).filter(
        (key) => key !== "id"
      );
      setColumns(filteredColumns);
      setRecords(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3030/users/${id}`)
      .then((res) => {
        console.log("Record deleted successfully");
        setRecords(records.filter((record) => record.id !== id)); // Update UI after deletion
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5">
      <div className="text-end">
        <Link to={"/create"} className="btn btn-primary">
          Create New
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record, i) => (
            <tr key={i}>
              {columns.map((col, index) => (
                <td key={index}>{record[col]}</td>
              ))}
              <td>
                <Link to={`/update/${record.id}`} className="btn btn-success">
                  Update
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record.id)} // Use the id for deleting but don't display it
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
