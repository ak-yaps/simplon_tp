const figure = document.querySelectorAll('.figure');
const operator = document.querySelectorAll('.operator');
var display = document.getElementById('affich_res').value;
var subRes, res;

const value = function value() {
  console.log(this.value);
};

const getFigure = function getFigure() {
  figure.forEach(function(fig) {
    fig.addEventListener('click', value);
  });
};

const getOp = function getOp() {
  operator.forEach(function(op) {
    op.addEventListener('click', value);
  });
};

const dspValue = function dspValue() {
  subRes += getFigure();
};
dspValue();
};
