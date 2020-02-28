export default {
  
  getCategoryById: state => id => state.categories.find(item => item.id === id),
  
}