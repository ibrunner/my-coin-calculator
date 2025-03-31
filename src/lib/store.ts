import { create } from 'zustand';
import { FormData } from './types';

interface FormStore {
  formData: FormData;
  updateFormData: (formData: FormData) => void;
  updateField: (field: keyof FormData, value: FormData[keyof FormData]) => void;
}

const useFormStore = create<FormStore>((set) => ({
  formData: {
    initialInvestment: 1000,
    regularInvestment: 100,
    period: 'weekly',
    durationMonths: 3,
    priceTarget: 100,
    volatility: 0,
    whatIf: 0,
  },
  updateFormData: (formData: FormData) => set({ formData }),
  updateField: (field: keyof FormData, value: FormData[keyof FormData]) =>
    set((state: { formData: FormData }) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
}));

export default useFormStore;
