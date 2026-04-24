import React from 'react';

const CustomInput = ({ label, value, onChangeText, placeholder, type = 'text', error }) => {
  return (
    <div className="mb-4">
      {label && <label className="form-label text-secondary fw-semibold small mb-2 d-inline-block">{label}</label>}
      <input
        className={`form-control form-control-lg bg-dark-subtle border-0 rounded-3 py-3 text-white ${error ? 'is-invalid' : ''}`}
        style={{ backgroundColor: '#1e293b !important', color: '#f8fafc' }}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
        type={type}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default CustomInput;
