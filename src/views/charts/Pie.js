import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  
  props: {
    options: {
      type: Object,
      default: {}
    },
    data: {
      type: Object,
      default: {}
    }
  },
  
  mounted () {
    this.renderChart(this.data, this.options)
  }
}