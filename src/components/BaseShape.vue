<template>
  <div>
    <select v-model="color">
      <option
        v-for="option in colors"
        :key="option.index"
        :value="option.value"
      >{{ option.text }}</option>
    </select>
    <svg
      xlmns="http://www.w3.org/2000/svg"
      width="600px"
      height="600px"
      viewBox="0 0 1200 1200"
      style="border: 1px solid #ccc;">
      <rect x="50" y="50" width="300" height="300" :stroke="color" fill="#fff" stroke-width="3"></rect>
      <circle cx="600" cy="200" r="150" :stroke="color" fill="#fff" stroke-width="3"></circle>
      <ellipse cx="1000" cy="200" rx="150" ry="100" :stroke="color" fill="#fff" stroke-width="3"></ellipse>
      <line x1="50" y1="450" x2="350" y2="750" :stroke="color" stroke-width="3"></line>
      <polyline points="600,450 750,600 600,750 450,600" :stroke="color" fill="#fff" stroke-width="3"></polyline>
      <polygon points="1000,450 1150,600 1000,750 850,600" :stroke="color" fill="#fff" stroke-width="3"></polygon>
      <path d="M100,1050A100,150,30,1,1,200,1150M100,1050A70,150,30,0,1,200,1150" :stroke="color" fill="#fff" stroke-width="3"></path>
      <path d="M450,850L750,1150" :stroke="color" fill="#fff" stroke-width="3"></path>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'BaseShape',
    data () {
      return {
        colors: [
          {
            index: 0,
            text: 'info',
            value: '#4285f4'
          },
          {
            index: 1,
            text: 'danger',
            value: '#ea4335'
          },
          {
            index: 2,
            text: 'warning',
            value: '#fbbc05'
          },
          {
            index: 3,
            text: 'success',
            value: '#34a853'
          }
        ],
        color: '#ea4335'
      }
    }
  }
</script>

<style scoped>

</style>
