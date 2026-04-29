import React, { useState, useEffect } from 'react';
import { Truck, Users, Package, Wrench, DollarSign, CheckCircle } from 'lucide-react';
import VehiclesTable from './VehiclesTable';
import DriversTable from './DriversTable';

import { statsData } from '../data/stats';

const stats = statsData;

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('stats');
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(localStorage.getItem('logipro_user') || 'Usuário');
  }, []);

const tabs = [
    { id: 'stats', label: 'Dashboard', icon: '📊' },
    { id: 'vehicles', label: 'Veículos', icon: Truck },
    { id: 'drivers', label: 'Motoristas', icon: Users },
    { id: 'freights', label: 'Fretes', icon: Package },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'stats': return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Veículos</p>
                <p className="text-4xl font-bold text-gray-900">{stats.vehicles}</p>
              </div>
              <Truck className="w-16 h-16 text-blue-500 opacity-75" />
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Motoristas</p>
                <p className="text-4xl font-bold text-gray-900">{stats.drivers}</p>
              </div>
              <Users className="w-16 h-16 text-green-500 opacity-75" />
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Fretes</p>
                <p className="text-4xl font-bold text-gray-900">{stats.freights}</p>
              </div>
              <Package className="w-16 h-16 text-purple-500 opacity-75" />
            </div>
          </div>
        </div>
      );
      case 'vehicles': return <VehiclesTable />;
      case 'drivers': return <DriversTable />;
      case 'freights': return <FreightsTable />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🚛</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">LogiPro Dashboard</h1>
              <p className="text-sm text-gray-500">Bem-vindo, {user}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors flex items-center space-x-1 text-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex bg-white/50 backdrop-blur-md rounded-2xl p-1 mb-8 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-white shadow-md text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {typeof tab.icon === 'string' ? (
                <span className="text-xl">{tab.icon}</span>
              ) : (
                <tab.icon className="w-5 h-5" />
              )}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Veículos</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.vehicles}</p>
                </div>
                <Truck className="w-16 h-16 text-blue-500 opacity-75" />
              </div>
            </div>
            {/* Add more stat cards */}
          </div>
        )}

        {activeTab === 'vehicles' && <VehiclesTable />}
        {activeTab === 'drivers' && <DriversTable />}
      </div>
    </div>
  );
};

export default Dashboard;

