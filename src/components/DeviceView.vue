<template>
	<div class="DeviceView">
		<b-breadcrumb :items="breadcrumbs" class="crumbsbox"></b-breadcrumb>
		<b-card v-if="JSON.stringify(dataItems) !== '{}'">
			<h2>Temperature: {{ dataItems['temperature'].datasets[0].data[dataItems['temperature'].datasets[0].data.length-1] }} °C</h2>
			<h2>Humidity: {{ dataItems['humidity'].datasets[0].data[dataItems['humidity'].datasets[0].data.length-1] }}%</h2>
			<h2>PPM: {{ dataItems['ppm'].datasets[0].data[dataItems['ppm'].datasets[0].data.length-1] }}</h2>
		</b-card>
		<b-card class="card">
			<p class="card-text">
				<line-chart :chartData="dataItems['temperature']" :options="chartOptions['temperature']" :plugins="[chartjsPluginZoom]"></line-chart>
			</p>
		</b-card>
		<b-card class="card">
			<p class="card-text">
				<line-chart :chartData="dataItems['humidity']" :options="chartOptions['humidity']" :plugins="[chartjsPluginZoom]"></line-chart>
			</p>
		</b-card>
		<b-card class="card">
			<p class="card-text">
				<line-chart :chartData="dataItems['ppm']" :options="chartOptions['ppm']" :plugins="[chartjsPluginZoom]"></line-chart>
			</p>
		</b-card>
		<!-- 
			Workaround for reloading data
			VERY IMPORTANT
		 -->
		<div v-if="reloadData"></div>
	</div>
</template>

<script>
import LineChart from './LineChart'
import * as chartjsPluginZoom from 'chartjs-plugin-zoom'

export default {
	name: 'DeviceView',
	components: {
		LineChart
	},
	data () {
		return {
			dataItems: {},
			reloadData: false,
			breadcrumbs: [],
			chartOptions: {
				ppm: {
					title: {
						text: 'PPM',
						display: true,
						fontSize: 18
					},
					responsive: true,
					maintaintAspectRatio: false,
					scales: {
						yAxes: [{
							ticks: {
								suggestedMin: 0,
								suggestedMax: 400
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
				},
				temperature: {
					title: {
						text: 'Temperature',
						display: true,
						fontSize: 18
					},
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
				},
				humidity: {
					title: {
						text: 'Humidity',
						display: true,
						fontSize: 18
					},
					responsive: true,
					maintaintAspectRatio: false,
					scales: {
						yAxes: [{
							ticks: {
								suggestedMin: 0,
								suggestedMax: 100
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
			},
			chartjsPluginZoom
		}
	},
	methods: {
		onStart () {
			setInterval(this.getData(), 60*1000)
		},
		clearCrumbs () {
			if (this.$session.get('crumbs')) {
				let crumbs = this.$session.get('crumbs')
				if (crumbs.length > 3) {
					crumbs = crumbs.slice(0, 2)
					crumbs[2].active = true
					this.$session.set('crumbs', crumbs)
					return
				}
				this.$session.set('crumbs', null)
			}
		},
		makeCrumbs () {
      if (this.$session.get('crumbs')) {
				this.breadcrumbs = this.$session.get('crumbs')
        return
      }
      this.$session.set('crumbs', [
        {
          text: 'Applications',
          to: {name: 'Home'}
				},
				{
					text: 'Devices',
					to: {name: 'Application View'}
				},
				{
					text: 'Data',
					to: {name: 'Device View'},
					active: true
				}
      ])
      this.makeCrumbs()
		},
		getData () {
			const applicationId = this.$session.get('applicationId')
			const deviceId = this.$session.get('deviceId')
			let date = new Date()
			date.setDate(date.getDate() - .03)

			fetch(`${this.$config.apiUrl}/api/rest/${applicationId}/device/${deviceId}?time=${date.toISOString()}`, {
				method: 'GET'
			}).then(res => res.json()).then(data => {
				for (let i = 0; i < data.length; i++) {
					for (const dataItem in data[i].payload_fields) {
						if (!this.dataItems[dataItem]) {
							const bg1 = Math.floor(Math.random() * 256)
							const bg2 = Math.floor(Math.random() * 256)
							const bg3 = Math.floor(Math.random() * 256)
							this.dataItems[dataItem] = {
								labels: [],
								datasets: [{
									label: dataItem,
									backgroundColor: `rgb(${bg1}, ${bg2}, ${bg3})`,
									data: []
								}]
							}
						}
						this.dataItems[dataItem].datasets[0].data.push(data[i].payload_fields[dataItem])
						// this.dataItems[dataItem].labels.push(this.$moment(data[i].metadata.time).format('D. M. YYYY. HH:mm:ss'))
						this.dataItems[dataItem].labels.push(this.$moment(data[i].metadata.time).format('HH:mm:ss'))
					}
				}
				// Workaround for reloading data
				// VERY IMPORTANT
				this.reloadData = !this.reloadData
			}).catch(err => {
				console.error(err)
			})
		}
	},
	mounted () {
		this.clearCrumbs()
		this.makeCrumbs()
		this.onStart()
	}
}
</script>

<style>
.DeviceView {
  max-width: 1024px;
  margin-left: calc((100% - 1024px)/2);
}
.crumbsbox {
	max-width: 600px;
	margin-left: calc((100% - 600px)/2);
}
.card {
	margin-top: 20px;
	max-width: 75%;
	margin-left: calc((100% - 75%)/2);
}

@media screen and (max-width: 1023px) {
  .DeviceView {
    max-width: 768px;
    margin-left: calc((100% - 768px)/2);
  }
}

@media screen and (max-width: 767px) and (orientation: portrait) {
	.DeviceView {
		width: 100%;
		margin-left: 0;
	}
	.crumbsbox {
		max-width: 100%;
		margin-left: 0;
	}
	.card {
		max-width: 100%;
		margin-left: 0;
	}
}
</style>
