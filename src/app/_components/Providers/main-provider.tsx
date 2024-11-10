'use client';

//* Types & Models
import { ReactNode } from 'react';
//* Providers
import { AntConfigProvider } from './ant-config-provider';

interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
  return <AntConfigProvider>{children}</AntConfigProvider>;
};
