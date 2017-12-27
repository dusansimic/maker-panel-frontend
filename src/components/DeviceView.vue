<template>
	<div class="DeviceView">
		<b-breadcrumb :items="breadcrumbs" class="crumbsbox"></b-breadcrumb>
		<b-card-group columns class="cardColumns">
			<b-card :title="dataItem.label"
							v-for="dataItem in dataItems" v-bind:key="dataItem.label">
				<p class="card-text">
					<line-chart :data="dataItem.data"></line-chart>
				</p>
			</b-card>
		</b-card-group>
	</div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
	name: 'DeviceView',
	components: {
		LineChart
	},
	data () {
		return {
			dataItems: {},
			breadcrumbs: []
		}
	},
	methods: {
		onStart () {
			const applicationId = this.$session.get('applicationId')
			const deviceId = this.$session.get('deviceId')

			fetch(`${this.$config.apiUrl}/api/rest/${applicationId}/device/${deviceId}`, {
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then(res => res.json()).then(data => {
				for (let i = 0; i < data.length; i++) {
					for (const dataItem in data[i].payload_fields) {
						if (!this.dataItems[dataItem]) {
							const bg1 = Math.floor(Math.random() * 256);
							const bg2 = Math.floor(Math.random() * 256);
							const bg3 = Math.floor(Math.random() * 256);
							this.dataItems[dataItem] = {
								label: dataItem,
								backgroundColor: `rgb(${bg1}, ${bg2}, ${bg3})`,
								data: []
							}
						}
						this.dataItems[dataItem].data.push(data[i].payload_fields[dataItem])
					}
				}
				console.log(this.dataItems)
			}).catch(err => {
				console.error(err)
			})
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
		fillData () {
			
		}
	},
	created () {
		this.clearCrumbs()
		this.makeCrumbs()
		this.onStart()
	}
}
</script>

<style>
.crumbsbox {
	max-width: 500px;
	margin-left: calc((100% - 500px)/2);
}

@media screen and (max-width: 767px) and (orientation: portrait) {
	.DeviceView {
		width: 95%;
		margin-left: calc((100% - 95%)/2);
	}
	.crumbsbox {
		max-width: 100%;
		margin-left: 0;
	}
	.cardColumns {
		max-width: 100%;
		margin-left: 0;
	}
}
</style>
