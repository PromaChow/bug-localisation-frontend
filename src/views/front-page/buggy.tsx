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
import { Button, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import fileDownload from 'js-file-download';

// import CodeIcon from '@mui/icons-material/Code';
// import BugReportIcon from '@mui/icons-material/BugReport';
// import RevenueCard from 'ui-component/cards/RevenueCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Bug = () => {
    // const [testcases, setTestCases] = useState([]);
    const [rows, setRows] = useState<any>([]);
    const [progress, setProgress] = useState<any>(false);
    const [branchOpt, setBranchOpt] = useState<any>();
    // const [runnableTestCases, setRunnableTestCases] = useState([]);

    const normalizeScore = (score: any, minScore: any, maxScore: any) => (score - minScore) / (maxScore - minScore);

    // Function to generate gradient color based on normalized score
    const generateGradientColor = (normalizedScore: any) => {
        const r = Math.round(255 * normalizedScore);
        const g = Math.round(255 - 255 * normalizedScore);
        const b = 0;
        return `rgb(${r},${g},${b})`;
    };

    const fetchBuggyMethods = async () => {
        try {
            setProgress(true);
            let response: any = await axiosServices.post('http://127.0.0.1:8000/get_buggy_methods');
            response = response.data;

            setProgress(false);
            const tests: any = [];

            Object.entries(response).map(([key, value]: any) => {
                tests.push({
                    id: key,
                    class: value['class'],
                    method: value['method'],
                    susp: value['susp'],
                    desc: value['desc']
                });
            });

            const suspScores = tests.map((test: any) => test.susp);

            const minSuspScore = Math.min(...suspScores);
            const maxSuspScore = Math.max(...suspScores);
            console.log(minSuspScore, maxSuspScore);
            for (const test of tests) {
                test['normalise_score'] = normalizeScore(test['susp'], minSuspScore, maxSuspScore);
                test['gradient'] = generateGradientColor(test['normalise_score']);
            }
            console.log(tests);
            setRows(tests);

            console.log(tests);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchBuggyMethods();
    }, []);
    return (
        <div>
            {progress && <LinearProgress />}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell align="left">Method</TableCell>
                            <TableCell align="left">Probability of being buggy</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(0, 2).map((row: any) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.class}
                                </TableCell>
                                <TableCell align="left">{row.method}</TableCell>
                                <TableCell align="left">
                                    <Grid
                                        container
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                                    >
                                        <Button variant="contained" style={{ backgroundColor: row['gradient'] }}>
                                            {row['susp'].toFixed(4)}
                                        </Button>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Bug;
