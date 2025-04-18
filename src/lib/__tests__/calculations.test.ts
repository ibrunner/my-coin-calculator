import dayjs from 'dayjs';
import { generateWeeklyDataPoints } from '../calculations';

describe('generateWeeklyDataPoints', () => {
  const mockCurrentDate = new Date('2024-01-08');

  beforeEach(() => {
    // Mock the current date
    jest.useFakeTimers();
    jest.setSystemTime(mockCurrentDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should handle initial investment correctly', () => {
    const result = generateWeeklyDataPoints({
      initialInvestment: 1000,
      regularInvestment: 100,
      period: 'weekly',
      durationMonths: 1,
      priceTarget: 100000,
      btcPrice: 50000,
      volatility: 0,
      whatIf: 0,
    });

    expect(result[0]).toMatchObject({
      portfolioValue: 1000,
      totalInvested: 1000,
      btcPurchased: 0.02, // 1000/50000
      totalBtcAssets: 0.02,
      btcPrice: 50000,
      isRegularPurchase: false,
    });
  });

  it('should calculate weekly investments correctly', () => {
    const result = generateWeeklyDataPoints({
      initialInvestment: 1000,
      regularInvestment: 100,
      period: 'weekly',
      durationMonths: 1,
      priceTarget: 50000, // Same as initial price for easier testing
      btcPrice: 50000,
      volatility: 0,
      whatIf: 0,
    });

    // Should have ~4-5 weeks in a month
    expect(result.length).toBeGreaterThanOrEqual(4);
    expect(result.length).toBeLessThanOrEqual(5);

    // Check second week's values
    const secondWeek = result[1];
    expect(secondWeek.totalInvested).toBe(1100); // 1000 + 100
    expect(secondWeek.btcPurchased).toBe(0.002); // 100/50000 (just this week's purchase)
    expect(secondWeek.totalBtcAssets).toBe(0.022); // 0.02 + 0.002 (cumulative)
    expect(secondWeek.isRegularPurchase).toBe(true);
  });

  it('should handle monthly investments correctly', () => {
    // Test for 2 months to verify monthly investment behavior
    const result = generateWeeklyDataPoints({
      initialInvestment: 1000,
      regularInvestment: 100,
      period: 'monthly',
      durationMonths: 2,
      priceTarget: 50000,
      btcPrice: 50000,
      volatility: 0,
      whatIf: 0,
    });

    // Initial investment should be on Jan 8
    expect(result[0]).toMatchObject({
      date: new Date('2024-01-08'),
      btcPurchased: 0.02, // Initial 1000/50000
      isRegularPurchase: false,
      totalBtcAssets: 0.02,
    });

    // No other regular purchases in January
    const januaryPurchases = result.filter((p) => {
      const date = dayjs(p.date);
      return (
        date.month() === 0 && // January
        date.date() !== 8 && // Not the initial investment date
        p.isRegularPurchase
      ); // Is a regular purchase
    });

    expect(januaryPurchases.length).toBe(0);

    // February should have one regular purchase in the first week
    const februaryPurchases = result.filter(
      (p) => dayjs(p.date).month() === 1 && p.isRegularPurchase
    );

    expect(februaryPurchases.length).toBe(1);
    expect(februaryPurchases[0].btcPurchased).toBe(0.002); // Regular 100/50000

    // Verify non-purchase weeks have zero BTC purchased
    const nonPurchaseWeeks = result.filter(
      (p) => !p.isRegularPurchase && p !== result[0]
    ); // Exclude initial investment
    nonPurchaseWeeks.forEach((week) => {
      expect(week.btcPurchased).toBe(0);
    });
  });

  it('should calculate price progression correctly', () => {
    const result = generateWeeklyDataPoints({
      initialInvestment: 1000,
      regularInvestment: 100,
      period: 'weekly',
      durationMonths: 1,
      priceTarget: 60000, // 20% increase
      btcPrice: 50000,
      volatility: 0,
      whatIf: 0,
    });

    // Check that the last price is close to target
    const lastPoint = result[result.length - 1];
    expect(lastPoint.btcPrice).toBeCloseTo(60000, -2); // Within 100 of target

    // Check that prices increase linearly
    const firstDelta = result[1].btcPrice - result[0].btcPrice;
    const midPoint = Math.floor(result.length / 2);
    const midDelta = result[midPoint].btcPrice - result[midPoint - 1].btcPrice;
    expect(firstDelta).toBeCloseTo(midDelta, 0); // Should be roughly the same
  });

  it('should calculate total investment correctly for 60 months of monthly investments', () => {
    const result = generateWeeklyDataPoints({
      initialInvestment: 0,
      regularInvestment: 100,
      period: 'monthly',
      durationMonths: 60,
      priceTarget: 50000,
      btcPrice: 50000,
      volatility: 0,
      whatIf: 0,
    });

    const totalInvested = result[result.length - 1].totalInvested;
    expect(totalInvested).toBe(6000); // $100 * 60 months = $6000
  });

  it('should calculate average cost per BTC correctly', () => {
    const result = generateWeeklyDataPoints({
      initialInvestment: 1000,
      regularInvestment: 100,
      period: 'weekly',
      durationMonths: 1,
      priceTarget: 50000, // Same as initial price for easier testing
      btcPrice: 50000,
      volatility: 0,
      whatIf: 0,
    });

    // For initial investment of $1000 at $50000/BTC:
    // - BTC purchased = 0.02 BTC
    // - Average cost = $50000/BTC
    expect(result[0].totalBtcAssets).toBe(0.02);
    expect(result[0].averageCostPerBtc).toBe(50000);

    // For second week with $100 investment at $50000/BTC:
    // - Additional BTC = 0.002 BTC
    // - Total BTC = 0.022 BTC
    // - New average cost = ($50000 * 0.02 + $100) / 0.022
    const secondWeek = result[1];
    expect(secondWeek.totalBtcAssets).toBe(0.022);
    const expectedAverageCost = (50000 * 0.02 + 100) / 0.022;
    expect(secondWeek.averageCostPerBtc).toBeCloseTo(expectedAverageCost, 2);
  });
});
