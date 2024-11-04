const brain = require('brain.js');

const fractalParams = {
  x: 0,
  y: 0,
  zoom: 1,
  iterations: 100,
  colors: []
};

function generateFractal(params) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  const neuralNetwork = new brain.recurrent.LSTM();
  neuralNetwork.train([
    { input: [params.x, params.y, params.zoom], output: [params.iterations] }
  ]);

  for (let i = 0; i < params.iterations; i++) {
    const x = neuralNetwork.run([params.x, params.y, params.zoom])[0];
    const y = neuralNetwork.run([params.x, params.y, params.zoom])[1];
    ctx.fillStyle = `hsl(${x * 360}, 100%, 50%)`;
    ctx.fillRect(x * canvas.width, y * canvas.height, 1, 1);
  }
}


function generateRandomParams() {
  fractalParams.x = Math.random() * 2 - 1;
  fractalParams.y = Math.random() * 2 - 1;
  fractalParams.zoom = Math.random() * 10 + 1;
  fractalParams.iterations = Math.floor(Math.random() * 1000) + 100;
  fractalParams.colors = [];
  for (let i = 0; i < 10; i++) {
    fractalParams.colors.push(`hsl(${Math.random() * 360}, 100%, 50%)`);
  }
}


generateRandomParams();
generateFractal(fractalParams);