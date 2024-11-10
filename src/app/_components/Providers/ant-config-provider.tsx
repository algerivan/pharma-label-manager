//* Types & Models
import { ReactNode } from 'react';
//* Components
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
//* Utils
import { COLORS } from '@/app/_utils/colors.utils';

interface AntConfigProviderProps {
  children: ReactNode;
}

export const AntConfigProvider = ({ children }: AntConfigProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            selectorBg: COLORS.input.background,
            optionSelectedColor: COLORS.text,
            multipleItemColorDisabled: COLORS.text,
            optionSelectedBg: COLORS.select.selected,
            controlItemBgActive: 'red',
          },
          Card: {
            colorBorderSecondary: COLORS.card.border,
            colorTextDescription: COLORS['secondary-text'],
          },
          Divider: {
            colorSplit: COLORS.divider,
          },
        },
        token: {
          colorTextBase: COLORS.text,
          colorBgElevated: COLORS.card.background,
          colorPrimary: COLORS.primary,
          colorPrimaryBg: COLORS.background,
          colorBgContainer: COLORS.input.background,
          colorBorder: COLORS.input.border,
          colorError: COLORS.feedback.error,
          colorWarning: COLORS.feedback.warning,
        },
      }}
    >
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  );
};
