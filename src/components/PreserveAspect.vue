<template>
  <div class="container">
    <h2>This is a painter</h2>
    <div class="toolbox">
      <label for="select1"></label>
      <select id="select1" v-model="param1">
        <option
          v-for="option in options1"
          :key="option.text"
          :value="option.text">{{option.text}}</option>
      </select>
      <label for="select2"></label>
      <select id="select2" v-model="param2">
        <option
          v-for="option in options2"
          :key="option.text"
          :value="option.text">{{option.text}}</option>
      </select>
    </div>
    <svg
      xlmns="http://www.w3.org/2000/svg"
      width="400px"
      height="400px"
      viewBox="0 0 600 800"
      :preserveAspectRatio="preserveAspectRatio">
      <circle cx="0" cy="0" r="300"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Painter',
  data () {
    return {
      param1: 'xMidYMid',
      param2: 'meet',
      options1: [
        {
          text: 'xMinYMin'
        },
        {
          text: 'xMinYMid'
        },
        {
          text: 'xMinYMax'
        },
        {
          text: 'xMidYMin'
        },
        {
          text: 'xMidYMid'
        },
        {
          text: 'xMidYMax'
        },
        {
          text: 'xMaxYMin'
        },
        {
          text: 'xMaxYMid'
        },
        {
          text: 'xMaxYMax'
        }
      ],
      options2: [
        {
          text: 'meet'
        },
        {
          text: 'slice'
        }
      ]
    }
  },
  computed: {
    preserveAspectRatio () {
      return this.param1 + ' ' + this.param2
    }
  }
}
</script>

<style scoped>
  svg {
    background-color: #333;
  }
  select {
    padding: 5px 8px;
    font-size: 18px;
  }
  .toolbox {
    height: 50px;
    line-height: 50px;
  }
</style>
