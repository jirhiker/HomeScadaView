function makeChart(elementid){
    const ctx = document.getElementById(elementid).getContext('2d');
    const myChart = new Chart(ctx, {
            type: 'line',
            // data: data,
            options: {
                animation: {
                    duration: 0
                },
                scales: {
                    // y: {
                    //     beginAtZero: true
                    // },
                    x: {
                        type: "time"
                    }
                }
            }
        }
    )
    return myChart;
}

function ajax_observations(name, dsid, chart){
    fetch('http://192.168.1.12:8080/FROST-Server/v1.1/' +
        'Datastreams('+dsid+')/Observations?$orderby=phenomenonTime desc&$top=1000'
    ).then(response=>response.json()
    ).then(rdata=>{
            console.log(rdata)
            console.log(rdata['value'].map(f=>{
                return f['result']
            }))
            const data = {
                labels: rdata['value'].map(f=>{
                    var d = new Date(f['phenomenonTime'])
                    d.setHours(d.getHours()+6)
                    return d
                }),
                datasets: [{
                    label: name,
                    data: rdata['value'].map(f=>{
                        return f['result']
                    }),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };
            chart.data = data
            chart.update()
        }
    )

}