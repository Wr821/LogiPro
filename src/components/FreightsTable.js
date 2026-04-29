import React from 'react';

const freightsData = [
  { id: 'fr1', origin: 'São Paulo', destination: 'Rio de Janeiro', driver: 'João Silva', vehicle: 'ABC-1234', value: 8500, status: 'em rota' },
  { id: 'fr2', origin: 'Curitiba', destination: 'Porto Alegre', driver: 'Maria Santos', vehicle: 'DEF-5678', value: 6200, status: 'concluído' },
];

const FreightsTable = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Fretes</h2>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium">
          + Novo Frete
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origem</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destino</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motorista</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {freightsData.map((freight) => (
              <tr key={freight.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{freight.origin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{freight.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{freight.driver}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{freight.vehicle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">R$ {freight.value.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    freight.status === 'em rota' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {freight.status}
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

export default FreightsTable;

