/*  eslint-disable */
// import { Grid } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import InputSection from 'layout/MainLayout/Header/InputSection';
// import ReactApexChart from 'react-apexcharts';
import axiosServices from 'utils/axiosServices';
import TableDataGrid from 'views/forms/tables/GridTable';
import { useEffect, useState } from 'react';
import {
    Button,
    Grid,
    Typography,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import fileDownload from 'js-file-download';
/*  eslint-disable */
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import InputSection from 'layout/MainLayout/Header/InputSection';
// import ReactApexChart from 'react-apexcharts';

import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import RevenueCard from 'ui-component/cards/RevenueCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import CodeIcon from '@mui/icons-material/Code';
// import BugReportIcon from '@mui/icons-material/BugReport';
// import RevenueCard from 'ui-component/cards/RevenueCard';

// ==============================|| SAMPLE PAGE ||============================== //

const TestCase = () => {
    // const [testcases, setTestCases] = useState([]);
    const [rows, setRows] = useState<any>([]);
    const [progress, setProgress] = useState<any>(false);
    const [instOpt, setInstOpt] = useState<any>();
    const [branchOpt, setBranchOpt] = useState<any>();
    const [languages, setLanguages] = useState<any>([]);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const link = useSelector((state: any) => state.link.link);
    console.log(rows);
    const [testResults, setTestResults] = useState<any>([]);
    console.log(testResults);

    // useEffect(() => {
    //     const eventSource = new EventSource('http://localhost:8000/sse_test_results');

    //     eventSource.onmessage = (event) => {
    //         const response = JSON.parse(event.data);
    //         console.log('Received SSE message:', response);

    //         const tests = [];
    //         for (let res of response) {
    //             tests.push({
    //                 id: res['class'] + '-' + res['method'],
    //                 testClass: res['class'],
    //                 testMethod: res['method'],
    //                 instructionCov: res['coverage']['INSTRUCTION']['covered'],
    //                 instructionMiss: res['coverage']['INSTRUCTION']['missed'],
    //                 branchCov: res['coverage']['BRANCH']['covered'],
    //                 branchMiss: res['coverage']['BRANCH']['missed'],
    //                 instructionCoverage:
    //                     Math.round(
    //                         (res['coverage']['INSTRUCTION']['covered'] /
    //                             (res['coverage']['INSTRUCTION']['covered'] + res['coverage']['INSTRUCTION']['missed'])) *
    //                             100
    //                     ) + '%',
    //                 branchCoverage:
    //                     Math.round(
    //                         (res['coverage']['BRANCH']['covered'] /
    //                             (res['coverage']['BRANCH']['covered'] + res['coverage']['BRANCH']['missed'])) *
    //                             100
    //                     ) + '%'
    //             });

    //             setBranchOpt({
    //                 series: [
    //                     {
    //                         name: 'covered',
    //                         data: [res['coverage']['BRANCH']['covered']]
    //                     },
    //                     {
    //                         name: 'missed',
    //                         data: [res['coverage']['BRANCH']['missed']]
    //                     }
    //                 ],

    //                 chart: {
    //                     height: 350,
    //                     type: 'bar',
    //                     stacked: true,
    //                     toolbar: {
    //                         show: false
    //                     }
    //                 },
    //                 colors: ['#13d820', '#de142c'],
    //                 dataLabels: {
    //                     style: {
    //                         colors: ['#000']
    //                     }
    //                 },
    //                 plotOptions: {
    //                     bar: {
    //                         horizontal: true
    //                     }
    //                 },
    //                 xaxis: {
    //                     labels: {
    //                         show: false // Hide x-axis labels
    //                     }
    //                 },
    //                 yaxis: {
    //                     labels: {
    //                         show: false // Hide y-axis labels
    //                     },
    //                     categories: ['Instruction Coverage']
    //                 },
    //                 grid: {
    //                     show: false // Hide the grid lines
    //                 }
    //             });

    //             setInstOpt({
    //                 series: [
    //                     {
    //                         name: 'covered',
    //                         data: [res['coverage']['INSTRUCTION']['covered']]
    //                     },
    //                     {
    //                         name: 'missed',
    //                         data: [res['coverage']['INSTRUCTION']['missed']]
    //                     }
    //                 ],

    //                 chart: {
    //                     height: 350,
    //                     type: 'bar',
    //                     stacked: true,
    //                     toolbar: {
    //                         show: false
    //                     }
    //                 },
    //                 colors: ['#13d820', '#de142c'],
    //                 dataLabels: {
    //                     style: {
    //                         colors: ['#000']
    //                     }
    //                 },
    //                 plotOptions: {
    //                     bar: {
    //                         horizontal: true
    //                     }
    //                 },
    //                 xaxis: {
    //                     labels: {
    //                         show: false // Hide x-axis labels
    //                     }
    //                 },
    //                 yaxis: {
    //                     labels: {
    //                         show: false // Hide y-axis labels
    //                     },
    //                     categories: ['Instruction Coverage']
    //                 },
    //                 grid: {
    //                     show: false // Hide the grid lines
    //                 }
    //             });
    //         }

    //         setRows(tests);
    //     };

    //     eventSource.onerror = (error) => {
    //         console.error('EventSource failed:', error);
    //         eventSource.close();
    //     };

    //     return () => {
    //         eventSource.close();
    //     };
    // }, []);
    // const [runnableTestCases, setRunnableTestCases] = useState([]);

    const columns = [
        {
            field: 'testClass',
            headerName: 'Test Class',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160
        },
        {
            field: 'testMethod',
            headerName: 'Test Method',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160
        },

        {
            field: 'instructionCoverage',
            headerName: 'Instruction Coverage',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 300
        },

        {
            field: 'branchCoverage',
            headerName: 'Branch Coverage',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160
        }
    ];

    const fetchTestCases = async () => {
        try {
            setProgress(true);
            let response: any = await axiosServices.post('http://127.0.0.1:8000/get_test_methods');
            response = response.data;
            setProgress(false);
            const tests = [];
            for (let res of response) {
                tests.push({
                    id: res['class'] + '-' + res['method'],
                    testClass: res['class'],
                    testMethod: res['method'],
                    instructionCov: res['coverage']['INSTRUCTION']['covered'],
                    instructionMiss: res['coverage']['INSTRUCTION']['missed'],
                    branchCov: res['coverage']['BRANCH']['covered'],
                    branchMiss: res['coverage']['BRANCH']['missed'],
                    instructionCoverage:
                        Math.round(
                            (res['coverage']['INSTRUCTION']['covered'] /
                                (res['coverage']['INSTRUCTION']['covered'] + res['coverage']['INSTRUCTION']['missed'])) *
                                100
                        ) + '%',
                    branchCoverage:
                        Math.round(
                            (res['coverage']['BRANCH']['covered'] /
                                (res['coverage']['BRANCH']['covered'] + res['coverage']['BRANCH']['missed'])) *
                                100
                        ) + '%'
                });

                setBranchOpt({
                    series: [
                        {
                            name: 'covered',
                            data: [res['coverage']['BRANCH']['covered']]
                        },
                        {
                            name: 'missed',
                            data: [res['coverage']['BRANCH']['missed']]
                        }
                    ],

                    chart: {
                        height: 350,
                        type: 'bar',
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    colors: ['#13d820', '#de142c'],
                    dataLabels: {
                        style: {
                            colors: ['#000']
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    xaxis: {
                        labels: {
                            show: false // Hide x-axis labels
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false // Hide y-axis labels
                        },
                        categories: ['Instruction Coverage']
                    },
                    grid: {
                        show: false // Hide the grid lines
                    }
                });

                setInstOpt({
                    series: [
                        {
                            name: 'covered',
                            data: [res['coverage']['INSTRUCTION']['covered']]
                        },
                        {
                            name: 'missed',
                            data: [res['coverage']['INSTRUCTION']['missed']]
                        }
                    ],

                    chart: {
                        height: 350,
                        type: 'bar',
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    colors: ['#13d820', '#de142c'],
                    dataLabels: {
                        style: {
                            colors: ['#000']
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    xaxis: {
                        labels: {
                            show: false // Hide x-axis labels
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false // Hide y-axis labels
                        },
                        categories: ['Instruction Coverage']
                    },
                    grid: {
                        show: false // Hide the grid lines
                    }
                });
            }

            setRows(tests);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchTestCases();
    }, []);
    return (
        <div>
            {progress && <LinearProgress />}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Test Class</TableCell>
                            <TableCell align="left">Test Method</TableCell>
                            <TableCell align="left">Instruction Coverage</TableCell>
                            <TableCell align="left">Branch Coverage</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows &&
                            rows.map((row: any) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.testClass}
                                    </TableCell>
                                    <TableCell align="left">{row.testMethod}</TableCell>
                                    <TableCell align="left">
                                        <Grid
                                            container
                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                                        >
                                            {instOpt.series && (
                                                <ReactApexChart height="120" type="bar" series={instOpt.series} options={instOpt} />
                                            )}
                                        </Grid>
                                    </TableCell>
                                    <TableCell align="left">
                                        {' '}
                                        <Grid
                                            container
                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                                        >
                                            {branchOpt.series && (
                                                <ReactApexChart height="120" type="bar" series={branchOpt.series} options={branchOpt} />
                                            )}
                                        </Grid>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            variant="contained"
                                            onClick={async () => {
                                                try {
                                                    await axiosServices
                                                        .post('http://127.0.0.1:8000/download-file', {
                                                            file_name: row.id
                                                        })
                                                        .then((res: any) => {
                                                            fileDownload(res.data, row.id + '.xml');
                                                        });
                                                } catch (error) {
                                                    console.error('Error downloading file:', error);
                                                }
                                            }}
                                        >
                                            Download Report
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TestCase;
