import { createContext, useContext, useState, ReactNode } from 'react';

interface PageTitleContextType {
  title: string;
  setTitle: (title: string) => void;
  icon?: ReactNode;
  setIcon: (icon: ReactNode) => void;
  badge?: ReactNode;
  setBadge: (badge: ReactNode) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState<ReactNode>(null);
  const [badge, setBadge] = useState<ReactNode>(null);

  return (
    <PageTitleContext.Provider value={{ title, setTitle, icon, setIcon, badge, setBadge }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle() {
  const context = useContext(PageTitleContext);
  if (context === undefined) {
    throw new Error('usePageTitle must be used within a PageTitleProvider');
  }
  return context;
}