<template>
  <div class="container">
    <svg
      xlmns="http://www.w3.org/2000/svg"
      width="600px"
      height="400px"
      viewBox="0 0 600 400">
      <defs>
        <polyline
          id="star"
          points="0,10 2,2 10,0 2,-2 0,-10 -2,-2 -10,0 -2,2"
          fill="#fff"
          ref="star"></polyline>
      </defs>
      <g ref="galaxy">
        <use
          v-for="(star, index) in stars"
          :key="index"
          href="#star"
          :x="star.x"
          :y="star.y"
          :transform="star.transform"
          :opacity="star.opacity"></use>
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'Painter02',
    data () {
      return {
        time: 0,
        starCount: 100,
        stars: [],
        mount: null,
        house: null,
        tree: null,
        moon: null
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.init()
        window.requestAnimationFrame(this.update)
      })
    },
    methods: {
      random (max, min) {
        return min + (max - min) * Math.random()
      },
      operator () {
        return Math.random() > 0.5 ? 1 : -1
      },
      initStars () {
        this.stars = []
        while (this.starCount--) {
          let x = this.random(10, 590)
          let y = this.random(10, 390)
          let opacity = this.random(0, 1)
          this.stars.push(this.starCount > 100
            ? {
              x,
              y,
              opacity,
              base: opacity,
              transform: 'translate(' + x + ',' + y + ') ' +
              'scale(' + this.random(0.1, 0.4) + ') ' +
              'translate(' + -x + ',' + -y + ')',
              direction: this.operator()
            }
            : {
              x,
              y,
              opacity,
              base: opacity,
              transform: 'translate(' + x + ',' + y + ') ' +
              'scale(' + this.random(0.1, 0.3) + ') ' +
              'translate(' + -x + ',' + -y + ')'
            })
        }
      },
      initMount () {

      },
      initHouse () {

      },
      initTree () {

      },
      initMoon () {

      },
      init () {
        this.initStars()
        this.initMount()
        this.initHouse()
        this.initTree()
        this.initMoon()
      },
      update () {
        let factor = Math.sin(++this.time * Math.PI / 360)
        this.stars.forEach(star => {
          star.opacity = star.base + (factor >= 0 ? 1 - star.base : star.base) * factor
        })
        window.requestAnimationFrame(this.update)
      }
    }
  }
</script>

<style scoped>
  svg {
    background-color: #001122;
  }
</style>
