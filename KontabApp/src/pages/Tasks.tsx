// src/pages/Tasks.tsx
import React, { useState } from 'react';
import { Plus, Filter, CheckCircle, Clock, AlertCircle, MoreVertical } from 'lucide-react';
import Button from '../components/common/Button';

const Tasks: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const tasks = [
    {
      id: '1',
      title: 'Përgatit deklaratën e TVSH-së për Mars',
      client: 'Tech Solutions Sh.P.K',
      priority: 'high',
      status: 'in_progress',
      dueDate: '2024-04-05',
      assignedTo: 'Kontabilist 1'
    },
    {
      id: '2',
      title: 'Kontrollo faturat e shkurtit',
      client: 'Green Energy AL',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-04-10',
      assignedTo: 'Kontabilist 2'
    },
    {
      id: '3',
      title: 'Përditëso të dhënat e klientit',
      client: 'Food Express',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-03-25',
      assignedTo: 'Kontabilist 1'
    },
    {
      id: '4',
      title: 'Gjenero raportin mujor',
      client: 'Digital Marketing Pro',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-04-15',
      assignedTo: 'Kontabilist 1'
    },
    {
      id: '5',
      title: 'Verifikimi i ekstrakteve bankare',
      client: 'Construct Plus',
      priority: 'medium',
      status: 'in_progress',
      dueDate: '2024-04-08',
      assignedTo: 'Kontabilist 2'
    }
  ];

  const filters = [
    { value: 'all', label: 'Të gjitha' },
    { value: 'pending', label: 'Në pritje' },
    { value: 'in_progress', label: 'Në përpunim' },
    { value: 'completed', label: 'Përfunduar' }
  ];

  const priorities = [
    { value: 'all', label: 'Të gjitha' },
    { value: 'high', label: 'Urgjente' },
    { value: 'medium', label: 'Normale' },
    { value: 'low', label: 'Të ulëta' }
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-danger-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-warning-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-danger-100 text-danger-800 border-danger-200';
      case 'medium':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'low':
        return 'bg-success-100 text-success-800 border-success-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'in_progress':
        return 'bg-primary-100 text-primary-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Përfunduar';
      case 'in_progress':
        return 'Në përpunim';
      case 'pending':
        return 'Në pritje';
      default:
        return 'E panjohur';
    }
  };

  const filteredTasks = selectedFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detyrat</h1>
          <p className="text-gray-600 mt-2">
            Menaxhoni detyrat dhe afatet tuaja
          </p>
        </div>
        <Button variant="primary" icon={Plus}>
          Krijo Detyrë
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900">
            {tasks.length}
          </div>
          <div className="text-sm text-gray-600">Total detyra</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-warning-600">
            {tasks.filter(t => t.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Në pritje</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-primary-600">
            {tasks.filter(t => t.status === 'in_progress').length}
          </div>
          <div className="text-sm text-gray-600">Në përpunim</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-success-600">
            {tasks.filter(t => t.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Përfunduar</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Statusi:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter.value
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm font-medium text-gray-700">Prioriteti:</span>
          {priorities.map(priority => (
            <button
              key={priority.value}
              onClick={() => {/* Implement priority filter */}}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {priority.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Tasks */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Detyra Urgjente
              </h3>
              <AlertCircle className="w-5 h-5 text-danger-500" />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Detyrat me afat të shkurtër
            </p>
          </div>
          <div className="p-6 space-y-4">
            {tasks
              .filter(task => task.priority === 'high')
              .map(task => (
                <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getPriorityIcon(task.priority)}
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'high' ? 'Urgjente' : 
                           task.priority === 'medium' ? 'Normale' : 'Të ulëta'}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {task.client}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Afati: {task.dueDate}
                        </span>
                        <span className="text-xs font-medium">
                          {task.assignedTo}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* All Tasks */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Të gjitha detyrat
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Lista e plotë e detyrave
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detyra
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Klienti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioriteti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statusi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Veprime
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {task.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          Afati: {task.dueDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {task.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getPriorityIcon(task.priority)}
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'high' ? 'Urgjente' : 
                           task.priority === 'medium' ? 'Normale' : 'Të ulëta'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusLabel(task.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">
                        Shiko
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTasks.length === 0 && (
              <div className="p-12 text-center">
                <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Nuk u gjetën detyra</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;