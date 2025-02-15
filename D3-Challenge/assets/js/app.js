var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 80
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;
// var chart = d3.select("#scatter").append("div").classed("chart", true);



// CREATE SVG WRAPPER. APPEND SVG GROUP, SHIFT LEFT  TOP MARINGS
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//APPEND SVG
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// d3.select("body")
//     .append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

//RETRIEVE DATA FROM CSV AND EXECUTE
// d3.csv("data.csv").then(function(data, err) {
//     if (err) throw err
//     console.log(healthData);
//     healthData.forEach(function(data) {
//         data.poverty = +data.poverty;
//         data.healthcare = +data.healthcare;
//     });
d3.csv("assets/data/data.csv")
    .then(function(stateData) {
        console.log(stateData);

        stateData.forEach(function(data) {
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
        });
        
        var xLinearScale = d3
            .scaleLinear()
            .domain([
                d3.min(stateData, d => d.healthcare) * 1.8,
                d3.max(stateData, d => d.poverty) * 1.2
            ])
            .range([0, chartWidth]);
        var yLinearScale = d3
            .scaleLinear()
            .domain([0, d3.max(stateData, d => d.healthcare * 1.2)])
            .range([chartHeight, 0]);

        var bottomAxis = d3.axisBottom (xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        chartGroup
            .append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(bottomAxis);
        chartGroup
            .append("g")
            .call(leftAxis);

        var circles = chartGroup.selectAll("g circle").data(stateData);

        var r = 10;
        var circlesGroup = circles
            .enter()
            .append("g")
            .attr("id", "circlesGroup");
        
        circlesGroup
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", r)
            .classed("stateCircle", true);
        circlesGroup
            .append("text")
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .classed("stateText", true)
            .text(d => d.abbr)
            .attr("font-size", r * 0.95);

        var tooltip = d3
            .tip()
            .attr("class", "d3-tip")
            .offset([40, -20])
            .html(function(d) {
                return `${d.state}<br>Poverty: ${d.poverty}% <br>Lacks Healthcare: ${d.healthcare}%`;
            });
        svg.call(tooltip);

        circlesGroup
            .on("mouseover", function(data) {
                tooltip.show(data, this);
            })
            .on("mouseout", function(data, index) {
                tooltip.hide(data);
            });
        //Create axis labels
        chartGroup
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (chartHeight - 100))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Lacks Healthcare(%)");
        chartGroup
            .append("text")
            .attr(
                "transform",
                `translate(${chartWidth / 2}, ${chartHeight + margin.top - 10})`
            )
            .attr("class", "axisText")
            .text("In Poverty(%)");
    })
    .catch(function(error) {
        console.log(error);
    });

