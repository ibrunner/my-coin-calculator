import { DEFAULT_FORM_DATA } from './store';
import { FormData } from './types';
export const getScenarioValues = (
  formData: FormData,
  btcPrice: number
): FormData => {
  const scenario = formData.whatIf;

  switch (scenario) {
    case 1: // Bear
      return {
        ...DEFAULT_FORM_DATA,
        whatIf: scenario,
        priceTarget: Math.floor(btcPrice * 0.5),
        volatility: 2,
        durationMonthsSlider: 3,
      };
    case 2: // Crab
      return {
        ...DEFAULT_FORM_DATA,
        whatIf: scenario,
        priceTarget: btcPrice,
        volatility: 2,
        durationMonthsSlider: 3,
      };
    case 3: // HODL
      return {
        ...DEFAULT_FORM_DATA,
        whatIf: scenario,
        priceTarget: Math.floor(btcPrice * 2),
        volatility: 4,
        durationMonthsSlider: 6,
      };
    case 4: // Moon
      return {
        ...DEFAULT_FORM_DATA,
        whatIf: scenario,
        priceTarget: Math.floor(btcPrice * 3),
        volatility: 2,
        durationMonthsSlider: 2,
      };
    default:
      return formData;
  }
};
