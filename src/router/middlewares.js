import router from "./index";

function auth() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(router.app.$store.state.auth.isAuth);
    }, 0);
  })
}

const ckechAuth = (to, from, next) => {
  auth()
    .then(isAuth => {
      isAuth ? next() : next({ name: 'home' });
    })
};

const postExists = (to, from, next) => {
  const type = to.meta.type;
  const id = to.params.id;
  const promiseSingleName = type === "spending" ? 'spending/spendingSingle' : 'categories/categorySingle';
  const dataSingleName = type === "spending" ? 'spendingSingle' : 'categorySingle';
  const promiseSingle = router.app.$store.dispatch(promiseSingleName, id);

  promiseSingle
    .then(() => {
      const data = router.app.$store.state[type][dataSingleName];
      if(Object.values(data).length) next();
      else next({ name: '404', params: {'0': to.path} });
    })
    .catch(error => {
      console.log(error);
      next({ name: '404', params: {'0': to.path} });
    });
};

export {
  ckechAuth,
  postExists
}
