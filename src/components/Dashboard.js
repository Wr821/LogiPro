import React, { useState, useEffect } from 'react';
import { Truck, Users, Package } from 'lucide-react';

import VehiclesTable from './VehiclesTable';
import DriversTable from './DriversTable';
import FreightsTable from './FreightsTable';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('stats');
  const [user, setUser] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [stats, setStats] = useState({
    vehicles: 0,
    drivers: 0,
    freights: 0,
  });
  const [loading, setLoading] = useState(true);

  // 🔐 Carregar usuário e empresa
  useEffect(() => {
    const storedUser = localStorage.getItem('logipro_user');
    const storedCompany = localStorage.getItem('company_id');

    setUser(storedUser || 'Usuário');
    setCompanyId(storedCompany);
  }, []);

  // 📊 Buscar dados por empresa
  useEffect(() => {
    if (!companyId) return;

    const fetchStats = async () => {
      try {
        setLoading(true);

        // 🔥 SIMULAÇÃO DE API (substitua pela sua API real)
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              vehicles: Math.floor(Math.random() * 50),
              drivers: Math.floor(Math.random() * 30),
              freights: Math.floor(Math.random() * 100),
            });
          }, 500)
        );

        setStats(response);
      } catch (error) {
        console.error('Erro ao carregar stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [companyId]);

  const tabs = [
    { id: 'stats', label: 'Dashboard', icon: '📊' },
    { id: 'vehicles', label: 'Veículos', icon: Truck },
    { id: 'drivers', label: 'Motoristas', icon: Users },
    { id: 'freights', label: 'Fretes', icon: Package },
  ];

  const renderContent = () => {
    if (!companyId) {
      return (
        <div className="text-center text-red-500 font-semibold">
          Empresa não identificada. Faça login novamente.
        </div>
      );
    }

    if (loading) {
      return <div className="text-center">Carregando dados...</div>;
    }

    switch (activeTab) {
      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Veículos */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <p className="text-sm text-gray-600">Veículos</p>
              <p className="text-4xl font-bold">{stats.vehicles}</p>
              <Truck className="w-10 h-10 text-blue-500 mt-4" />
            </div>

            {/* Motoristas */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <p className="text-sm text-gray-600">Motoristas</p>
              <p className="text-4xl font-bold">{stats.drivers}</p>
              <Users className="w-10 h-10 text-green-500 mt-4" />
            </div>

            {/* Fretes */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <p className="text-sm text-gray-600">Fretes</p>
              <p className="text-4xl font-bold">{stats.freights}</p>
              <Package className="w-10 h-10 text-purple-500 mt-4" />
            </div>
          </div>
        );

      case 'vehicles':
        return <VehiclesTable />;

      case 'drivers':
        return <DriversTable />;

      case 'freights':
        return <FreightsTable />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">LogiPro Dashboard</h1>
          <p className="text-sm text-gray-500">Bem-vindo, {user}</p>
        </div>

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Sair
        </button>
      </header>

      {/* TABS */}
      <div className="p-6">
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-white shadow font-semibold'
                  : 'bg-gray-200'
              }`}
            >
              {typeof tab.icon === 'string' ? tab.icon : <tab.icon className="inline w-4 h-4 mr-1" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTEÚDO */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 