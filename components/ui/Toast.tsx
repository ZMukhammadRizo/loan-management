'use client';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const ToastItem = styled(motion.div)<{ type: ToastType }>`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows.large};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  min-width: 300px;
  max-width: 500px;
  border-left: 4px solid ${props => {
    if (props.type === 'success') return props.theme.colors.success;
    if (props.type === 'error') return props.theme.colors.error;
    return props.theme.colors.primary;
  }};
`;

const IconWrapper = styled.div<{ type: ToastType }>`
  color: ${props => {
    if (props.type === 'success') return props.theme.colors.success;
    if (props.type === 'error') return props.theme.colors.error;
    return props.theme.colors.primary;
  }};
  display: flex;
  align-items: center;
`;

const Message = styled.div`
  flex: 1;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textLight};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getIcon = (type: ToastType) => {
    if (type === 'success') return <FiCheckCircle size={20} />;
    if (type === 'error') return <FiAlertCircle size={20} />;
    return <FiInfo size={20} />;
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer>
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastItem
              key={toast.id}
              type={toast.type}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <IconWrapper type={toast.type}>
                {getIcon(toast.type)}
              </IconWrapper>
              <Message>{toast.message}</Message>
              <CloseButton onClick={() => removeToast(toast.id)}>
                <FiX size={18} />
              </CloseButton>
            </ToastItem>
          ))}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

