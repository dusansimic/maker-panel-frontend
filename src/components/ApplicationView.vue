<template>
	<div class="ApplicationView">
    <b-breadcrumb :items="breadcrumbs" class="crumbsbox"></b-breadcrumb>
		<b-card-group columns class="cardColumns">
			<b-card :title="device"
							v-for="device in devices" v-bind:key="device">
				<p class="card-text">
					<router-link to="/application/device"><p v-on:click="onClickViewDevice(device)">View device</p></router-link>
				</p>
			</b-card>
		</b-card-group>
	</div>
</template>

<script>
export default {
	name: 'ApplicationView',
	data () {
		return {
			devices: [],
			breadcrumbs: []
		}
	},
	methods: {
		onStart () {
			const applicationId = this.$session.get('applicationId')

			fetch(`${this.$config.apiUrl}/api/rest/${applicationId}/devices`, {
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then(res => res.json()).then(data => {
				this.devices = data
			}).catch(err => {
				console.error(err)
			})
		},
		clearCrumbs () {
			if (this.$session.get('crumbs')) {
				let crumbs = this.$session.get('crumbs')
				if (crumbs.length > 2) {
					crumbs = crumbs.slice(0, 1)
					crumbs[1].active = true
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
					to: {name: 'Application View'},
					active: true
				}
      ])
      this.makeCrumbs()
		},
		onClickViewDevice (id) {
			this.$session.set('deviceId', id)
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
