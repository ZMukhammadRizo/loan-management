'use client';

import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/globalStyles';
import StyledComponentsRegistry from '@/lib/registry';
import { ToastProvider } from '@/components/ui';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ToastProvider>
          {children}
        </ToastProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}

