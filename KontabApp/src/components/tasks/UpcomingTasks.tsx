// src/components/tasks/UpcomingTasks.tsx
import React from 'react';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

const UpcomingTasks: React.FC = () => {
  const tasks = [
    { id: 1, title: 'Deklarata TVSH - Mars', dueDate: 'Në 3 ditë', client: 'Tech Solutions', priority: 'high' },
    { id: 2, title: 'Raporti mujor', dueDate: 'Në 5 ditë', client: 'Green Energy', priority: 'medium' },
    { id: 3, title: 'Përditëso të dhënat', dueDate: 'Në 7 ditë', client: 'Food Express', priority: 'low' },
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-danger-500" />;
      case 'medium':
        return <Calendar className="w-4 h-4 text-warning-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Afatet e Ardhshme</h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Detyrat me afat më të shkurtër
        </p>
      </div>
      
      <div className="p-6 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              {getPriorityIcon(task.priority)}
              <div>
                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{task.client}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                    {task.dueDate}
                  </span>
                </div>
              </div>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-800">
              Shiko
            </button>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-6">
            <CheckCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Nuk ka detyra të ardhshme</p>
          </div>
        )}
      </div>
      
      <div className="p-6 pt-0">
        <Button variant="outline" className="w-full">
          Shiko të gjitha detyrat
        </Button>
      </div>
    </div>
  );
};

export default UpcomingTasks;