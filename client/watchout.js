// start slingin' some d3 here.
var boardWidth = 600;
var boardHeight = 400;
var svg = d3.select('.board')
            .append('svg')
            .attr('width', boardWidth)
            .attr('height', boardHeight);

var allEnemies = [1,1,1,1,2,2,2,2];

var createEnemies = svg.selectAll('circle')
                       .data(allEnemies)
                       .enter()
                       .append('circle')
                       .attr('cx', function(d) {
                        return d * 10;
                       })
                       .attr('cy', function(d) {
                        return d * 10;
                       })
                       .attr('r', function(d) {
                        return d * 10;
                       })
                       .attr('class', 'center')
                       .attr('class', 'circles')
                       .attr('position', 'absolute')
                       .attr('left', boardWidth / 2)
                       .attr('top', boardHeight / 2)
                       .style('fill', 'white');

var selectEnemies = svg.selectAll('circle');

var moveEnemies = function() {
  selectEnemies.transition()
               .attr('cx', function() {
                var random = Math.random() * 200;
                return random;
               })
               .attr('cy', function() {
                var random = Math.random() * 200;
                return random;
               })
};
setInterval(moveEnemies, 1000);