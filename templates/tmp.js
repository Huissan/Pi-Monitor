
$(document).ready(function(){
    setInterval("refresh_time()", 1000);
    setInterval("refresh_cpu_temp()", 3000);

    //初始化echarts实例
    var myChart = echarts.init(document.getElementById('cpu_tem'));

    var colors = ['#5793f3', '#d14a61', '#675bba'];


    option = {
        color: colors,

        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data:['CPU温度', 'GPU温度']
        },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '温度  ' + params.value + '：' + params.seriesData[0].data;
                        }
                    }
                },
                data: ["20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00"]
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '温度  ' + params.value + '：' + params.seriesData[0].data;
                        }
                    }
                },
                data: ["20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00"]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name:'CPU温度',
                type:'line',
                xAxisIndex: 1,
                smooth: true,
                data: [31.6, 31.9, 39.0, 36.4, 38.7, 30.7, 30.6, 32.2, 38.7, 38.8, 32.0, 32.3]
            },
            {
                name:'GPU温度',
                type:'line',
                smooth: true,
                data: [21.6, 21.9, 22.0, 23.4, 22.7, 20.7, 20.6, 22.2, 33.7, 28.8, 22.0, 22.3]
            }
        ]
    };

    myChart.setOption(option);

    ////////////////////////////
    //初始化echarts实例
    var cpu_usage = echarts.init(document.getElementById('cpu_usage'));

    option_cpu_usage = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'CPU负载',
                type: 'gauge',
                detail: {formatter:'{value}%'},
                data: [{value: 2, name: '百分比'}]
            }
        ]
    };

    cpu_usage.setOption(option_cpu_usage);
});

function refresh_time() {
    $("#nowtime").text((new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString());
}

function refresh_cpu_temp() {
    $.ajax({
        url:'/',
        data:{k:'p'},
        type:'post',
        dataType:'text',
        success:function(msg){
            $("#cpu").text(msg + "°C");
        }
    })
}


function go(k) {
    $.post('/', {k:k}, function(){});
}

$(function(){
    window.document.onkeydown = abc;

    function abc(env) {
        env = (env) ? env : window.event;

        if (env.keyCode == '87') {
            go('w');
        }
    }
});

function open_light() {
    go('o');
}

function close_light() {
    go('c');
}