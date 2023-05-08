// data url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// html resource selection
let resource = d3.select("#selDataset")

// create  option
d3.json(url).then(function(data) {
    
    let names = data['names'];
    names.forEach(function(id) {
        resource.append('option').text(id).property("value", id)});
    });

// init function to create initial page 
function init(){
    d3.json(url).then((data)=>{
    let names = data['names']
    let otu = names[0]
    console.log(otu)
    bar_chart(otu);
    bubble_chart(otu)
    metadata_info(otu)
    })
}


// bar chart function
function bar_chart(sample_id){
    d3.json(url).then((data)=>{
        let samples = data['samples'];
        // select data and plot 
        let target_sample = samples.filter(x=>x.id==sample_id);
        console.log(target_sample)
        let sample_values = target_sample[0]['sample_values'];
        sample_values = sample_values.slice(0, 10).reverse()
        console.log(sample_values)
        let otu_ids = target_sample[0]['otu_ids'];
        otu_ids = otu_ids.slice(0, 10).reverse().map(id=>`OTU ${id}`)
        console.log(otu_ids)
        let otu_labels = target_sample[0]['otu_labels'];
        otu_labels = otu_labels.slice(0, 10).reverse()
        let trace = {"x":sample_values, "y":otu_ids, "text":otu_labels, type:"bar","orientation":"h"}
        let trace_data = [trace]
        let layout = {title: "Top 10 OTUs Present"}
        Plotly.newPlot('bar', trace_data, layout)
    })}

// bubble chart function
function bubble_chart(sample_id){
    d3.json(url).then((data)=>{
        let samples = data['samples'];
        // select data and plot 
        let target_sample = samples.filter(x=>x.id==sample_id);
        console.log(target_sample)
        let sample_values = target_sample[0]['sample_values'];
        console.log(sample_values)
        let otu_ids = target_sample[0]['otu_ids'];
        console.log(otu_ids)
        let otu_labels = target_sample[0]['otu_labels'];
        var marker_size = 100;
        let trace = {"x":otu_ids, "y":sample_values, "type": 'scatter',
            "mode": 'markers', "text":otu_labels,
            "marker": {"color":otu_ids, colorscale: "Earth", "size":sample_values, 
            sizeref: 2.7 * Math.max(...sample_values) / (marker_size**2),
            sizemode: 'area'}}
        let trace_data = [trace]
        let layout = {xaxis:{title:{text:"OTU ID"}}}
        Plotly.newPlot('bubble', trace_data, layout)
    })
    }

// individual's demographic information function
function metadata_info(sample_id){
    d3.json(url).then((data)=>{
        let metadata = data['metadata']
        // select data and plot 
        let target_metadata = metadata.filter((x=>x.id == sample_id))
        console.log(target_metadata)
        let metadata_value =  target_metadata[0]
        let meta_keys = Object.keys(metadata_value)
        console.log(meta_keys)
        let meta_values = Object.values(metadata_value)
        console.log(meta_values)
        d3.select("#sample-metadata").html("")
        for (let i=0; i<meta_keys.length; i++){
            d3.select("#sample-metadata").append("h5").text(`${meta_keys[i]}: ${meta_values[i]}`)}
        })
    }

// selection function 
function optionChanged(selectObject){
    console.log(selectObject);
    bar_chart(selectObject);
    bubble_chart(selectObject);
    metadata_info(selectObject);
};

//display initial view 
init()