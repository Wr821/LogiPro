import React from 'react';

const vehiclesData = [
  { id: 'veh1', plate: 'ABC-1234', model: 'Mercedes Actros', year: 2022, km: 150000, status: 'ativo' },
  { id: 'veh2', plate: 'DEF-5678', model: 'Volvo FH', year: 2021, km: 220000, status: 'manutencao' },
];

const VehiclesTable = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Veículos</h2>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
          + Novo Veículo
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ano</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KM</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehiclesData.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{vehicle.plate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{vehicle.model}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{vehicle.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{vehicle.km.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    vehicle.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vehicle.status}
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

export default VehiclesTable;

