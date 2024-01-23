//React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PrivateRoute(props) {
  const { Component } = props;

  //----------------------------useDispatch------------------------------------------------
  const navigate = useNavigate();
  //----------------------------state-------------------------------------------------------
  const [products, setProducts] = useState([]);
  //-------------------------------useEffect---------------------------------------------------
 useEffect(() => {
    let login = localStorage.getItem("login");
    if (!login) {
      console.log("come")
      navigate("/");
    } else {
      try {
        axios
          .get("https://dummyjson.com/products")
          .then((response) => {
            setProducts(response.data.products);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    }
  }, []);
 //-------------------------------function---------------------------------------------------
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const addProduct = async (product) => {
    try {
      await axios
        .post(`https://dummyjson.com/products/add`, product)
        .then((res) => {
          setProducts([res, ...products]);
        });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async (productId, updatedProductData) => {
    try {
      const payload = {
        title: updatedProductData.title,
      };
      await axios.put(`https://dummyjson.com/products/${productId}`, payload);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, ...payload } : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
 //-------------------------------jsx---------------------------------------------------
  return (
    <>
      <div>
        <Component
          products={products}
          deleteProduct={deleteProduct}
          addProduct={addProduct}
          updateProduct={updateProduct}
        />
      </div>
    </>
  );
}

export default PrivateRoute;
