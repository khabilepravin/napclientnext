import auth0 from '../../utils/auth0';

export default  function login(req, res) {
  try {
    console.log('coming in the login flow')
     auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}