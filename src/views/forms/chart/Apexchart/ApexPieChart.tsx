// material-ui

// third-party
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// chart options

// ==============================|| PIE CHART ||============================== //

const ApexPieChart = ({ labels_chart, series_chart }: any) => {
    const [chartData, setChartData] = useState<any>({
        series: series_chart,
        options: {
            chart: {
                type: 'donut'
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        }
    });
    useEffect(() => {
        setChartData({
            series: series_chart,
            options: {
                chart: {
                    type: 'donut'
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                ]
            }
        });
    }, [series_chart, labels_chart]);

    return (
        <div>
            <ReactApexChart options={chartData.options} series={chartData.series} type="pie" height="350" />
        </div>
    );
};

export default ApexPieChart;
