const applyVolatility = (
  basePrice: number,
  progressRatio: number, // 0-1 time position
  volatilityLevel: number // 0-4 from form
): number => {
  const primaryWaveAmplitude = volatilityLevel * 0.1;
  const primaryWaveFrequency = 4;
  const secondaryWaveAmplitude = volatilityLevel * 0.02;
  const secondaryWaveFrequency = 20;

  // Phase shift based on volatility - at max volatility it's PI (starts with downswing)
  const phaseShift = (volatilityLevel / 4) * Math.PI;

  // Initial dip that scales with volatility
  const initialDip = -Math.exp(-progressRatio * 8) * volatilityLevel * 0.05;

  // Primary wave: medium frequency, amplitude scales with volatility level
  const primaryWave =
    Math.sin(progressRatio * Math.PI * primaryWaveFrequency + phaseShift) *
    primaryWaveAmplitude;

  // Secondary wave: higher frequency, smaller amplitude
  const secondaryWave =
    Math.sin(progressRatio * Math.PI * secondaryWaveFrequency + phaseShift) *
    secondaryWaveAmplitude;

  return basePrice * (1 + primaryWave + secondaryWave + initialDip);
};

export default applyVolatility;
