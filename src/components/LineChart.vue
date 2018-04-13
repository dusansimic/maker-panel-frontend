<script>
import {Line, mixins} from 'vue-chartjs'
const {reactiveProp} = mixins

export default {
	extends: Line,
	mixins: [reactiveProp],
	data () {
		return {
			options: {
				responsive: true,
				maintaintAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {
							suggestedMin: 0,
							suggestedMax: 40
						}
					}]
				},
				pan: {
					enabled: true,
					mode: 'x'
				},
				zoom: {
					enabled: true,
					mode: 'x'
				}
			}
		}
	},
	mounted () {
		this.renderChart(this.chartData, this.options)
	}
}
</script>
