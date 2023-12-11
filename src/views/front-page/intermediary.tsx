/*  eslint-disable */
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import InputSection from 'layout/MainLayout/Header/InputSection';
// import ReactApexChart from 'react-apexcharts';
import axiosServices from 'utils/axiosServices';
import { useEffect, useState } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import RevenueCard from 'ui-component/cards/RevenueCard';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import Tester from '../../../src/assets/images/tester-no-bg.gif';

// ==============================|| SAMPLE PAGE ||============================== //

const IntermediatePage = () => {
    const [languages, setLanguages] = useState<any>([]);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const link = useSelector((state: any) => state.link.link);

    // const [languageSeries, setLanguageSeries] = useState<any>([]);

    const [chartData, setChartData] = useState<any>({
        series: [],
        options: {
            chart: {
                type: 'donut'
            }
        }
    });

    const [pieChart, setPieChartData] = useState<any>({
        series: [],
        options: {
            chart: {
                type: 'donut'
            }
        }
    });
    useEffect(() => {
        fetchStats('');
    }, []);
    const fetchStats = async (value: string) => {
        try {
            await axiosServices
                .post('http://127.0.0.1:8000/get_statistics', {
                    link: value
                })
                .then(async (response: any) => {
                    if (Object.keys(response.data).length > 0) {
                        const languageFileCount: any = [];
                        const languageLineCount: any = [];

                        for (const obj of Object.keys(response.data)) {
                            languageFileCount.push(response.data[obj].files);
                        }

                        for (const obj of Object.keys(response.data)) {
                            languageLineCount.push(response.data[obj].code);
                        }

                        setLanguages([languages, ...Object.keys(response.data)]);
                        // setLanguageSeries([...languageCount]);
                        dispatch({
                            type: 'link',
                            payload: {
                                link: value,
                                language: languages
                            }
                        });
                        setChartData({
                            series: [...languageFileCount],
                            options: {
                                chart: {
                                    type: 'donut',
                                    animations: {
                                        enabled: true, // Enable animations
                                        easing: 'easeout', // Choose the easing function
                                        speed: 800, // Animation duration in milliseconds
                                        animateGradually: {
                                            enabled: true,
                                            delay: 150
                                        },
                                        dynamicAnimation: {
                                            enabled: true,
                                            speed: 350
                                        }
                                    }
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
                                ],
                                labels: [...Object.keys(response.data)]
                            }
                        });

                        setPieChartData({
                            series: [...languageLineCount],
                            options: {
                                chart: {
                                    type: 'donut',
                                    animations: {
                                        enabled: true, // Enable animations
                                        easing: 'easeout', // Choose the easing function
                                        speed: 800, // Animation duration in milliseconds
                                        animateGradually: {
                                            enabled: true,
                                            delay: 150
                                        },
                                        dynamicAnimation: {
                                            enabled: true,
                                            speed: 350
                                        }
                                    }
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
                                ],
                                labels: [...Object.keys(response.data)]
                            }
                        });
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container style={{ width: '100%' }}>
            <Grid item xs={12}>
                <MainCard title="Project Link">
                    <InputSection get={fetchStats} />
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1" marginTop="10px" color="grey">
                            Make sure the source code is kept in ./src/main folder and test cases are kept in in the ./src/test/ folder{' '}
                        </Typography>
                    </Grid>
                </MainCard>
            </Grid>

            {languages.length > 0 && (
                <Grid container style={{ width: '100%' }}>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={5}>
                            {languages.length > 0 && (
                                <Grid item xs={12} md={6} lg={6} style={{ height: '50px', marginTop: '10px' }}>
                                    <MainCard title="Percentage of the number of files per language">
                                        <ReactApexChart options={chartData.options} series={chartData.series} type="pie" height="200" />
                                    </MainCard>
                                </Grid>
                            )}
                            <Grid item xs={12} md={6} lg={6} style={{ height: '50px', marginTop: '10px' }}>
                                <MainCard title="Percentage of the number of lines per language">
                                    <ReactApexChart options={pieChart.options} series={pieChart.series} type="donut" height="200" />
                                </MainCard>
                            </Grid>
                        </Grid>

                        {/* <Grid item xs={12}>
                    <MainCard title="Complexity">
                        <ReactApexChart options={barChart.options} series={barChart.series} type="bar" height="200" />
                    </MainCard>
                </Grid> */}
                    </Grid>
                </Grid>
            )}

            <Grid></Grid>
        </Grid>
    );
};

export default IntermediatePage;
