import React from 'react';

const CustomButton = ({ title, onPress, loading, variant = 'primary', type = 'button', className = '' }) => {
  return (
    <button 
      type={type}
      className={`btn btn-${variant} btn-lg w-100 rounded-3 py-3 my-2 shadow-sm d-flex justify-content-center align-items-center ${className}`}
      onClick={onPress}
      disabled={loading}
    >
      {loading ? (
        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
      ) : null}
      <span className="fw-bold">{title}</span>
    </button>
  );
};

export default CustomButton;
