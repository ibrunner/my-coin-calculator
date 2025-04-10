const applyVolatility = (
  basePrice: number,
  progressRatio: number, // 0-1 time position
  volatilityLevel: number // 0-4 from form
): number => {
  const primaryWaveAmplitude = volatilityLevel * 0.05;
  const primaryWaveFrequency = 8;
  const secondaryWaveAmplitude = volatilityLevel * 0.02;
  const secondaryWaveFrequency = 20;

  // Primary wave: medium frequency, amplitude scales with volatility level
  const primaryWave =
    Math.sin(progressRatio * Math.PI * primaryWaveFrequency) *
    primaryWaveAmplitude;

  // Secondary wave: higher frequency, smaller amplitude
  const secondaryWave =
    Math.sin(progressRatio * Math.PI * secondaryWaveFrequency) *
    secondaryWaveAmplitude;

  return basePrice * (1 + primaryWave + secondaryWave);
};

export default applyVolatility;
