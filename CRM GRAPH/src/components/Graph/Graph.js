import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import DoubleLineChart from "./DoubleLineChart";
import LineChart from "./LineChart";
import "../Dashboard.css";
import { useDispatch } from "react-redux";
import { setAuth } from "../../slices/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ products, deleteProduct, addProduct, updateProduct }) => {
  //------------------------------------state-----------------------------------
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    thumbnail: "",
  });
console.log("products", products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //-------------------------------function---------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    addProduct(newProduct);
    setNewProduct({
      title: "",
      description: "",
      price: 0,
      thumbnail: "",
    });
    setShowForm(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowForm(true);
  };

  const handleUpdateProduct = () => {
    updateProduct(editingProduct.id, newProduct);
    setEditingProduct(null);
    setNewProduct({
      title: "",
      description: "",
      price: 0,
      thumbnail: "",
    });
    setShowForm(false);
  };

  const handleLogout = () => {
    dispatch(setAuth(false));
    localStorage.removeItem("login");
    navigate("/");
  };

  //-------------------------------jsx---------------------------------------------------
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>CRM Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="dashboard-content">
        <aside className="sidebar">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <div className="product-list">
        <div className="col-md-12">
           <LineChart />
          </div>
          <div className="col-md-12 mt-5 ">
            <DoubleLineChart />
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

