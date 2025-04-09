import { create } from 'zustand';
import { DurationStep, FormData, durationSteps } from './types';

const DEFAULT_FORM_DATA: FormData = {
  initialInvestment: 1000,
  regularInvestment: 100,
  period: 'monthly',
  durationMonthsSlider: 3,
  priceTarget: 100000,
  volatility: 0,
  whatIf: 0,
};

const DEFAULT_STORE_DATA: Omit<FormStore, 'updateFormData' | 'updateField'> = {
  formData: DEFAULT_FORM_DATA,
  durationMonths: durationSteps[DEFAULT_FORM_DATA.durationMonthsSlider],
};

interface FormStore {
  formData: FormData;
  updateFormData: (formData: FormData) => void;
  durationMonths: DurationStep;
}

const useFormStore = create<FormStore>((set) => ({
  ...DEFAULT_STORE_DATA,
  updateFormData: (formData: FormData) => {
    set({
      formData,
      durationMonths: durationSteps[formData.durationMonthsSlider],
    });
  },
}));

export default useFormStore;
