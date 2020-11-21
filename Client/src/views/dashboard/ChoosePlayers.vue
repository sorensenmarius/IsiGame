<template>
  <v-container
    fluid
    class="pa-0"
  >
    <div>
      <h2 style="text-align: center">
        Choose players!
      </h2>
      <v-row dense>
        <v-col
          v-for="p in players"
          :key="'checkbox-' + p._id"
          cols="4"
          md="2"
        >
          <v-chip
            label
            :color="isChosen(p) ? 'success' : 'indigo'"
            class="choose-players-chip"
            text-color="white"
            @click="() => handleChipClick(p)"
          >
            <v-avatar left>
              <img
                :src="p.avatar ? p.avatar : 'https://svgsilh.com/svg_v2/156584.svg'"
              >
            </v-avatar>
            <span class="choose-players-chip-text">{{ p.name }}</span>
          </v-chip>
        </v-col>
      </v-row>
      <v-row
        justify="center"
      >
        <v-btn
          color="success"
          class="ma-0 mt-2"
          @click="addGame()"
        >
          Add Game
        </v-btn>
      </v-row>
    </div>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        chosenPlayers: [],
      }
    },
    computed: {
      players: function () {
        const players = this.$store.getters.getAllPlayers
        return players.sort((a, b) => (a.games.length > b.games.length ? -1 : 1))
      },
    },
    methods: {
      handleChipClick: function (player) {
        const playerIndex = this.chosenPlayers.indexOf(player)
        if (playerIndex > -1) {
          this.chosenPlayers.splice(playerIndex, 1)
          return
        }
        this.chosenPlayers.push(player)
      },
      isChosen: function (player) {
        return this.chosenPlayers.find(p => p._id === player._id)
      },
      addGame: function () {
        this.$emit('playersChosen', this.chosenPlayers)
      },
    },
  }
</script>

<style scoped>
  .choose-players-chip {
    width: 100%;
  }
  .chosen-players-chip {
    width: 75%;
  }
  .choose-players-chip-text {
    font-size: 12px;
  }
  .chosen-role {
    line-height: 32px;
    font-weight: bold;
  }
</style>
