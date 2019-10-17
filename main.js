const app = new Vue({
  el: "#app",
  data: {
    theInput: '',
    result: '',
  },
  methods: {
    calculate() {
      this.result = new Function('return ' + this.theInput)();
    }
  },
  template: `
    <div>
      <input v-model="theInput" placeholder="input field">
      <button v-on:click="calculate()">Get result</button>
      <p>Result: {{ result }}</p>
    </div>
  `,
});
