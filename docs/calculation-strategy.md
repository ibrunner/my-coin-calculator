# Weekly Portfolio Value Calculation Strategy

## Overview

This document outlines the implementation strategy for calculating portfolio values at weekly intervals with volatility effects simulated using sine waves. The approach will extend our Zustand store to include time series data while maintaining separation of calculation logic.

## Implementation Plan

### Phase 1: Core Calculation Module (30 min)

1. Create a pure calculation module in `src/lib/calculations.ts` with these functions:

   - `generateWeeklyDatePoints`: Generate array of dates for the projection period
   - `applyVolatility`: Function to add sine wave volatility to a base price curve
   - `calculateCoinPurchaseAtPoint`: Calculate coins purchased at a specific time point

2. Testing:
   - Write simple test cases with known inputs/outputs
   - Verify calculations in browser console

### Phase 2: Extend Store for Time Series Data (30 min)

1. Update `src/lib/types.ts`:

   - Add `TimeSeriesPoint` interface with date, price, value, etc.
   - Update store types to include time series arrays

2. Extend `src/lib/store.ts`:

   - Add `timeSeriesData` array to store state
   - Create derived state selector for accessing time series data
   - Add calculation trigger when input parameters change

3. Testing:
   - Log store updates to ensure calculations trigger properly
   - Verify data structure format is consistent

### Phase 3: Hook for Time Series Access (20 min)

1. Create `src/hooks/usePortfolioTimeSeries.ts`:

   - Access and memoize time series data from store
   - Provide formatted/filtered data as needed by UI components
   - Handle loading states and missing data

2. Testing:
   - Create a simple component to render time series data
   - Verify data is properly formatted for chart components

### Phase 4: Volatility Implementation (30 min)

1. Enhance calculation module:

   - Implement primary sine wave function with configurable amplitude/frequency
   - Add secondary wave function for more complex patterns
   - Create intensity multiplier based on form's volatility slider

2. Testing:
   - Create visual test to show volatility effects
   - Verify different volatility levels produce reasonable results

### Phase 5: Chart Integration (20 min)

1. Update `src/features/ProjectionChart.tsx`:

   - Use new time series hook to access data
   - Modify chart to display weekly intervals
   - Add tooltips showing detailed info at each point

2. Testing:
   - Verify chart renders properly with time series data
   - Check responsiveness with different data sets

## Implementation Details

### Time Series Data Structure

```typescript
interface TimeSeriesPoint {
  date: Date;
  bitcoinPrice: number;
  portfolioValue: number;
  investedAmount: number;
  coinsPurchased: number;
}
```

### Volatility Function

```typescript
function applyVolatility(
  basePrice: number,
  progressRatio: number, // 0-1 time position
  volatilityLevel: number // 0-4 from form
): number {
  // Primary wave: medium frequency, amplitude scales with volatility level
  const primaryWave =
    Math.sin(progressRatio * Math.PI * 8) * (volatilityLevel * 0.05);

  // Secondary wave: higher frequency, smaller amplitude
  const secondaryWave =
    Math.sin(progressRatio * Math.PI * 20) * (volatilityLevel * 0.02);

  return basePrice * (1 + primaryWave + secondaryWave);
}
```

### Store Structure

The existing Zustand store will be extended to include:

```typescript
interface CalculationStore {
  weeklyDataPoints: TimeSeriesPoint[];
  volatilityImpact: {
    maxPositiveDeviation: number;
    maxNegativeDeviation: number;
  };
}
```

## Conclusion

This implementation plan allows for incremental development and testing of the weekly time series calculation feature. By breaking the work into small, testable chunks, we can maintain quality while making steady progress.
