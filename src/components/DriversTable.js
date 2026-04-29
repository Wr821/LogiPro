import React from 'react';

const driversData = [
  { id: 'drv1', name: 'João Silva', cpf: '123.456.789-00', phone: '(11) 99999-1234', vehicle: 'ABC-1234', status: 'ativo' },
  { id: 'drv2', name: 'Maria Santos', cpf: '987.654.321-00', phone: '(11) 99999-5678', vehicle: 'DEF-5678', status: 'férias' },
];

const DriversTable = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Motoristas</h2>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium">
          + Novo Motorista
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {driversData.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{driver.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{driver.cpf}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{driver.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{driver.vehicle}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    driver.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
                  <button className="text-red-600 hover:text-red-900">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriversTable;

