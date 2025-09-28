'use client';

import Layout from '@/components/Layout';
import { Utensils, Plus, Target, TrendingUp, Users, Calendar, Edit, Trash2, Eye, X, Save } from 'lucide-react';
import { useState } from 'react';

export default function NutritionPage() {
  const [showSetMacrosModal, setShowSetMacrosModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newMacroTarget, setNewMacroTarget] = useState({
    clientId: '',
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65
  });

  const [macroTargets, setMacroTargets] = useState([
    {
      id: '1',
      clientName: 'John Doe',
      clientId: 'client1',
      calories: 2000,
      protein: 150,
      carbs: 250,
      fats: 65,
      compliance: 85,
      lastUpdate: '2024-01-20',
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      clientId: 'client2',
      calories: 1800,
      protein: 120,
      carbs: 200,
      fats: 60,
      compliance: 92,
      lastUpdate: '2024-01-19',
    },
    {
      id: '3',
      clientName: 'Mike Johnson',
      clientId: 'client3',
      calories: 2200,
      protein: 180,
      carbs: 275,
      fats: 75,
      compliance: 78,
      lastUpdate: '2024-01-18',
    }
  ]);

  const clients = [
    { id: 'client1', name: 'John Doe' },
    { id: 'client2', name: 'Jane Smith' },
    { id: 'client3', name: 'Mike Johnson' },
    { id: 'client4', name: 'Sarah Wilson' }
  ];

  const handleSetMacroTargets = () => {
    setShowSetMacrosModal(true);
  };

  const handleEditMacros = (target: any) => {
    setSelectedClient(target);
    setNewMacroTarget({
      clientId: target.clientId,
      calories: target.calories,
      protein: target.protein,
      carbs: target.carbs,
      fats: target.fats
    });
    setShowEditModal(true);
  };

  const handleViewDetails = (target: any) => {
    setSelectedClient(target);
    setShowDetailsModal(true);
  };

  const handleSaveMacroTargets = () => {
    if (newMacroTarget.clientId && newMacroTarget.calories > 0) {
      const existingTargetIndex = macroTargets.findIndex(t => t.clientId === newMacroTarget.clientId);
      
      if (existingTargetIndex >= 0) {
        // Update existing target
        const updatedTargets = [...macroTargets];
        updatedTargets[existingTargetIndex] = {
          ...updatedTargets[existingTargetIndex],
          calories: newMacroTarget.calories,
          protein: newMacroTarget.protein,
          carbs: newMacroTarget.carbs,
          fats: newMacroTarget.fats,
          lastUpdate: new Date().toISOString().split('T')[0]
        };
        setMacroTargets(updatedTargets);
      } else {
        // Add new target
        const selectedClient = clients.find(c => c.id === newMacroTarget.clientId);
        const newTarget = {
          id: Date.now().toString(),
          clientName: selectedClient?.name || 'Unknown Client',
          clientId: newMacroTarget.clientId,
          calories: newMacroTarget.calories,
          protein: newMacroTarget.protein,
          carbs: newMacroTarget.carbs,
          fats: newMacroTarget.fats,
          compliance: Math.floor(Math.random() * 30) + 70, // Random compliance for demo
          lastUpdate: new Date().toISOString().split('T')[0]
        };
        setMacroTargets([...macroTargets, newTarget]);
      }

      setShowSetMacrosModal(false);
      setShowEditModal(false);
      setNewMacroTarget({
        clientId: '',
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65
      });
      setSelectedClient(null);
    }
  };

  const handleDeleteTarget = (targetId: string) => {
    setMacroTargets(macroTargets.filter(t => t.id !== targetId));
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'text-green-600';
    if (compliance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceBg = (compliance: number) => {
    if (compliance >= 90) return 'bg-green-100';
    if (compliance >= 80) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <Layout userRole="coach">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nutrition Management</h1>
            <p className="text-gray-600">Set macro targets and track client nutrition progress</p>
          </div>
          <button 
            onClick={handleSetMacroTargets}
            className="flex items-center px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Set Macro Targets
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{macroTargets.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Compliance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(macroTargets.reduce((acc, t) => acc + t.compliance, 0) / macroTargets.length)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Targets Set</p>
                <p className="text-2xl font-bold text-gray-900">{macroTargets.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Updated Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {macroTargets.filter(t => t.lastUpdate === new Date().toISOString().split('T')[0]).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Macro Targets List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Client Macro Targets</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {macroTargets.map((target) => (
              <div key={target.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {target.clientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{target.clientName}</h3>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mt-1">
                        <span><strong>{target.calories}</strong> calories</span>
                        <span><strong>{target.protein}g</strong> protein</span>
                        <span><strong>{target.carbs}g</strong> carbs</span>
                        <span><strong>{target.fats}g</strong> fats</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>Last updated: {new Date(target.lastUpdate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getComplianceBg(target.compliance)} ${getComplianceColor(target.compliance)}`}>
                      {target.compliance}% compliance
                    </div>
                    <button
                      onClick={() => handleViewDetails(target)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditMacros(target)}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTarget(target.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Set Macro Targets Modal */}
        {showSetMacrosModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Set Macro Targets</h3>
                <button
                  onClick={() => setShowSetMacrosModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Client
                  </label>
                  <select
                    value={newMacroTarget.clientId}
                    onChange={(e) => setNewMacroTarget({ ...newMacroTarget, clientId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  >
                    <option value="">Choose a client...</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Calories
                  </label>
                  <input
                    type="number"
                    value={newMacroTarget.calories}
                    onChange={(e) => setNewMacroTarget({ ...newMacroTarget, calories: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="2000"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      value={newMacroTarget.protein}
                      onChange={(e) => setNewMacroTarget({ ...newMacroTarget, protein: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carbs (g)
                    </label>
                    <input
                      type="number"
                      value={newMacroTarget.carbs}
                      onChange={(e) => setNewMacroTarget({ ...newMacroTarget, carbs: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fats (g)
                    </label>
                    <input
                      type="number"
                      value={newMacroTarget.fats}
                      onChange={(e) => setNewMacroTarget({ ...newMacroTarget, fats: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSetMacrosModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMacroTargets}
                  disabled={!newMacroTarget.clientId || !newMacroTarget.calories}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Targets
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Macro Targets Modal */}
        {showEditModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Edit Macro Targets</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client
                  </label>
                  <p className="text-gray-900 font-medium">{selectedClient.clientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Calories
                  </label>
                  <input
                    type="number"
                    value={newMacroTarget.calories}
                    onChange={(e) => setNewMacroTarget({ ...newMacroTarget, calories: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      value={newMacroTarget.protein}
                      onChange={(e) => setNewMacroTarget({ ...newMacroTarget, protein: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carbs (g)
                    </label>
                    <input
                      type="number"
                      value={newMacroTarget.carbs}
                      onChange={(e) => setNewMacroTarget({ ...newMacroTarget, carbs: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fats (g)
                    </label>
                    <input
                      type="number"
                      value={newMacroTarget.fats}
                      onChange={(e) => setNewMacroTarget({ ...newMacroTarget, fats: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMacroTargets}
                  disabled={!newMacroTarget.calories}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Targets
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {showDetailsModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Macro Target Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Client</h4>
                    <p className="text-gray-900 font-medium">{selectedClient.clientName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Daily Targets</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Calories</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedClient.calories}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Protein</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedClient.protein}g</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Carbs</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedClient.carbs}g</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Fats</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedClient.fats}g</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Compliance</h4>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getComplianceBg(selectedClient.compliance)} ${getComplianceColor(selectedClient.compliance)}`}>
                      {selectedClient.compliance}% compliance
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Last Updated</h4>
                    <p className="text-gray-900">{new Date(selectedClient.lastUpdate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditMacros(selectedClient);
                  }}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Edit Targets
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
