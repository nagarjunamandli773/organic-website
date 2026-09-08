/**
 * Safely navigates one step backward in browser history.
 * If there is no prior history entry in the current browser session,
 * it gracefully navigates to the main home route ('/').
 * 
 * @param {Function} navigate - React Router useNavigate hook instance
 * @param {React.MouseEvent} [e] - Optional click event to prevent default behavior
 */
export const handleBackNavigation = (navigate, e) => {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (window.history && window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0) {
    navigate(-1);
  } else {
    navigate('/');
  }
};
