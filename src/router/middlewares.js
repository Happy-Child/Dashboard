import router from "./index";

function checkAuth() {
  return new Promise(resolve => {
    
    setTimeout(() => {
      resolve(router.app.$store.state.auth.isAuth);
    }, 0);
    
  })
}

const isNotAuthRedirectToLogin = (to, from, next) => {
  
  checkAuth().then(isAuth => {
    isAuth ? next() : next({ name: 'login' });
  })
  
};

const isHasAuthRedirectToAdmin = (to, from, next) => {
  
  checkAuth().then(isAuth => {
    isAuth ? next({ name: 'admin.home' }) : next();
  })
  
};

export {isNotAuthRedirectToLogin, isHasAuthRedirectToAdmin}
