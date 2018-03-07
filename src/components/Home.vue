<template>
	<div class="Home">
    <b-breadcrumb :items="breadcrumbs" class="crumbsbox"></b-breadcrumb>
		<b-card-group columns class="cardColumns">
			<b-card :title="application"
							v-for="application in applications" v-bind:key="application">
				<p class="card-text">
					<router-link to="/application"><p v-on:click="onClickViewApplication(application)">View application</p></router-link>
				</p>
			</b-card>
		</b-card-group>
	</div>	
</template>

<script>
export default {
	name: 'Home',
	data () {
		return {
			applications: [],
			breadcrumbs: []
		}
	},
	methods: {
		onStart () {
			fetch(`${this.$config.apiUrl}/api/rest/applications`, {
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then(res => res.json()).then(data => {
				this.applications = data
			}).catch(err => {
				if (err) {
					console.error(err)
				}
			})
		},
		makeCrumbs () {
      this.$session.set('crumbs', [
        {
          text: 'Applications',
          to: {name: 'Home'},
          active: true
        }
      ])
      this.breadcrumbs = this.$session.get('crumbs')
		},
		onClickViewApplication (id) {
			let crumbs = this.$session.get('crumbs')
			crumbs[0].active = false
			crumbs.push({
				text: 'Devices',
				to: {name: 'Application View'},
				active: true
			})
			this.$session.set('crumbs', crumbs)
			this.$session.set('applicationId', id)
		}
	},
	created () {
		this.onStart()
		this.makeCrumbs()
	}
}
</script>

<style>
.Home {
  max-width: 1024px;
  margin-left: calc((100% - 1024px)/2);
}
.crumbsbox {
	max-width: 600px;
	margin-left: calc((100% - 600px)/2);
}

@media screen and (max-width: 1023px) {
  .Home {
    max-width: 768px;
    margin-left: calc((100% - 768px)/2);
  }
}

@media screen and (max-width: 767px) and (orientation: portrait) {
	.Home {
		width: 100%;
		margin-left: 0;
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
