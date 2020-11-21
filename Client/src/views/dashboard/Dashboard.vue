<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <img
      src="/Foospower.png"
      class="dashboard-logo"
    />
    <choose-players
      @playersChosen="generateGame"
    />
    <random-stat-list />
    <create-player-modal
      :show-modal.sync="showCreatePlayerModal"
    />
    <div class="create-buttons">
      <v-btn
        fab
        dark
        color="indigo"
        @click="showCreatePlayerModal = true"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
  import CreatePlayerModal from '../../components/base/CreatePlayerModal'
  import RandomStatList from '../../components/statCards/RandomStatList'
  import ChoosePlayers from './ChoosePlayers'

  export default {
    name: 'Home',
    components: {
      CreatePlayerModal,
      RandomStatList,
      ChoosePlayers,
    },
    data () {
      return {
        fab: false,
        showCreatePlayerModal: false,
      }
    },
    methods: {
      getAllPlayers () {
        this.$store.dispatch('getAllPlayersFromApi')
      },
      generateGame (players) {
        console.log(players)
      },
    },
  }
</script>

<style scoped>
  .create-buttons {
    display: inline-block;
    position: fixed;
    right: 10px;
    bottom: 10px;
  }

  .create-buttons .v-btn {
    margin: 0px 5px;
  }

  .dashboard-logo {
    max-width: min(100%, 300px);
    display: block;
    margin: auto;
  }
</style>
