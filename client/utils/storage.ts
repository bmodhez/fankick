/**
 * Storage utility functions for handling localStorage quota issues
 */

export const clearFankickStorage = () => {
  try {
    localStorage.removeItem('fankick-products');
    localStorage.removeItem('fankick-product-changes');
    localStorage.removeItem('fankick-products-version');
    localStorage.removeItem('fankick-currency');
    localStorage.removeItem('fankick-theme');
    console.log('FanKick storage cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing FanKick storage:', error);
    return false;
  }
};

export const getStorageSize = () => {
  let total = 0;
  try {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return 0;
  }
};

export const getFankickStorageSize = () => {
  let total = 0;
  try {
    const fankickKeys = Object.keys(localStorage).filter(key => key.startsWith('fankick-'));
    fankickKeys.forEach(key => {
      total += localStorage[key].length + key.length;
    });
    return total;
  } catch (error) {
    console.error('Error calculating FanKick storage size:', error);
    return 0;
  }
};

export const isStorageQuotaExceeded = (error: any): boolean => {
  return error instanceof DOMException && (
    error.code === 22 || // Chrome, Firefox, Safari
    error.code === 1014 || // Firefox
    error.name === 'QuotaExceededError' ||
    error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
  );
};

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).clearFankickStorage = clearFankickStorage;
  (window as any).getStorageSize = getStorageSize;
  (window as any).getFankickStorageSize = getFankickStorageSize;
}
