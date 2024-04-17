export const checkSession = () => {
    const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session='));
    if (sessionCookie) {
       // If the session cookie exists, the user is authenticated.
       // You might need to parse the cookie value to get user information.
       const sessionData = JSON.parse(sessionCookie.split('=')[1]);
       console.log(sessionData);
       return { isAuthenticated: true, user: sessionData.user };
    } else {
       return { isAuthenticated: false, user: null };
    }
   };