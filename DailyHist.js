var dataset = d3.json('PenguinData.json');

dataset.then(function(data){
  initialize(data);
  // console.log(getDayData(1, quizzes));
},
function(error){
  console.log(error);
})

var initialize = function(data){
  var quizzes = data.map(function(d){ return d.quizes; });
  var initial_day_data = getDayData(1, quizzes).sort();
  var percentage = function(d){
    return d.length/initial_day_data.length;
  }
  var screen = {
    width: 500,
    height: 500
  };
  var margins = {
    top: screen.height*0.05,
    left: screen.width*0.1,
    bottom: screen.height*0.05,
    right: screen.width*0.05
  };
  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var svg = d3.select('body')
              .append('svg')
              .attr('height', screen.height)
              .attr('width', screen.width)


 console.log(d3.extent(initial_day_data))
  var xScale = d3.scaleLinear()
                 .domain([0, 11])
                 .nice()
                 .range([margins.left, width])

  var binMaker = d3.histogram()
                   .domain(xScale.domain())
                   .thresholds(xScale.ticks(10));

  var bins = binMaker(initial_day_data)
  console.log(bins)
  var xAxis = d3.axisTop(xScale)
                .ticks(bins.length + 1);

  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(bins, function(d){ return percentage(d); })])
                 .range([height, margins.top])

  var yAxis = d3.axisRight(yScale)
                .ticks(5);

  var plot = svg.append('g')
                .classed('plot', true)

  var frequency_rects = plot.selectAll('rect')
                            .data(bins)
                            .enter()
                            .append('rect')
                            .attr('x', function(d){ return xScale(d.x0); })
                            .attr('y', function(d){ return yScale(percentage(d))}) // Percentage returns the amount of values in each bin divided by the total amount of the array.
                            .attr('width', function(d){ if (d.x1 == d.x0){
                                                          return (xScale(d.x1) - xScale(d.x0))
                                                        }

                                                        return (xScale(d.x1 - 0.1) - xScale(d.x0))
                                                      })
                            .attr('height', function(d){ return (height - yScale(percentage(d))); })
                            .attr('fill', 'blue');
  // svg.append('g')
  //     .attr('transform', 'translate(' + -margins.left / 2 + ',' + (h + margins.bottom + margins.top - (margins.bottom * 0.01)) + ')')
  //     .classed('xAxis', true)
  //     .call(xAxis)
  //
  // svg.append('g')
  //     .attr('transform', 'translate(' + 0 + ',' + (margins.top - margins.bottom) + ')')
  //     .classed('yAxis', true)
  //     .call(yAxis)
  svg.append('g')
     .attr('transform', 'translate(0,' + (screen.height - margins.bottom) + ')')
     .classed('xAxis', true)
     .call(xAxis);

  svg.append('g')
     .attr('transform', 'translate(0,' + (margins.top - margins.bottom) + ')')
     .classed('yAxis', true)
     .call(yAxis);
}

var getDayData = function(day, quizzes){
  var day_data = quizzes.map(function(student){ return student[day-1].grade});

  return day_data;
}
