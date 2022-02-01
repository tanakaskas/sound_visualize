let remove = Array(6);
remove.fill(-1);
let myChart;

function radioDeselection(already, string, flet) {
    if(remove[string] == flet) {
        already.checked = false;
        remove[string] = -1;
    } else {
        remove[string] = flet;
    }
}

function offRadio() {
    let elements = document.querySelectorAll('input[type=radio]');
    let len = elements.length;
    for(let i=0; i<len; i++) {
        elements[i].checked = false;
    }
}

function setChord(notes) {
    offRadio();
    for(let i=0; i<notes.length; i++) {
        document.getElementById(notes[i]).checked = true;
    }
}

function setChart(nums) {
    let ctx = document.getElementById("chart");
    if(typeof myChart != 'undefined') {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type:　'line',
      data: {
          labels: Array(150).fill(''),
          datasets: [{
              label: '',
              data: nums,
              borderColor: 'rgba(0,104,183,0.7)',
              pointRadius: 0,
              fill: false,
          }],
      },
      options: {
        title: {
            display: true,
        },
        scales: {
            yAxes: [{
                ticks: {
                    display: false
                }
            }],
            xAxes: [{
                grid: {
                    stepSize: 10
                }
            }]
        }
      }
    });
}

// fastapiに投げる
$("#look").click( function() {
    let data = Array();
    let radios = document.querySelectorAll('input[type=radio]');
    for(let i=0; i<radios.length; i++) {
        if(radios[i].checked) {
            data.push(parseFloat(radios[i].value))
        }
    }
    console.log(data)
    $.ajax({
        url: '/create_sin_wave',
        type: 'POST',
        data: JSON.stringify(data),
        timeout: 1000,
        dataType: 'json',
        success: function(result) {
            console.log(result.data)
            setChart(result.data)
        },
        error: function() {
            alert("ng");
        }
    });
});

