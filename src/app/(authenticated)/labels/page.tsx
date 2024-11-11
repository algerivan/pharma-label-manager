'use client';

import type { TableColumnsType } from 'antd';
import { Table } from 'antd';
import LabelForm from './_components/label-form.component';

type MedicationLabel = {
  id: number;
  date: string;
  service: string;
  bed: number;
  patientName: string;
  medication: string;
  dosage: number;
  hour: number;
  quantity: number;
  finalVolume: number;
};

const columns: TableColumnsType<MedicationLabel> = [
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
    sorter: (a, b) => a.date.localeCompare(b.date),
  },
  {
    title: 'Servicio',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Unidad de Cuidado',
    dataIndex: 'bed',
    key: 'bed',
  },
  {
    title: 'Paciente',
    dataIndex: 'patientName',
    key: 'patientName',
  },
  {
    title: 'Medicamento',
    dataIndex: 'medication',
    key: 'medication',
  },
  {
    title: 'Dosis',
    dataIndex: 'dosage',
    key: 'dosage',
  },
  {
    title: 'Hora',
    dataIndex: 'hour',
    key: 'hour',
  },
  {
    title: 'Cantidad',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Volumen Final',
    dataIndex: 'finalVolume',
    key: 'finalVolume',
  },
];

export default function LabelsPage() {
  return (
    <div>
      <LabelForm />
    </div>
  );
}
