
// Function to get user from localStorage
export const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
  
  // Function to set user in localStorage
  export const setUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  