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
import SummarizeIcon from '@mui/icons-material/Summarize';
import RevenueCard from 'ui-component/cards/RevenueCard';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import Tester from '../../../src/assets/images/tester-no-bg.gif';
import Zoom from '@mui/material/Zoom';

// ==============================|| SAMPLE PAGE ||============================== //

const FrontPage = () => {
    // const [languages, setLanguages] = useState<any>([]);
    const theme = useTheme();
    // const navigate = useNavigate();
    // // const dispatch = useDispatch();
    // // const link = useSelector((state: any) => state.link.link);

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
    // useEffect(() => {
    //     fetchStats('');
    // }, []);
    // const fetchStats = async (value: string) => {
    //     try {
    //         await axiosServices
    //             .post('http://127.0.0.1:8000/get_statistics', {
    //                 link: value
    //             })
    //             .then(async (response: any) => {
    //                 if (Object.keys(response.data).length > 0) {
    //                     const languageFileCount: any = [];
    //                     const languageLineCount: any = [];

    //                     for (const obj of Object.keys(response.data)) {
    //                         languageFileCount.push(response.data[obj].files);
    //                     }

    //                     for (const obj of Object.keys(response.data)) {
    //                         languageLineCount.push(response.data[obj].code);
    //                     }

    //                     setLanguages([languages, ...Object.keys(response.data)]);
    //                     // setLanguageSeries([...languageCount]);
    //                     dispatch({
    //                         type: 'link',
    //                         payload: {
    //                             link: value,
    //                             language: languages
    //                         }
    //                     });
    //                     setChartData({
    //                         series: [...languageFileCount],
    //                         options: {
    //                             chart: {
    //                                 type: 'donut',
    //                                 animations: {
    //                                     enabled: true, // Enable animations
    //                                     easing: 'easeout', // Choose the easing function
    //                                     speed: 800, // Animation duration in milliseconds
    //                                     animateGradually: {
    //                                         enabled: true,
    //                                         delay: 150
    //                                     },
    //                                     dynamicAnimation: {
    //                                         enabled: true,
    //                                         speed: 350
    //                                     }
    //                                 }
    //                             },

    //                             responsive: [
    //                                 {
    //                                     breakpoint: 480,
    //                                     options: {
    //                                         chart: {
    //                                             width: 200
    //                                         },
    //                                         legend: {
    //                                             position: 'bottom'
    //                                         }
    //                                     }
    //                                 }
    //                             ],
    //                             labels: [...Object.keys(response.data)]
    //                         }
    //                     });

    //                     setPieChartData({
    //                         series: [...languageLineCount],
    //                         options: {
    //                             chart: {
    //                                 type: 'donut',
    //                                 animations: {
    //                                     enabled: true, // Enable animations
    //                                     easing: 'easeout', // Choose the easing function
    //                                     speed: 800, // Animation duration in milliseconds
    //                                     animateGradually: {
    //                                         enabled: true,
    //                                         delay: 150
    //                                     },
    //                                     dynamicAnimation: {
    //                                         enabled: true,
    //                                         speed: 350
    //                                     }
    //                                 }
    //                             },

    //                             responsive: [
    //                                 {
    //                                     breakpoint: 480,
    //                                     options: {
    //                                         chart: {
    //                                             width: 200
    //                                         },
    //                                         legend: {
    //                                             position: 'bottom'
    //                                         }
    //                                     }
    //                                 }
    //                             ],
    //                             labels: [...Object.keys(response.data)]
    //                         }
    //                     });
    //                 }
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <Grid container style={{ width: '100%' }}>
            <Grid container item xs={6}>
                <img src={Tester} alt="loading..." />
            </Grid>
            {/* <Grid item xs={12}>
                <MainCard title="Project Link">
                    <InputSection get={fetchStats} />
                    <Grid container justifyContent="center">
                        <Typography variant="subtitle1" marginTop="10px" color="grey">
                            Make sure the source code is kept in ./src/main folder and test cases are kept in in the ./src/test/ folder{' '}
                        </Typography>
                    </Grid>
                </MainCard>
            </Grid> */}
            <Grid item container xs={6}>
                <Grid container style={{ width: '100%' }}>
                    {' '}
                    <Grid container item xs={12} spacing={3} style={{ marginTop: '1px' }}>
                        <Grid item xs={10} justifyContent="center" marginLeft={10}>
                            <RevenueCard
                                secondary="Test Case Coverage"
                                content="Get the test case coverage for each test case"
                                iconPrimary={CodeIcon}
                                color={theme.palette.secondary.main}
                                onClick={() => {
                                    // navigate('/test_case', { replace: true });
                                }}
                            />
                        </Grid>

                        <Grid item xs={10} justifyContent="center" marginLeft={10}>
                            <RevenueCard
                                secondary="Identification of Buggy Methods"
                                content="Get the list of buggy methods through analysing testcases"
                                iconPrimary={BugReportIcon}
                                color={theme.palette.primary.main}
                                onClick={() => {
                                    // navigate('/bug', { replace: true });
                                }}
                            />
                        </Grid>

                        <Grid item xs={10} justifyContent="center" marginLeft={10}>
                            <RevenueCard
                                secondary="Identification of Buggy Files"
                                content="Get the list of buggy files by analysing the bug reports"
                                iconPrimary={SummarizeIcon}
                                color={theme.palette.primary[800]}
                                onClick={() => {
                                    // navigate('/bug', { replace: true });
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FrontPage;
