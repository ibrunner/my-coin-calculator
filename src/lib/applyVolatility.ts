const applyVolatility = (
  basePrice: number,
  progressRatio: number, // 0-1 time position
  volatilityLevel: number // 0-4 from form
): number => {
  const primaryWaveAmplitude = volatilityLevel * 0.1;
  const primaryWaveFrequency = 4;
  const secondaryWaveAmplitude = volatilityLevel * 0.02;
  const secondaryWaveFrequency = 20;

  // Phase shift based on volatility level
  const phaseShift = Math.PI / 2; // Constant phase shift to ensure consistent midpoint behavior

  // Dampening factor that goes to zero at start and end
  const dampening = Math.sin(progressRatio * Math.PI);

  // Primary wave: medium frequency, amplitude scales with volatility level
  const primaryWave =
    Math.sin(progressRatio * Math.PI * primaryWaveFrequency + phaseShift) *
    primaryWaveAmplitude;

  // Secondary wave: higher frequency, smaller amplitude
  const secondaryWave =
    Math.sin(progressRatio * Math.PI * secondaryWaveFrequency + phaseShift) *
    secondaryWaveAmplitude;

  // Apply dampening to ensure we return to base price at start and end
  const volatilityEffect = (primaryWave + secondaryWave) * dampening;

  return basePrice * (1 + volatilityEffect);
};

export default applyVolatility;
