export default {
  
  data() {
    return {
      resultItems: [], // Итоговые записи
      defaultItems: [], // Все записи
      pagLength: 0, // Количество страниц
      itemsVisible: 8, // Сколько отображать записей
      page: +this.$route.query.page || 1, // Текущая страница
    }
  },

  watch: {
    page: {
      handler(page) {
        this.$router.push({ name: this.$route.name, query: {page: page} });
        this.setPagination(page);
      }
    }
  },
  
  methods: {
    setupPagination(array) {
      this.defaultItems = _.chunk(array, this.itemsVisible);
      this.pagLength = _.size(this.defaultItems);
      this.setPagination(this.page);
    },
  
    setPagination(page) {
      this.resultItems = this.defaultItems[page - 1] || this.defaultItems[0];
    }
  }
  
}