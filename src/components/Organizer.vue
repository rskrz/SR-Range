<template lang="pug">
  .flex.flex-column.items-center
    form(v-on:submit.prevent="addNewPlayer").flex.flex-column.items-center.center.w-100
      label(for="new-player").white.f2.code.mv3 {{ error }}
      .flex.flex-row.bg-light-purple.w-50.br4.mb3.tc.code.h2.justify-between.items-center
        input(v-model="playerName" id="new-player" placeholder="Search for players").bg-transparent.b--transparent.ml4.code.w-100
        .arrow-hover.mr3
          button.bg-transparent.b--transparent.flex.items-center.pa2
            i.arrow
    .flex.flex-column.mt3.pa3.br4.bg-purple.mb6.items-center.w-75
      table.collapse.f4.code.dt--fixed
        thead
          tr.white.f2
            th(style={borderTopLeftRadius: '1rem'}).pa4.w5
            th.w4
              img(src="@/assets/TankIcon.webp")
            th.w4
              img(src="@/assets/OffenseIcon.webp")
            th.w4
              img(src="@/assets/SupportIcon.webp")
            th.w3
        tbody
          tr(v-for="(data,index) in players" :key="index").bb.tc
            td.bg-light-purple.pa3 {{ data.name }}
            td(:style="getColor(data,'tank')" v-on:click="selectCell(data,'tank')").pa3.tc {{ data.player[3]["tank"][0] }}
            td(:style="getColor(data,'damage')" v-on:click="selectCell(data,'damage')").pa3.tc {{ data.player[3]["damage"][0] }}
            td(:style="getColor(data,'support')" v-on:click="selectCell(data,'support')").pa3.tc {{ data.player[3]["support"][0] }}
            td(v-on:click="remove(data.name,index)").bg-gray.pa3.remButton &#10006;
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import axios from "axios"

interface Player {
  0: string
  1: string
  2: number
  3: {
    [role: string]: {
      0: number
      1: object[]
    }
  }
}

interface Data {
  name: string
  player: Player
}

interface activeSR {
  name: string
  role: string
  sr: number
}

@Component({
  name: "Ping"
})
export default class Organizer extends Vue {
  /*public players: object[] = [
    {
      name: "skrz#11924",
      player: {
        0: "",
        1: "",
        2: 3754,
        3: {
          damage: {
            0: 3616,
            1: []
          },
          support: {
            0: 3720,
            1: []
          },
          tank: {
            0: 3927,
            1: []
          }
        }
      }
    }
  ]*/
  public players: object[] = []
  public playerName = ""
  public badColor = "#FF4136"
  public goodColor = "#19A974"
  public selectColor = "#FFB700"
  public actives: activeSR[] = []
  public error = ""
  created(): void {
    //this.playerName = "skrz#11924"
    //this.addNewPlayer()
    //this.playerName = ""
  }
  getColor(data: Data, role: string): object {
    var sr = data.player[3][role][0]
    var activeRoleSr: activeSR = {
      name: data.name,
      role: role,
      sr: sr
    }
    var style = {
      backgroundColor: this.selectColor
    }
    if (this.checkSR(activeRoleSr)) {
      return style
    }
    if (this.checkLimits(sr)) {
      return { backgroundColor: this.goodColor }
    } else return { backgroundColor: this.badColor }
  }
  checkLimits(sr: number): boolean {
    let activeSRs = this.actives.map((a) => a.sr)
    return activeSRs.every((e) => {
      var lim = 1000
      if (sr >= 4000 || e >= 4000) {
        lim = 350
      } else if (sr >= 3500 || e >= 3500) {
        lim = 500
      }
      return Math.abs(sr - e) < lim
    })
  }
  addNewPlayer(): void {
    var newName = this.playerName.replace("#", "-")
    const path = "http://localhost:5000/fetch/" + newName
    axios
      .get(path)
      .then((res) => {
        this.error = "  "
        this.players.push({
          name: this.playerName,
          player: res.data
        })
      })
      .catch((error) => {
        this.error = "User not found"
        //console.error(error)
      })
  }
  remove(name: string, index: number): void {
    this.actives = this.actives.filter((e) => e.name != name)
    this.players.splice(index, 1)
  }
  selectCell(data: Data, role: string): void {
    var activeRoleSr: activeSR = {
      name: data.name,
      role: role,
      sr: data.player[3][role][0]
    }
    if (this.checkLimits(activeRoleSr.sr)) {
      if (!this.checkSR(activeRoleSr)) {
        this.actives.push(activeRoleSr)
      } else {
        var index = this.actives.findIndex(
          (e) => e.name == activeRoleSr.name && e.role == activeRoleSr.role
        )
        this.actives.splice(index, 1)
      }
    } //else this.error = "Cannot select"
  }
  checkSR(obj: activeSR): boolean {
    return this.actives.some((e) => e.name == obj.name && e.role == obj.role)
  }
}
</script>

<style lang="scss" scoped>
.bg-table {
  background-color: #552277;
}
tr:first-child td:first-child {
  border-top-left-radius: 1rem;
}
tr:first-child td:last-child {
  border-top-right-radius: 1rem;
}
tr:last-child td:first-child {
  border-bottom-left-radius: 1rem;
}
tr:last-child td:last-child {
  border-bottom-right-radius: 1rem;
}
tr:last-child {
  border-bottom-style: none;
}
.remButton:hover {
  background-color: #e7040f;
}
.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.arrow-hover:hover {
  .arrow {
    border: solid #ffb700;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
}
</style>
