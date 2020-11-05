import auth0 from '../../utils/auth0';

export default  function login(req, res) {
  try {        
     let redirectTo = req.query.redirectTo;    
     if(!redirectTo){
      redirectTo = '/';
     }

     auth0.handleLogin(req, res, {
       redirectTo: redirectTo
     });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}