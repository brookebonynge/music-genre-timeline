document.getElementById("portfolioBtn").addEventListener("click", function() {
    window.open("https://www.brookebonynge.design/", "blank");
 });
// music genres represented by emojis and stream%
const genres = [
    { name: "Classical", year: 1600, emoji: "🎻", streamPercentage: 5 },
    { name: "Blues", year: 1860, emoji: "🎷", streamPercentage: 3 },
    { name: "Jazz", year: 1910, emoji: "🎺", streamPercentage: 7 },
    { name: "Country", year: 1920, emoji: "🤠", streamPercentage: 10 },
    { name: "Swing", year: 1930, emoji: "👯‍♀️", streamPercentage: 2 },
    { name: "Rock and Roll", year: 1950, emoji: "🤘🏼", streamPercentage: 15 },
    { name: "Soul", year: 1960, emoji: "🕺", streamPercentage: 8 },
    { name: "Disco", year: 1970, emoji: "🪩", streamPercentage: 6 },
    { name: "Hip Hop", year: 1973, emoji: "🎧", streamPercentage: 20 },
    { name: "Techno", year: 1980, emoji: "🎛️", streamPercentage: 12 },
    { name: "Grunge", year: 1990, emoji: "🎸", streamPercentage: 9 },
    { name: "EDM", year: 2000, emoji: "💿", streamPercentage: 18 },
    { name: "Pop", year: 2010, emoji: "💅🏻", streamPercentage: 25 }
];


const width = 1000;
const height = 400;
const margin = { top: 50, right: 50, bottom: 50, left: 60 };

const svg = d3.select("#timeline")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// timeline (my x-axis)
const xScale = d3.scaleLinear()
    .domain([1550, 2025])
    .range([margin.left, width - margin.right]);

// streaming percentage (my y-axis)
const yScale = d3.scaleLinear()
    .domain([0, 30])
    .range([height - margin.bottom, margin.top]);

// x-axis
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickValues(d3.range(1550, 2050, 50)).tickFormat(d3.format("d")));
    //.attr("transform", `translate(0,${height - margin.bottom})`)
    //.call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

// y-axis
svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale).tickValues(d3.range(0, 35, 5)).tickFormat(d => d + "%"));
    //.attr("transform", `translate(${margin.left},0)`)
    //.call(d3.axisLeft(yScale).ticks(10).tickFormat(d => d + "%"));

const gridLines = [10, 20, 30];
svg.selectAll("line.grid")
    .data(gridLines)
    .enter()
    .append("line")
    .attr("class", "grid")
    .attr("x1", margin.left) // Start at left margin
    .attr("x2", width - margin.right) // Extend to right margin
    .attr("y1", d => yScale(d)) // Position based on streaming percentage
    .attr("y2", d => yScale(d))
    .attr("stroke", "#ccc") // Light gray for visibility
    .attr("stroke-dasharray", "5,5") // Dashed style
    .attr("stroke-width", 1);

// displaying genre info
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "rgba(0, 0, 0, 0.75)")
    .style("color", "white")
    .style("padding", "5px 10px")
    .style("border-radius", "10px")
    .style("font-size", "12px")
    .style("visibility", "hidden");

// add emojis for each genre at y-position based on streaming percentage
svg.selectAll("text.emoji")
    .data(genres)
    .enter()
    .append("text")
    .attr("class", "emoji")
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d.streamPercentage))
    .attr("text-anchor", "middle")
    .attr("font-size", "30px")
    .text(d => d.emoji)
    .on("mouseover", function(event, d) {
        tooltip.style("visibility", "visible")
               .text(`${d.name}, ${d.year}, ${d.streamPercentage}%`);
    })
    .on("mousemove", function(event) {
        tooltip.style("top", (event.pageY - 10) + "px")
               .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
    });

    