export const checkAuthState = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const expirationTimeStr = localStorage.getItem('authExpirationTime');
  
    const expirationTime = expirationTimeStr ? Number(expirationTimeStr) : null;
  
    if (expirationTime && Date.now() > expirationTime) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authExpirationTime');
      localStorage.removeItem('currentUserId');

      return false; 
    }
  
    return isAuthenticated === 'true';
  };