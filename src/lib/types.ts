export const durationSteps = [6, 12, 18, 24, 36, 48, 60] as const;
export type DurationStep = (typeof durationSteps)[number];

export const volatilitySteps = [0, 1, 2, 3, 4] as const;
export type VolatilityStep = (typeof volatilitySteps)[number];

export const whatIfSteps = [0, 1, 2, 3, 4] as const;
export type WhatIfStep = (typeof whatIfSteps)[number];

export const periods = ['daily', 'weekly', '2xMonthly', 'monthly'] as const;
export type PeriodStep = (typeof periods)[number];

export type FormData = {
  initialInvestment: number;
  regularInvestment: number;
  period: PeriodStep;
  durationMonthsSlider: number;
  priceTarget: number;
  startPrice: number;
  volatility: VolatilityStep;
  whatIf: WhatIfStep;
};
