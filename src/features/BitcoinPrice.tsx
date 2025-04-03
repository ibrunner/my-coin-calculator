import useBtcPrice from '@/hooks/useBtcPrice';
import { formatCurrency } from '@/lib/utils';

const BitcoinPrice = () => {
  const { data: btcPrice, isLoading } = useBtcPrice();

  const btcFormatted = formatCurrency(btcPrice);

  return <>Bitcoin Price: {isLoading ? 'Loading...' : btcFormatted}</>;
};

export default BitcoinPrice;
