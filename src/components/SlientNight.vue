<template>
  <div class="container" ref="container">
    <div ref="board" id="board">
      <svg
        xlmns="http://www.w3.org/2000/svg"
        width="1200px"
        height="600px"
        viewBox="0 0 1200 600">
        <defs>
          <!-- 与polyline相比，polygon会将结束点和起始点连接在一起 -->
          <polygon
            id="star"
            points="0,10 2,2 10,0 2,-2 0,-10 -2,-2 -10,0 -2,2"
            fill="#fff"
            ref="star"></polygon>
          <linearGradient id="textGradient">
            <stop
              v-for="(stop, index) in text.stops"
              :key="index"
              :offset="stop.offset"
              :stop-color="stop.color"></stop>
          </linearGradient>
          <radialGradient id="lightGradient">
            <stop
              v-for="(stop, index) in tower.stops"
              :key="index"
              :offset="stop.offset"
              :stop-color="stop.color"></stop>
          </radialGradient>
          <clipPath id="textClip">
            <text
              :x="text.x"
              :y="text.y"
              :font-size="text.fontSize">
              {{ text.text }}
            </text>
          </clipPath>
          <clipPath id="lightClip">
            <polygon :points="tower.lPoints">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                :from="tower.lFrom"
                :to="tower.lTo"
                dur="12s"
                repeatCount="indefinite"/>
            </polygon>
          </clipPath>
          <mask id="moonMask">
            <circle
              :cx="moon.cx"
              :cy="moon.cy"
              :r="moon.r"
              fill="#fff"></circle>
            <circle
              :cx="moon.cx - 25"
              :cy="moon.cy - 15"
              :r="moon.r"
              fill="#000"></circle>
          </mask>
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
          <path
            :d="mount.d"
            :fill="mount.fill"></path>
          <g :transform="house.transform">
            <polygon
              :points="house.rPoints"
              :fill="house.rColor"></polygon>
            <rect
              :x="house.bx"
              :y="house.by"
              :width="house.bWidth"
              :height="house.bHeight"
              :fill="house.bColor"></rect>
            <rect
              :x="house.wx"
              :y="house.wy"
              :width="house.wWidth"
              :height="house.wHeight"
              :fill="house.wColor"></rect>
          </g>
          <circle
            :cx="moon.cx"
            :cy="moon.cy"
            :r="moon.r"
            :fill="moon.color"
            mask="url(#moonMask)"></circle>
          <rect
            x="0"
            y="0"
            width="1200"
            height="600"
            fill="url(#textGradient)"
            clip-path="url(#textClip)"></rect>
          <g :transform="tower.transform">
            <polygon
              :points="tower.bPoints"
              :fill="tower.bColor"></polygon>
            <polygon
              :points="tower.dPoints"
              :fill="tower.dColor"></polygon>
            <circle
              :cx="tower.cx"
              :cy="tower.cy"
              :r="tower.r"
              :fill="tower.rColor"></circle>
            <ellipse
              :cx="tower.cx"
              :cy="tower.cy"
              :rx="tower.lrx"
              :ry="tower.lry"
              fill="url(#lightGradient)"
              clip-path="url(#lightClip)"></ellipse>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SlientNight',
    data () {
      return {
        time: 0,
        starCount: 100,
        stars: [],
        text: null,
        mount: null,
        house: null,
        tower: null,
        moon: null
      }
    },
    created () {
      this.init()
      window.requestAnimationFrame(this.update)
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
          let x = this.random(10, 1190)
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
        this.mount = {
          d: 'M0,474T197,381T594,425T940,519T1200,500v100H0V474',
          fill: '#424242'
        }
      },
      initHouse () {
        this.house = {
          rPoints: '115,55 50,100 180,100',
          rColor: '#28141c',
          bx: 85,
          by: 100,
          bWidth: 60,
          bHeight: 60,
          bColor: '#97715c',
          wx: 95,
          wy: 110,
          wWidth: 15,
          wHeight: 15,
          wColor: '#218de8',
          transform: 'translate(960, 380)'
        }
      },
      initTower () {
        let cx = 100
        let cy = 100
        this.tower = {
          cx: 100,
          cy: 100,
          r: 5,
          rColor: '#fdf8d8',
          bPoints: '100,100 90,160, 110,160',
          bColor: '#8d7783',
          dPoints: '95,152 95,160 100,160 100,152',
          dColor: '#010312',
          lPoints: '100,100 540,80 540,120',
          lrx: 440,
          lry: 120,
          lFrom: '0 ' + cx + ' ' + cy,
          lTo: '360 ' + cx + ' ' + cy,
          stops: [
            {
              offset: '0%',
              color: 'rgba(255, 255, 255, 0.6)'
            },
            {
              offset: '100%',
              color: 'rgba(255, 255, 255, 0)'
            }
          ],
          transform: 'translate(235, 194)'
        }
      },
      initMoon () {
        let cx = 1024
        let cy = 120
        this.moon = {
          cx,
          cy,
          r: 75,
          color: '#fcf6d6'
        }
      },
      initText () {
        this.text = {
          text: 'A Slient Night',
          stops: [
            {
              offset: '5%',
              color: '#91a9e9'
            },
            {
              offset: '50%',
              color: '#3e61a9'
            },
            {
              offset: '95%',
              color: '#152348'
            }
          ],
          x: 100,
          y: 100,
          fontSize: 48
        }
      },
      init () {
        this.initStars()
        this.initMount()
        this.initHouse()
        this.initTower()
        this.initMoon()
        this.initText()
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
