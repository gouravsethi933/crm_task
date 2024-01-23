import React, { useState } from "react";
import "./Dashboard.css";
import { useDispatch } from "react-redux";
import { setAuth } from "../slices/authSlice";
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
                <Link to="/graph">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Our Product</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <button onClick={() => setShowForm(true)} style={{ marginBottom: '15px' }}>Add Product</button>
          {showForm && (
            <div className="add-product-form">
              <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <form>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newProduct.title}
                  onChange={handleInputChange}
                />

                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                ></textarea>

                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                />

                <label htmlFor="thumbnail">Thumbnail URL:</label>
                <input
                  type="text"
                  id="thumbnail"
                  name="thumbnail"
                  value={newProduct.thumbnail}
                  onChange={handleInputChange}
                />

                <button
                  type="button"
                  onClick={
                    editingProduct ? handleUpdateProduct : handleAddProduct
                  }
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>
          )}
          <div className="product-list-item">
            {products?.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-details">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p className="price">Price: ${product.price}</p>
                  <p className="discount">
                    Discount: {product.discountPercentage}%
                  </p>
                  <p className="rating">Rating: {product.rating}</p>
                  <p className="stock">Stock: {product.stock}</p>
                  <button onClick={() => deleteProduct(product.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditProduct(product)}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
