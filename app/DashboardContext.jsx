import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

const initialData = [
  {
    id: 1,
    category: 'CSPM Executive Dashboard',
    widgets: [
      { id: 1, title: 'Widget 1', content: 'Random text for Widget 1' },
      { id: 2, title: 'Widget 2', content: 'Random text for Widget 2' }
    ]
  },
];

export const DashboardProvider = ({ children }) => {
  const [categories, setCategories] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');

  const addWidget = (categoryId, widget) => {
    setCategories(prev =>
      prev.map(cat => cat.id === categoryId ? { ...cat, widgets: [...cat.widgets, widget] } : cat)
    );
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) }
          : cat
      )
    );
  };

  return (
    <DashboardContext.Provider value={{ categories, addWidget, removeWidget, searchTerm, setSearchTerm }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
