import React from 'react';

const maintenancesData = [
  { id: 'm1', vehicle: 'ABC-1234', service: 'Troca de óleo', date: '2024-10-15', cost: 450, status: 'concluído' },
  { id: 'm2', vehicle: 'DEF-5678', service: 'Revisão geral', date: '2024-10-20', cost: 1200, status: 'pendente' },
];

const MaintenancesTable = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Manutenções</h2>
      {/* Table similar to others */}
      <div className="text-center text-gray-500 py-12">Tabela de Manutenções - Próximos passos</div>
    </div>
  );
};

export default MaintenancesTable;

