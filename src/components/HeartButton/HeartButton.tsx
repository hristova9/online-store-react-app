import React from 'react';
import { FaHeart } from 'react-icons/fa';
import "./HeartButton.css";

interface HeartButtonProps {
  onClick: () => void;
}

const HeartButton: React.FC<HeartButtonProps> = ({ onClick }) => {
  return (
    <button className="heart-button" onClick={onClick}>
      <FaHeart size={24} />
    </button>
  );
};

export default HeartButton;
