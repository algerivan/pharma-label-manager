import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MEDICINES } from '../_constants/medicines.constants';

type Medicine = {
  id: number;
  name: string;
  presentation: number;
  concentration: number | null;
  administrationTime: string | null;
  diluent: string | null;
};

type MedicinesState = {
  originalMedicines: Medicine[];
  medicines: Medicine[];
  loading: boolean;
  error: string | null;
  search: string;
  fetchMedicines: () => Promise<void>;
  addMedicine: (medicine: Medicine) => void;
  onSearch: (search: string) => void;
};

export const useMedicineStore = create<MedicinesState>()(
  devtools((set) => ({
    medicines: [],
    loading: false,
    error: null,
    originalMedicines: MEDICINES,
    search: '',

    fetchMedicines: async () => {
      set({ loading: true, error: null });
      try {
        set({
          originalMedicines: MEDICINES,
          medicines: MEDICINES,
          loading: false,
        });
      } catch (e) {
        console.log({ e });
        set({ error: 'Error fetching medicines', loading: false });
      }
    },

    addMedicine: (medicine) => {
      set((state) => ({ medicines: [...state.medicines, medicine] }));
    },

    onSearch: (search: string) => {
      if (!search) {
        set((state) => ({ medicines: state.originalMedicines, search: '' }));
        return;
      }

      set((state) => ({
        medicines: state.originalMedicines.filter((medicine) =>
          medicine.name.toLowerCase().includes(search.toLowerCase())
        ),
        search,
      }));
    },
  }))
);
