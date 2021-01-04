function buildMetaData(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultsarray = metadata.filter(sampleobject => sampleobject.id == sample);
        var result = resultsarray[0]
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    })
}


d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultsarray = samples.filter(sampleobject => sampleobject.id == sample);
    var result = resultsarray[0]
    var ids = results.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    var layoutBubble = {
        margin: { t: 0 },
        xaxis: {title: "ID's" },
        hovermode: "closest",
    };
    
    var dataBubble = [
        {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                size: values,
            }
        }
    ];

    Plotly.plot("bubble", dataBubble, layoutBubble);
    var bar_data = [
        {
            y: ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            x: values.slice(0,10).reverse(),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation:"h"
        }
    ];
    
    var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {t: 30, 1: 150}
    };

    Plotly.newPlot("bar", bar_data, barLayout);
});


function init() {
    var selector = d3.select("#selDataset");
    
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetaData(firstSample);
    });
}
