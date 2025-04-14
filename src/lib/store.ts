import { create } from 'zustand';
import { getScenarioValues } from './scenarios';
import { DurationStep, durationSteps, FormData, WhatIfStep } from './types';

export const DEFAULT_FORM_DATA: FormData = {
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
  updateFormData: (formData: FormData, btcPrice?: number) => void;
  durationMonths: DurationStep;
}

const useFormStore = create<FormStore>((set) => ({
  ...DEFAULT_STORE_DATA,
  updateFormData: (formData: FormData, btcPrice?: number) => {
    // reset whatIf to zero when other fields change in this update
    const currentFormData = useFormStore.getState().formData;

    const hasOtherFieldsChanged = Object.entries(formData).some(
      ([key, value]) => {
        if (key === 'whatIf') return false;

        const currentValue = currentFormData[key as keyof FormData];
        // Handle case where value might be an array
        const normalizedValue = Array.isArray(value) ? value[0] : value;
        const normalizedCurrentValue = Array.isArray(currentValue)
          ? currentValue[0]
          : currentValue;

        const changed = normalizedValue !== normalizedCurrentValue;

        return changed;
      }
    );

    // update formData with scenario values if btcPrice is available
    let updatedFormData = btcPrice
      ? getScenarioValues(formData, btcPrice)
      : formData;

    updatedFormData = hasOtherFieldsChanged
      ? { ...updatedFormData, whatIf: 0 as WhatIfStep }
      : updatedFormData;

    set({
      formData: updatedFormData,
      durationMonths: durationSteps[formData.durationMonthsSlider],
    });
  },
}));

export default useFormStore;
