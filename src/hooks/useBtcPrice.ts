import { useQuery } from '@tanstack/react-query';

const useBtcPrice = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['btcPrice'],
    queryFn: () => fetchBtcPrice(),
  });

  return { data, isLoading, error };
};

export default useBtcPrice;

async function fetchBtcPrice() {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
  );
  const data = await response.json();
  return data.bitcoin.usd;
}
