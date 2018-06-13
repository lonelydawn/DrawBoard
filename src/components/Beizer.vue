<template>
  <div>
    <div class="beizer-toolbox">
      <button @click="addPoint">add point</button>
      <button @click="deletePoint">delete point</button>
      <select v-model="pointC">
        <option
          v-for="point in points"
          :key="point.index"
          :value="point">{{ point.name }}</option>
      </select>
      <input type="number" v-model="pointC.cx" placeholder="x">
      <input type="number" v-model="pointC.cy" placeholder="y">
    </div>
    <svg
      xlmns="http://www.w3.org/2000/svg"
      width="1200px"
      height="600px"
      viewBox="0 0 1200 600"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove">
      <circle
        v-for="point in points"
        :key="point.index"
        :cx="point.cx"
        :cy="point.cy"
        :r="point.r"
        :fill="pointC.index === point.index ? '#ea4335' : '#4285f4'"
        :stroke="point.stroke"></circle>
      <path
        v-if="pathCom"
        :d="pathCom"
        stroke="#333"
        fill="rgba(0, 0, 0, 0)"></path>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'Beizer',
    data () {
      return {
        points: [],
        pointValue: {},
        pointC: {},
        index: 0, // 序列化点
        record: {}
      }
    },
    created () {
      this.initRecord()
    },
    methods: {
      initRecord () {
        this.$set(this.record, 'xDev', 0)
        this.$set(this.record, 'yDev', 0)
        this.$set(this.record, 'down', false)
        this.$set(this.record, 'point', {})
      },
      addPoint () {
        let point = {
          index: ++this.index,
          name: 'p' + this.index,
          stroke: 'rgba(192, 192, 192, 0)',
          cx: 100 * this.index,
          cy: 300,
          r: 5
        }
        this.points.push(point)
        this.pointC = point
      },
      deletePoint () {
        let index = this.points.findIndex(point => point.index === this.pointC.index)
        index > -1 && this.points.splice(index, 1)
        if (this.points.length) {
          this.pointC = this.points[0]
        }
      },
      getPath () {
        let path = ''
        this.points.forEach((point, index) => {
          path += `${index === 0 ? 'M' : 'T'}${point.cx},${point.cy}`
        })
        return path
      },
      handleMouseDown (event) {
        this.points.forEach(point => {
          let xDev = event.offsetX - point.cx
          let yDev = event.offsetY - point.cy
          let distance = Math.sqrt(xDev * xDev + yDev * yDev)
          if (distance < point.r) {
            this.pointC = point
            this.record.point = point
            this.record.xDev = xDev
            this.record.yDev = yDev
            this.record.down = true
          }
        })
      },
      handleMouseMove () {
        if (this.record.down) {
          this.record.point.cx = event.offsetX - this.record.xDev
          this.record.point.cy = event.offsetY - this.record.yDev
        }
      },
      handleMouseUp () {
        this.initRecord()
      }
    },
    computed: {
      pathCom () {
        return this.getPath()
      }
    }
  }
</script>

<style scoped>
  .beizer-toolbox {

  }
</style>
