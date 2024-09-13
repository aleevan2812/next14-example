import { AppContext } from '@/app/AppProvider';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
