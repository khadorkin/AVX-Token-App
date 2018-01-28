/*
Return daemon status

Args:
    'session_status' (optional): (bool) true to return session status,
        default is false
Returns:
    (dict) Daemon status dictionary
*/

export default () => ({
  startup_status: {
    code: 'started',
  },
});
