import { formatBtcAmount, formatCurrency } from '../utils';

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    expect(formatCurrency(-1000)).toBe('-$1,000.00');
  });

  it('should handle undefined values', () => {
    expect(formatCurrency(undefined)).toBeNull();
  });

  it('should respect decimal places', () => {
    expect(formatCurrency(1234.5678, 2)).toBe('$1,234.57');
    expect(formatCurrency(1234.5678, 4)).toBe('$1,234.5678');
  });
});

describe('formatBtcAmount', () => {
  it('should format positive numbers correctly', () => {
    expect(formatBtcAmount(1.23456)).toBe('1.235');
    expect(formatBtcAmount(0.001)).toBe('0.001');
  });

  it('should format zero correctly', () => {
    expect(formatBtcAmount(0)).toBe('0.000');
  });

  it('should handle undefined/null values', () => {
    expect(formatBtcAmount(undefined)).toBe('0.000');
    expect(formatBtcAmount(null)).toBe('0.000');
  });
});
