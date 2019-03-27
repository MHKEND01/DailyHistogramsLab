var dataset = d3.json('PenguinData.json');



dataset.then(function(data){
  initialize(1, data);
  d3.selectAll("input").on("change", function(){
    update(parseInt(this.value,10), data)
});
},
function(error){
  console.log(error);
})

var initialize = function(day, data){
  var quizzes = data.map(function(d){ return d.quizes; });
  var initial_day_data = getDayData(day, quizzes).sort();
  var percentage = function(d){
    return d.length/initial_day_data.length;
  }
  var screen = {
    width: 500,
    height: 500
  };
  var margins = {
    top: screen.height*0.05,
    left: screen.width*0.16,
    bottom: screen.height*0.05,
    right: screen.width*0.05
  };
  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var svg = d3.select('body')
              .insert('svg', ":first-child")
              .attr('height', screen.height)
              .attr('width', screen.width)
              .style("float","left")


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
                .tickValues([0,1,2,3,4,5,6,7,8,9,10]);

  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(bins, function(d){ return percentage(d); })])
                 .nice()
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
  svg.append('g')
     .attr('transform', 'translate(0,' + (screen.height - margins.bottom) + ')')
     .classed('xAxis', true)
     .call(xAxis)
     .selectAll("text")
     .style("text-anchor", "start")
     .attr("transform", "translate(" + ((width/20) - 10) + ", 0)");;

  svg.append('g')
     .attr('transform', 'translate('+(screen.width/10) +','+ (margins.top - margins.bottom) + ')')
     .classed('yAxis', true)
     .call(yAxis);

     svg.append("text")
       .attr("transform",
             "translate(" + ((width/2) + margins.left -margins.right) + " ," +
                            (height + margins.top + 20) + ")")
       .style("text-anchor", "middle")
       .text("Grade");

       svg.append("text")
         .attr("transform",
               "translate("+(screen.width*0.05)+"," +
                              ((height/2) + margins.top + 20) + ") rotate(-90)")
         .style("text-anchor", "middle")
         .text("Proportion of Students");

         svg.append("text")
           .attr("transform",
                 "translate(" + ((width/2) + margins.left -margins.right) + " ," +
                                (margins.top*0.5) + ")")
           .style("text-anchor", "middle")
           .text("Quiz Grade Distribution");

           var form =d3.select("form")
                        .style("float","left");
}

var update = function(day, data){
  d3.selectAll("svg").remove()
  var quizzes = data.map(function(d){ return d.quizes; });
  var initial_day_data = getDayData(day, quizzes).sort();
  var percentage = function(d){
    return d.length/initial_day_data.length;
  }
  var screen = {
    width: 500,
    height: 500
  };
  var margins = {
    top: screen.height*0.05,
    left: screen.width*0.16,
    bottom: screen.height*0.05,
    right: screen.width*0.05
  };
  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

  var svg = d3.select('body')
              .insert('svg', ":first-child")
              .attr('height', screen.height)
              .attr('width', screen.width)
              .style("float","left")


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
                .tickValues([0,1,2,3,4,5,6,7,8,9,10]);

  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(bins, function(d){ return percentage(d); })])
                 .nice()
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
  svg.append('g')
     .attr('transform', 'translate(0,' + (screen.height - margins.bottom) + ')')
     .classed('xAxis', true)
     .call(xAxis)
     .selectAll("text")
     .style("text-anchor", "start")
     .attr("transform", "translate(" + ((width/20) - 10) + ", 0)");;

  svg.append('g')
     .attr('transform', 'translate('+(screen.width/10) +','+ (margins.top - margins.bottom) + ')')
     .classed('yAxis', true)
     .call(yAxis);

     svg.append("text")
       .attr("transform",
             "translate(" + ((width/2) + margins.left -margins.right) + " ," +
                            (height + margins.top + 20) + ")")
       .style("text-anchor", "middle")
       .text("Grade");

       svg.append("text")
         .attr("transform",
               "translate("+(screen.width*0.05)+"," +
                              ((height/2) + margins.top + 20) + ") rotate(-90)")
         .style("text-anchor", "middle")
         .text("Proportion of Students");

         svg.append("text")
           .attr("transform",
                 "translate(" + ((width/2) + margins.left -margins.right) + " ," +
                                (margins.top*0.5) + ")")
           .style("text-anchor", "middle")
           .text("Quiz Grade Distribution");

           var form =d3.select("form")
                        .style("float","left");
}

var getDayData = function(day, quizzes){
  var day_data = quizzes.map(function(student){ return student[day-1].grade});

  return day_data
}
