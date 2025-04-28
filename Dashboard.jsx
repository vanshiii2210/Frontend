import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import AddWidgetModal from './AddWidgetModal';

function Dashboard() {
  const { categories, removeWidget, searchTerm, setSearchTerm } = useDashboard();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openAddWidgetModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowModal(true);
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div>
      <input
        type="text"
        placeholder="Search Widgets..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredCategories.map(category => (
        <div key={category.id} className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{category.category}</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => openAddWidgetModal(category.id)}
            >
              + Add Widget
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {category.widgets.map(widget => (
              <div key={widget.id} className="border p-4 relative rounded shadow">
                <button
                  className="absolute top-2 right-2 text-red-500"
                  onClick={() => removeWidget(category.id, widget.id)}
                >
                  &times;
                </button>
                <h3 className="font-bold">{widget.title}</h3>
                <p>{widget.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showModal && <AddWidgetModal categoryId={selectedCategoryId} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Dashboard;

