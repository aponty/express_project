$(() => {
    console.log('charts script')
    const chart = document.querySelector('#sleepRecords').getContext('2d')

    $.ajax({
        method: 'GET',
        url: '/events',
        success: res => {
            console.log(res)
            const dates = Object.keys(res)
            const values = Object.values(res)
            config.data.labels = dates
            config.data.datasets[0].data = values
            console.log(config.data.labels, config.data.datasets[0].data)
            new Chart(chart, config)
        }
    })

    const config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Sleep Quality",
                backgroundColor: 'rgba(40, 118, 226, .8)',
                borderColor: 'rgba(40, 118, 226, .8)',
                data: [],
                fill: false,
                pointRadius: 3,
                pointHoverRadius: 15,
                showLine: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    right: 30,
                    left: 30
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 15
                }
            },
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false,
                    ticks: {
                        min: -.5,
                        max: 5.5,
                        stepSize: 1
                    }
                }]
            }
        }
    };
    //jquery
})
