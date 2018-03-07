<script>
import {Line, mixins} from 'vue-chartjs'
import * as chartjsPluginZoom from 'chartjs-plugin-zoom'
const {reactiveProp} = mixins

export default Line.extend({
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
		this.addPlugin(chartjsPluginZoom)
		console.log(this.options)
		this.renderChart(this.chartData, this.options)
	}
})
</script>
