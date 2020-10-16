import auth0 from '../../utils/auth0';

export default  function login(req, res) {
  try {    
     auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}