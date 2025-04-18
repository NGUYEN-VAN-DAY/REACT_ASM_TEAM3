import { useCallback } from 'react';

const useCurrencyFormat = () => {
  
  const formatVND = useCallback((amount) => {
    amount = parseInt(amount) 
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }, []);

  return formatVND;
};

export default useCurrencyFormat;
