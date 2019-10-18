const app = new Vue({
  el: "#app",
  data: {
    theInput: '((1+2)+(3*44+1))+12',
    result: '',
  },
  methods: {
    calculate() {
      this.result = this.doBrackets(this.theInput);
    },
    doBrackets(parens) {
      const re = /\([0-9\+\-\*\/]+\)/;
      const reNum = /^\d+$/;
      let expression = '';
      while (re.test(parens)) {
        expression = parens.match(re)[0]
        expression = expression.slice(1, expression.length - 1);
        parens = parens.replace(re, this.doArithmetic(expression));
      }
      return reNum.test(parens) ? parens : this.doArithmetic(parens);
    },
    doArithmetic(expression) {
      const reMD = /[0-9]+[\*\/][0-9]+/;
      const reAS = /[0-9]+[\+\-][0-9]+/;
      let elements;

      while (reAS.test(expression)) {
        elements = expression.split(/([\+\-])/g);
        if(elements[1] == '+') {
          expression =
            +this.doBrackets(elements[0]) + +this.doBrackets(elements[2]);
        } else if(elements[1] == '-') {
          expression =
            +this.doBrackets(elements[0]) - +this.doBrackets(elements[2]);
        }
      }

      while (reMD.test(expression)) {
        elements = expression.split(/([\*\/])/g);
        if(elements[1] == '*') {
          expression =
            +this.doBrackets(elements[0]) * +this.doBrackets(elements[2]);
        } else if(elements[1] == '/') {
          expression =
            +this.doBrackets(elements[0]) / +this.doBrackets(elements[2]);
        }
      }

      return expression;
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
