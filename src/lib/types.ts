export const durationSteps = [6, 12, 18, 24, 36, 48, 60] as const;
export type DurationStep = (typeof durationSteps)[number];

export const volatilitySteps = [0, 1, 2, 3, 4] as const;
export type VolatilityStep = (typeof volatilitySteps)[number];

export const whatIfSteps = [0, 1, 2, 3, 4] as const;
export type WhatIfStep = (typeof whatIfSteps)[number];

export const periods = ['weekly', 'monthly'] as const;
export type PeriodStep = (typeof periods)[number];

export const scenarios = ['Custom', 'Bear', 'Crab', 'HODL', 'Moon'] as const;
export type ScenarioStep = (typeof scenarios)[number];
export type FormData = {
  initialInvestment: number;
  regularInvestment: number;
  period: PeriodStep;
  durationMonthsSlider: number;
  priceTarget: number;
  volatility: VolatilityStep;
  whatIf: WhatIfStep;
};

export type TimeSeriesPoint = {
  date: Date;
  btcPrice: number;
  portfolioValue: number;
  totalInvested: number;
  btcPurchased: number;
  isRegularPurchase: boolean;
  totalBtcAssets: number;
  averageCostPerBtc: number;
};
