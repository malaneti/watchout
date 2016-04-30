// start slingin' some d3 here.
var score = 0;
var highScore = 0;
//var collisionCounter = 0;
var boardWidth = 600;
var boardHeight = 400;
var svg = d3.select('.board')
            .append('svg')
            .attr('width', boardWidth)
            .attr('height', boardHeight);


var allCircles = [2, 2, 2, 2, 2, 2, 2, 2, 2];

var createCircles = function(arr, color) {
  svg.selectAll('circle')
   .data(arr)
   .enter()
   .append('circle')
   .attr('cx', function(d) {
     return Math.random() * boardWidth;
   })
   .attr('cy', function(d) {
     return Math.random() * boardHeight;
   })
   .attr('r', function(d) {
     return d * 10;
   })
   .attr('class', 'center')
   .attr('class', 'circles')
   .attr('class', 'enemy')
   .attr('position', 'absolute')
   .style('fill', color);
};
createCircles(allCircles, 'green');

var drag = d3.behavior.drag()
  .on('drag', function() {
    var px = player.attr('cx');
    var py = player.attr('cy');
    if (px > 575) {
      player.attr('cx', 575).attr('cy', d3.event.y);
    } else if (px < 25) {
      player.attr('cx', 25).attr('cy', d3.event.y);
    } else if (py > 375) {
      player.attr('cx', d3.event.x).attr('cy', 375);
    } else if (py < 25) {
      player.attr('cx', d3.event.x).attr('cy', 25);
    } else {
      player.attr('cx', d3.event.x).attr('cy', d3.event.y);
    }
  });

svg.select('circle')
    .attr('cx', boardWidth / 2)
    .attr('cy', boardHeight / 2)
    .style('fill', 'orange')
    .attr('class', 'player')
    .classed('enemy', false)
    .call(drag);



var player = svg.select('.player');
var enemies = svg.selectAll('.enemy');


var moveEnemies = function() {
  enemies.transition()
         .duration(1000)
         .attr('cx', function() {
           var random = Math.random() * boardWidth;
           return random;
         })
         .attr('cy', function() {
           var random = Math.random() * boardHeight;
           return random;
         })
         .tween('test', collisionCheck);
};
setInterval(moveEnemies, 1000); 


var distance = function(player, enemy) {
  var px = player.attr('cx');
  var py = player.attr('cy');
  var ex = enemy.cx.animVal.value;
  var ey = enemy.cy.animVal.value;
  return Math.sqrt(Math.pow((px - ex), 2) + Math.pow((py - ey), 2));
};

var collisionCheck = function() {
  return function() {
    var pr = Number(player.attr('r'));
    var er = Number(this.r.animVal.value);
    if ((pr + er) > distance(player, this)) {
      //collisionCounter++
      //d3.select('.coll').text(collisionCounter);
      resetScore();
      d3.select('.board')
        .style('background-color', 'red')
        .transition()
        .delay(100)
        .style('background-color', 'white');

    } else {
      return false;
    }
  };
};


var resetScore = function() {
  if (score > highScore) {
    highScore = score;
    d3.select('.high').text(highScore);
  }
  score = 0;
};

setInterval(function() {
  score++;
  d3.select('.curr').text(score);
}, 50);

