export default {

  totalSpent(store) {
    return store.spending.reduce((sum, cur) => {
      return +sum + +cur.amount;
    }, 0);
  },
  
  getSpendingById: state => id => state.spending.find(item => item.id === id),
  
}