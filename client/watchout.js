// start slingin' some d3 here.
var boardWidth = 600;
var boardHeight = 400;
var svg = d3.select('.board')
            .append('svg')
            .attr('width', boardWidth)
            .attr('height', boardHeight);

var drag = d3.behavior.drag()
  .on('drag', function(){
    player.attr('cx', d3.event.x).attr('cy' , d3.event.y)});           

var allCircles = [1, 1, 1, 1, 1, 2, 2, 2, 2];


var createCircles = function(arr, color) {
  svg.selectAll('circle')
   .data(arr)
   .enter()
   .append('circle')
   .attr('cx', function(d) {
     return 300;
   })
   .attr('cy', function(d) {
     return 200;
   })
   .attr('r', function(d) {
     return d * 10;
   })
   .attr('class', 'center')
   .attr('class', 'circles')
   .attr('class', 'enemy')
   .attr('position', 'absolute')
   .style('fill', color);
   // .tween
};

createCircles(allCircles, 'white');


svg.select('circle')
    // .datum([{x: 300, y: 200}])
    // .attr('cx', function(d) {
    //   return d[0].x;
    // })
    // .attr('cy', function(d) {
    //   return d[0].y;
    // })
    .style('fill', 'blue')
    .attr('class', 'player')
    .classed('enemy', false)
    .call(drag);

var player = svg.select('.player');
var enemies = svg.selectAll('.enemy');


var moveEnemies = function() {
  enemies.transition()
         .attr('cx', function() {
           var random = Math.random() * boardWidth;
           return random;
         })
         .attr('cy', function() {
           var random = Math.random() * boardHeight;
           return random;
         });
};
setInterval(moveEnemies, 1000); 



var distance = function(player, enemy) {
  var px = player.attr('cx');
  var py = player.attr('cy');
  var ex = enemy.attr('cx');
  var ey = enemy.attr('cy');
  return Math.sqrt(Math.pow((px - ex), 2) + Math.pow((py - ey), 2));
};

 var collisionCheck = function() {
 // _.each(enemies, function(enemy){
 //  //get pr and er
 //   if ((pr + er)< distance (player, enemy)){
 //    return true
 //   }

 // })
//   var pr = player.attr('r');
//   console.log(enemy);
//   var er = enemy.attr('r');
//   if ((pr + er) < distance(player, enemy)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// enemies.each(function(enemy) {
//   if (collisionCheck(player, enemy)) {
//     svg.style('fill', 'red');
//   }
// });

// for (var x = 0; x < enemies[0].length; x++) {
//   if (collisionCheck(player, enemies[0][x])) {
//     svg.style('fill', 'red');
//   }
// }