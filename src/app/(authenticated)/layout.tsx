'use client';

import { ReactNode, useState } from 'react';
//* Hooks
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
//* Components
import { Layout, Menu } from 'antd';
import {
  SettingOutlined,
  LeftOutlined,
  RightOutlined,
  DatabaseOutlined,
  IdcardOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getKeyTabSelected = () => {
    if (pathname === '/labels') return '1';
    if (pathname === '/medications') return '2';
    return '3';
  };

  return (
    <Layout className='min-h-screen'>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapse}
        className='bg-white shadow-lg p-2 rounded-xl m-4 fixed h-[calc(100vh-32px)] z-10 overflow-hidden'
        width={250}
        trigger={null}
      >
        <button
          className={`flex items-center py-2 ${
            collapsed ? 'justify-center' : 'justify-end pr-2'
          } hover:cursor-pointer w-full mb-6`}
          onClick={toggleCollapse}
        >
          {collapsed ? (
            <RightOutlined className='text-xl cursor-pointer' />
          ) : (
            <div className='flex flex-row justify-between pl-2'>
              <img
                src='/images/logo-white.webp'
                alt='QFB Manager logo'
                className='object-contain w-4/6'
              />
              <LeftOutlined
                onClick={toggleCollapse}
                className='text-xl cursor-pointer'
              />
            </div>
          )}
        </button>
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[getKeyTabSelected()]}
          items={[
            {
              key: '1',
              icon: <IdcardOutlined />,
              label: 'Etiquetas',
              onClick: () => router.push('/labels'),
            },
            {
              key: '2',
              icon: <DatabaseOutlined />,
              label: 'Medicamentos',
              onClick: () => router.push('/medications'),
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: 'Settings',
            },
          ]}
        />
      </Sider>
      <Layout className='ml-[270px] sm:ml-0'>
        <div className='p-6 overflow-y-auto h-screen'>
          <Content>{children}</Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
