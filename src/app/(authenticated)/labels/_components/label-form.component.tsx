import { Button, Form, Input, Select, DatePicker, Table } from 'antd';
import { useState } from 'react';
import { useMedicineStore } from '@/app/_store/useMedicineStore';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface MedicationLabelInput {
  key: string;
  date: string;
  service: string;
  bed: number;
  patientName: string;
  medication: string;
  dosage: number;
  hour: number;
}

const SERVICE_OPTIONS = [
  { label: 'ONCOLOGIA', value: 'ONCOLOGIA' },
  { label: 'INFECTOLOGIA', value: 'INFECTOLOGIA' },
  { label: 'CIRUGIA', value: 'CIRUGIA' },
  { label: 'GASTRO', value: 'GASTRO' },
  { label: 'TRAUMATOLOGIA', value: 'TRAUMATOLOGIA' },
  { label: 'MED. INTERNA', value: 'MED. INTERNA' },
];

const PATIENTS_DATA = [
  { label: 'JUAN MARTINEZ RAMOS TORRES', value: '1' },
  { label: 'KENIA VALERIA RAMIREZ SOTO', value: '2' },
  { label: 'ROBERTO MARTINEZ LAUTARO GUZMAN', value: '3' },
  { label: 'CARLOS MARTIN GUZMAN PEREZ', value: '4' },
  { label: 'LUIS ANGEL MALAGON LOPEZ', value: 'pn' },
];

type Medicine = {
  id: number;
  name: string;
  presentation: number;
  concentration: number | null;
  administrationTime: string | null;
  diluent: string | null;
};

const parseMedicinesToOptions = (medicines: Medicine[]) => {
  return medicines.map((medicine) => ({
    label: medicine.name,
    value: medicine.id,
  }));
};

export default function LabelForm() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<MedicationLabelInput[]>([]);
  const [editingKey, setEditingKey] = useState<string>('');
  const [count, setCount] = useState<number>(0);

  const { originalMedicines } = useMedicineStore();

  const isEditing = (record: MedicationLabelInput) => record.key === editingKey;

  const handleAdd = () => {
    const newData: MedicationLabelInput = {
      key: `${dataSource.length + 1}`,
      date: '',
      service: '',
      bed: 0,
      patientName: '',
      medication: '',
      dosage: 0,
      hour: 0,
    };
    console.log({ newData, editingKey, count });
    setDataSource([newData, ...dataSource]);
    setEditingKey(newData.key);
    setCount(count + 1);
  };

  const edit = (record: MedicationLabelInput) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
    try {
      const row = (await form.validateFields()) as MedicationLabelInput;
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      console.log({ newData, index, row, dataSource });
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Error:', errInfo);
    }
  };

  const columns: ColumnsType<MedicationLabelInput> = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      render: (text, record) => {
        return isEditing(record) ? (
          <Form.Item
            name='date'
            style={{ margin: 0 }}
            className='max-w-[200px]'
          >
            <DatePicker format='DD/MM/YYYY' />
          </Form.Item>
        ) : (
          <>{dayjs(text).format('DD/MM/YYYY')}</>
        );
      },
    },
    {
      title: 'Servicio',
      dataIndex: 'service',
      render: (text, record) => {
        return isEditing(record) ? (
          <Form.Item
            name='service'
            style={{ margin: 0 }}
            className='min-w-[150px]'
          >
            <Select options={SERVICE_OPTIONS} />
          </Form.Item>
        ) : (
          <>{text}</>
        );
      },
    },
    {
      title: 'Cama',
      dataIndex: 'bed',
      render: (text, record) => {
        return isEditing(record) ? (
          <Form.Item name='bed' style={{ margin: 0 }} className='max-w-[100px]'>
            <Input type='number' />
          </Form.Item>
        ) : (
          <>{text}</>
        );
      },
    },
    {
      title: 'Paciente',
      dataIndex: 'patientName',
      render: (text, record) => {
        return isEditing(record) ? (
          <Form.Item
            name='patientName'
            style={{ margin: 0 }}
            className='min-w-[200px]'
          >
            <Select options={PATIENTS_DATA} />
          </Form.Item>
        ) : (
          <>{PATIENTS_DATA.find((item) => item.value === text)?.label}</>
        );
      },
    },
    {
      title: 'Medicamento',
      dataIndex: 'medication',
      render: (text, record) => {
        return isEditing(record) ? (
          <Form.Item
            name='medication'
            style={{ margin: 0 }}
            className='min-w-[200px]'
          >
            <Select
              options={parseMedicinesToOptions(originalMedicines)}
              showSearch
              optionFilterProp='label'
            />
          </Form.Item>
        ) : (
          <>{originalMedicines.find((item) => item.id === text)?.name}</>
        );
      },
    },
    {
      title: 'Dosis',
      dataIndex: 'dosage',
      render: (text, record) => {
        return isEditing(record) ? (
          <Form.Item
            name='dosage'
            style={{ margin: 0 }}
            className='max-w-[100px]'
          >
            <Input type='number' suffix='MG' />
          </Form.Item>
        ) : (
          <>{text}</>
        );
      },
    },
    {
      title: 'Hora',
      dataIndex: 'hour',
      render: (text, record) => {
        return isEditing(record) ? (
          <Form.Item
            name='hour'
            style={{ margin: 0 }}
            className='max-w-[100px]'
          >
            <Input type='number' suffix='HRS' />
          </Form.Item>
        ) : (
          <>{text}</>
        );
      },
    },
    {
      title: 'Acciones',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.key)}
              type='link'
              style={{ marginRight: 8 }}
              htmlType='submit'
            >
              Guardar
            </Button>
            <Button onClick={cancel} type='link'>
              Cancelar
            </Button>
          </span>
        ) : (
          <Button
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
            type='link'
          >
            Editar
          </Button>
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
      <Button onClick={handleAdd} type='primary' style={{ marginBottom: 16 }}>
        Agregar Fila
      </Button>
      <Table
        components={{
          body: {
            cell: ({
              children,
              ...restProps
            }: {
              children: React.ReactNode;
            } & React.TdHTMLAttributes<HTMLTableCellElement>) => (
              <td {...restProps}>{children}</td>
            ),
          },
        }}
        bordered
        dataSource={dataSource}
        columns={columns}
        rowClassName={() => 'editable-row'}
        pagination={false}
        className='overflow-x-auto bg-white rounded-md'
      />
    </Form>
  );
}
