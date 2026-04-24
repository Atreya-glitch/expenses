import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { ChevronLeft } from 'lucide-react';

const AddExpenseScreen = ({ navigation, route }) => {
  const expense = route.params?.expense;
  const isEditing = !!expense;

  const [amount, setAmount] = useState(expense ? expense.amount.toString() : '');
  const [category, setCategory] = useState(expense ? expense.category : 'Food');
  const [note, setNote] = useState(expense ? expense.note : '');
  const [loading, setLoading] = useState(false);
  const { addExpense, updateExpense, deleteExpense } = useContext(ExpenseContext);

  const categories = [
    { name: 'Food', theme: 'warning', hex: '#ffc107' },
    { name: 'Transport', theme: 'info', hex: '#0dcaf0' },
    { name: 'Utilities', theme: 'success', hex: '#198754' },
    { name: 'Entertainment', theme: 'pink', hex: '#f472b6', custom: true },
    { name: 'Shopping', theme: 'purple', hex: '#a78bfa', custom: true },
    { name: 'Health', theme: 'danger', hex: '#dc3545' },
    { name: 'Other', theme: 'secondary', hex: '#6c757d' }
  ];

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    setLoading(true);
    const expenseData = {
      amount: parseFloat(amount),
      category,
      note,
      date: expense ? expense.date : new Date()
    };

    let result;
    if (isEditing) {
      result = await updateExpense(expense._id, expenseData);
    } else {
      result = await addExpense(expenseData);
    }

    setLoading(false);
    if (result.success) {
      navigation.goBack();
    } else {
       alert(result.error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const result = await deleteExpense(expense._id);
      if (result.success) navigation.goBack();
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-dark p-0 pb-5 text-white" style={{ backgroundColor: '#0f172a' }}>
  
      <div className="container px-4 py-4 d-flex align-items-center" style={{ max_width: '600px' }}>
        <button 
          className="btn btn-secondary border-0 rounded-3 p-2 me-3" 
          style={{ backgroundColor: '#1e293b' }}
          onClick={() => navigation.goBack()}
        >
          <ChevronLeft size={24} />
        </button>
        <h3 className="fw-bold m-0">{isEditing ? 'Edit Expense' : 'Add Expense'}</h3>
      </div>

      <div className="container px-4 mt-2" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSave}>
          <CustomInput
            label="Amount"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            type="number"
          />

          <div className="mb-4">
            <label className="form-label text-secondary fw-semibold small mb-3 d-block">Category</label>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  className={`btn border-0 rounded-3 px-3 py-2 transition-all ${
                    category === cat.name 
                    ? `btn-${cat.theme}` 
                    : 'btn-dark'
                  }`}
                  style={{ 
                    backgroundColor: category === cat.name 
                      ? (cat.custom ? cat.hex : '') 
                      : '#1e293b',
                    color: category === cat.name ? 'white' : '#94a3b8',
                    fontWeight: 'bold'
                  }}
                  onClick={() => setCategory(cat.name)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <CustomInput
            label="Note (Optional)"
            placeholder="What was this for?"
            value={note}
            onChangeText={setNote}
          />

          <div className="mt-4">
            <CustomButton 
              title={isEditing ? 'Update Expense' : 'Save Expense'} 
              loading={loading}
              type="submit"
              className="py-3 fs-5"
            />
          </div>

          {isEditing && (
            <button 
              type="button"
              className="btn btn-link mt-4 w-100 text-danger fw-bold text-decoration-none"
              onClick={handleDelete}
            >
              Delete Entry
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddExpenseScreen;
