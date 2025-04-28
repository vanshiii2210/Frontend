import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';

function AddWidgetModal({ categoryId, onClose }) {
  const { addWidget } = useDashboard();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (title && content) {
      addWidget(categoryId, { id: Date.now(), title, content });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Widget</h2>
        <input
          type="text"
          placeholder="Widget Title"
          className="border p-2 w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Widget Content"
          className="border p-2 w-full mb-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default AddWidgetModal;
