import React, { useContext, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { AuthContext } from '../context/AuthContext';
import { Plus, LogOut, TrendingDown, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

const DashboardScreen = ({ navigation }) => {
  const { expenses, summary, loading, fetchExpenses, fetchSummary } = useContext(ExpenseContext);
  const { user, logout } = useContext(AuthContext);

  const totalExpense = Array.isArray(summary) 
    ? summary.reduce((acc, curr) => acc + curr.totalAmount, 0) 
    : 0;

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food': return { bg: 'warning', hex: '#FFB800', light: '#FFF6E5' };
      case 'Transport': return { bg: 'info', hex: '#00E0FF', light: '#E5FCFF' };
      case 'Utilities': return { bg: 'success', hex: '#00FFA3', light: '#E5FFF4' };
      case 'Entertainment': return { bg: 'pink', hex: '#FF00A8', light: '#FFE5F6' };
      case 'Shopping': return { bg: 'purple', hex: '#9E00FF', light: '#F5E5FF' };
      case 'Health': return { bg: 'danger', hex: '#FF3B30', light: '#FFEBEA' };
      default: return { bg: 'secondary', hex: '#8E8E93', light: '#F4F4F5' };
    }
  };

  const renderExpenseItem = (item) => {
    const theme = getCategoryColor(item.category);
    return (
      <div 
        key={item._id}
        className="transaction-card d-flex align-items-center mb-3 p-3 rounded-4"
        onClick={() => navigation.navigate('AddExpense', { expense: item })}
      >
        <div 
          className="icon-container rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
          style={{ 
            width: '52px', 
            height: '52px', 
            background: `linear-gradient(135deg, ${theme.hex}22, ${theme.hex}11)`,
            color: theme.hex,
            border: `1px solid ${theme.hex}44`
          }}
        >
          <span className="fs-4 fw-bolder">{item.category[0]}</span>
        </div>
        <div className="flex-grow-1">
          <h6 className="mb-1 fw-bold text-white fs-5">{item.category}</h6>
          <small className="date-text">{format(new Date(item.date), 'MMM dd, yyyy')}</small>
        </div>
        <div className="text-end">
          <div className="fw-bolder fs-5 amount-text" style={{ color: '#FF4D4D' }}>
             -${item.amount.toFixed(2)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container min-vh-100 p-0 pb-5">
      {/* Dynamic Background */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* Header */}
      <div className="container px-4 pt-5 mb-4 position-relative z-1 d-flex justify-content-between align-items-center">
        <div>
          <small className="greeting-text d-block mb-1">Welcome back,</small>
          <h2 className="user-name m-0">{user?.name || 'User'}</h2>
        </div>
        <button className="logout-btn rounded-circle d-flex align-items-center justify-content-center border-0" onClick={logout}>
          <LogOut size={20} />
        </button>
      </div>

      {/* Hero Card */}
      <div className="container px-4 mb-5 position-relative z-1">
        <div className="hero-card rounded-5 p-4 overflow-hidden position-relative shadow-lg">
          <div className="glass-reflection"></div>
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div className="d-flex align-items-center">
              <div className="pill-badge px-3 py-1 rounded-pill d-flex align-items-center">
                <TrendingDown size={14} className="me-2" />
                <span className="fw-semibold fs-6">Monthly Spending</span>
              </div>
            </div>
            <div className="glass-icon rounded-circle d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
              <ArrowUpRight size={22} color="#FFF" />
            </div>
          </div>
          
          <h1 className="hero-amount display-3 mb-1">${totalExpense.toFixed(2)}</h1>
          <p className="hero-subtitle mb-0">Total balance tracked this month</p>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="container px-4 mb-4 position-relative z-1 d-flex justify-content-between align-items-center">
        <h4 className="section-title m-0">Recent Transactions</h4>
        <button 
          className="add-new-btn btn btn-link text-decoration-none fw-bold p-0"
          onClick={() => navigation.navigate('AddExpense')}
        >
          Add New
        </button>
      </div>

      {/* List */}
      <div className="container px-4 mb-5 position-relative z-1">
        <div className="list-container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-grow text-primary" role="status"></div>
            </div>
          ) : (
            expenses.length > 0 ? (
              expenses.map(renderExpenseItem)
            ) : (
              <div className="empty-state text-center py-5 rounded-4">
                 <div className="mb-3 opacity-50 text-white"><TrendingDown size={48} /></div>
                 <h5 className="fw-semibold text-white">No expenses yet</h5>
                 <p className="text-secondary m-0">Start tracking your spending today!</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        className="fab-btn rounded-circle d-flex align-items-center justify-content-center position-fixed"
        onClick={() => navigation.navigate('AddExpense')}
      >
        <Plus size={32} color="#FFF" strokeWidth={2.5} />
      </button>

      <style>{`
        /* Core layout */
        .dashboard-container { 
          background-color: #0A0A0F; 
          color: #FAFAFA;
          position: relative;
          overflow: hidden;
          font-family: inherit;
        }

        /* Beautiful gradient blobs for background */
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 0;
          opacity: 0.5;
        }
        .blob-1 {
          top: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          background: rgba(99, 102, 241, 0.3);
        }
        .blob-2 {
          bottom: 20%;
          right: -150px;
          width: 350px;
          height: 350px;
          background: rgba(236, 72, 153, 0.15);
        }

        /* Header Styles */
        .greeting-text {
          color: #9CA3AF;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .user-name {
          font-weight: 800;
          letter-spacing: -0.5px;
          background: linear-gradient(90deg, #FFFFFF, #A5B4FC);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .logout-btn {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #A5B4FC;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FFF;
          transform: translateY(-2px);
        }

        /* Hero Card - Glassmorphism & Gradient */
        .hero-card {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.5);
          backdrop-filter: blur(20px);
        }
        .glass-reflection {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: skewX(-25deg);
          animation: shine 6s infinite;
        }
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }
        .pill-badge {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-icon {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(5px);
        }
        .hero-amount {
          font-weight: 800;
          letter-spacing: -2px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .hero-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          font-size: 0.95rem;
        }

        /* Section Titles */
        .section-title {
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #FAFAFA;
        }
        .add-new-btn {
          color: #818CF8;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .add-new-btn:hover {
          color: #A5B4FC;
        }

        /* Transaction Cards */
        .transaction-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .transaction-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        }
        .date-text {
          color: #9CA3AF;
          font-weight: 500;
          font-size: 0.85rem;
        }
        .amount-text {
          text-shadow: 0 2px 10px rgba(255, 77, 77, 0.2);
        }

        /* Empty State */
        .empty-state {
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.1);
        }

        /* Context constraints */
        .container { max-width: 600px; }

        /* FAB */
        .fab-btn {
          bottom: 30px;
          right: 30px;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border: none;
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.6), inset 0 2px 4px rgba(255,255,255,0.3);
          z-index: 1000;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
        }
        .fab-btn:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 15px 35px -5px rgba(99, 102, 241, 0.7), inset 0 2px 4px rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
};

export default DashboardScreen;
