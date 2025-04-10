import applyVolatility from '../applyVolatility';

describe('applyVolatility', () => {
  const basePrice = 50000; // Example BTC price
  const volatilityLevels = [0, 1, 2, 3, 4];

  it('should return base price at start point (t=0) regardless of volatility', () => {
    volatilityLevels.forEach((volatilityLevel) => {
      const price = applyVolatility(basePrice, 0, volatilityLevel);
      expect(price).toBeCloseTo(basePrice, 4);
    });
  });

  it('should return base price at end point (t=1) regardless of volatility', () => {
    volatilityLevels.forEach((volatilityLevel) => {
      const price = applyVolatility(basePrice, 1, volatilityLevel);
      expect(price).toBeCloseTo(basePrice, 4);
    });
  });

  it('should apply proportional volatility at midpoint (t=0.5)', () => {
    const midpointPrices = volatilityLevels.map((volatilityLevel) =>
      applyVolatility(basePrice, 0.5, volatilityLevel)
    );

    // At volatility 0, price should equal base price
    expect(midpointPrices[0]).toBeCloseTo(basePrice, 4);

    // For each volatility level, check the deviation is proportional
    for (let i = 1; i < volatilityLevels.length; i++) {
      const currentDeviation = Math.abs(midpointPrices[i] - basePrice);
      const previousDeviation = Math.abs(midpointPrices[i - 1] - basePrice);

      // Each level should cause more deviation, roughly proportional to the volatility level
      const ratio = currentDeviation / (previousDeviation || 1);
      expect(ratio).toBeGreaterThan(0.8); // Allow some flexibility due to sine wave interactions
    }
  });
});
