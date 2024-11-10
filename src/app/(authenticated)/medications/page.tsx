'use client';

import { Input, Table, TableColumnsType } from 'antd';
import { useMedicineStore } from '@/app/_store/useMedicineStore';
import { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';

type Medicine = {
  id: number;
  name: string;
  presentation: number;
  concentration: number | null;
  administrationTime: string | null;
  diluent: string | null;
};

const columns: TableColumnsType<Medicine> = [
  {
    title: 'Nombre de Medicamento',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Presentación (mg/ml)',
    dataIndex: 'presentation',
    key: 'presentation',
  },
  {
    title: 'Concentración (mg/ml)',
    dataIndex: 'concentration',
    key: 'concentration',
  },
  {
    title: 'Tiempo de Administración (min/horas)',
    dataIndex: 'administrationTime',
    key: 'administrationTime',
    render: (administrationTime: string | null) => {
      if (!administrationTime) return '-';

      const number = administrationTime.split(' ')[0];

      if (Number(number) >= 100) {
        const hours = Number(number) / 60;
        const decimals = hours % 1 !== 0 ? 1 : 0;
        return (Number(number) / 60).toFixed(decimals) + ' HRS';
      }

      return administrationTime;
    },
  },
  {
    title: 'Diluyente',
    dataIndex: 'diluent',
    key: 'diluent',
  },
];

export default function MedicationsPage() {
  const { medicines, fetchMedicines, onSearch, search } = useMedicineStore();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <section className='p-6 h-full'>
      <header className='flex flex-row justify-between'>
        <h1 className='text-2xl mb-4'>Gestión de Medicamentos</h1>
        <div className='w-1/6'>
          <Input
            value={search}
            onChange={handleSearch}
            placeholder='Buscar...'
            prefix={<SearchOutlined />}
          />
        </div>
      </header>
      <article className='pt-3'>
        <Table
          dataSource={medicines}
          columns={columns}
          rowKey='id'
          className='bg-white shadow-md rounded-lg max-h-full'
          pagination={{
            style: {
              paddingRight: '20px',
            },
            showTotal(total, range) {
              return `Total ${range[0]}-${range[1]} de ${total} items`;
            },
          }}
        />
      </article>
    </section>
  );
}
