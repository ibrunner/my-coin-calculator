import { create } from 'zustand';
import { DurationStep, FormData } from './types';

const DEFAULT_FORM_DATA: FormData = {
  initialInvestment: 1000,
  regularInvestment: 100,
  period: 'monthly',
  durationMonths: 3,
  priceTarget: 100000,
  volatility: 0,
  whatIf: 0,
};

const DEFAULT_STORE_DATA: Omit<FormStore, 'updateFormData' | 'updateField'> = {
  formData: DEFAULT_FORM_DATA,
  durationMonths: DEFAULT_FORM_DATA.durationMonths,
};

interface FormStore {
  formData: FormData;
  updateFormData: (formData: FormData) => void;
  durationMonths: DurationStep;
}

const useFormStore = create<FormStore>((set, get) => ({
  ...DEFAULT_STORE_DATA,
  setFormData: (formData) =>
    set({
      formData,
      durationMonths: formData.durationMonths,
    }),
}));

export default useFormStore;
