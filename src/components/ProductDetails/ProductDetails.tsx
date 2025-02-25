import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../store/productApi";
import { skipToken } from "@reduxjs/toolkit/query";
import "./ProductDetails.css";
import Button from "../Button/Button";
import ProductImage from "../ProductImage/ProductImage";
import { Product } from "../../models/Product";
import { useAddToBasketMutation } from "../../store/basketApi";
import { handleError } from "../../utils/errorUtils";
import ModalMessage from "../ModalMessage/ModalMessage";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/basketSlice";
import { RootState } from "../../store/store";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { data: product, error, isLoading } = useGetProductByIdQuery(id ?? skipToken);
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const [addToBasket] = useAddToBasketMutation();

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product details.</p>;
  if (!product) return <p>Product not found.</p>;

  const handleBuyClick = async (product: Product) => {
    const normalizedProduct = { ...product, id: String(product.id) };
    const alreadyInBasket = basketItems.some((p) => p.id === normalizedProduct.id);

    if (alreadyInBasket) {
      setModalMessage("This product is already in your cart!");
      setShowModal(true);
      return;
    }

    dispatch(addItem({ ...normalizedProduct, quantity: 1 }));

    try {
      await addToBasket({ ...normalizedProduct, quantity: 1 }).unwrap();
      setModalMessage("Product added to basket!");
      setShowModal(true);
    } catch (err) {
      handleError(err);
      alert("Failed to update basket.");
    }
  };

  return (
    <>
      <div className="product-details">
        <h1 className="product-title">{product.title}</h1>
        <ProductImage image={product.image} alt={product.title} className="product-image" />
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          Price: <span>${product.price.toFixed(2)}</span>
        </p>
        <div className="button-container">
          <Button label="Buy" onClick={() => handleBuyClick(product)} className="btn-buy" />
          <Button label="Back to Products" onClick={() => navigate("/")} className="btn-details" />
        </div>
      </div>
      <ModalMessage isOpen={showModal} onClose={() => setShowModal(false)} title="Message">
        <p>{modalMessage}</p>
      </ModalMessage>
    </>
  );
};

export default ProductDetails;

