<template>
	<div class="DeviceView">
		<b-breadcrumb :items="breadcrumbs" class="crumbsbox"></b-breadcrumb>
		<b-card-group columns class="cardColumns">
			<b-card :title="dataItem.name"
							v-for="dataItem in dataItems" v-bind:key="dataItem.name">
				<p class="card-text"></p>
			</b-card>
		</b-card-group>
	</div>
</template>

<script>
export default {
	name: 'DeviceView',
	data () {
		return {
			dataItems: [],
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
						if (!this.findItem(dataItem)) {
							this.dataItems.push({
								name: dataItem,
								data: [
									data[i].payload_fields[dataItem]
								]
							})
						} else {
							this.dataItems[this.getItemIndex(dataItem)].data.push(data[i].payload_fields[dataItem])
						}
					}
				}
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
		findItem (itemName) {
			for (const item in this.dataItems) {
				if (item.name === itemName) {
					return true
				}
			}
			return false
		},
		getItemIndex (itemName) {
			let index = 0;
			for (const item in this.dataItems) {
				if (item.name === itemName) {
					return index
				}
				index++
			}
			return -1
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
</style>
