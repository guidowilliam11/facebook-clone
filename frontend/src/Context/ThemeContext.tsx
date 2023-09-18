import { createContext, ReactNode, useContext, useState } from 'react';

interface Props {
    children: ReactNode;
  }

// Define the type for the theme context
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// Create a context for the theme
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
const ThemeProvider = ({ children }: Props) => {
  // State to hold the current theme
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeContextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

