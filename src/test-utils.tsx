import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';

interface CustomOptions extends RenderOptions {
  theme?: 'light' | 'dark' | 'system';
}

function customRender(ui: ReactElement, { theme = 'light', ...options }: CustomOptions = {}) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider defaultTheme={theme} attribute="class" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
  return render(ui, { wrapper, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
