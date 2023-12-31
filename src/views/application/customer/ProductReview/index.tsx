import * as React from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Checkbox,
    Grid,
    IconButton,
    InputAdornment,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import ReviewEdit from './ReviewEdit';
import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { ArrangementOrder, EnhancedTableHeadProps, EnhancedTableToolbarProps, GetComparator, HeadCell, KeyedObject } from 'types';

export type ProductReviewData = { name: string; author: string; review: string; rating: number; date: string; status: number };

// table data
function createData(name: string, author: string, review: string, rating: number, date: string, status: number) {
    return { name, author, review, rating, date, status };
}

const rowsInitial: ProductReviewData[] = [
    createData('Apple Watch Series 1', 'Joseph William', 'The Series 4 is a significant step...', 3.5, '12.07.2018', 1),
    createData('Apple X2 2', 'Anshan Handgun', 'The Series 4 is a significant step...', 5.0, '12.07.2018', 2),
    createData('Apple Watch Series 3', 'Larry Doe', 'The Series 4 is a significant step...', 4.5, '12.07.2018', 2),
    createData('Apple Watch Series 4', 'Joseph William', 'The Series 4 is a significant step...', 3.0, '12.07.2018', 3),
    createData('Apple X2 5', 'Anshan Handgun', 'The Series 4 is a significant step...', 2.0, '12.07.2018', 2),
    createData('Apple X2 6', 'Larry Doe', 'The Series 4 is a significant step...', 2.5, '12.07.2018', 1),
    createData('Apple Watch Series 7', 'Joseph William', 'The Series 4 is a significant step...', 4.0, '12.07.2018', 3),
    createData('Apple X2 8', 'Anshan Handgun', 'The Series 4 is a significant step...', 5.0, '12.07.2018', 3),
    createData('Apple Watch Series 9', 'Larry Doe', 'The Series 4 is a significant step...', 4.0, '12.07.2018', 1),
    createData('Apple Watch Series 10', 'Joseph William', 'The Series 4 is a significant step...', 3.5, '12.07.2018', 2),
    createData('Apple X2 11', 'Anshan Handgun', 'The Series 4 is a significant step...', 1.0, '12.07.2018', 1),
    createData('Apple X2 12', 'Larry Doe', 'The Series 4 is a significant step...', 1.5, '12.07.2018', 1),
    createData('Apple Watch Series 13', 'Joseph William', 'The Series 4 is a significant step...', 2.5, '12.07.2018', 3),
    createData('Apple X2 14', 'Anshan Handgun', 'The Series 4 is a significant step...', 5.0, '12.07.2018', 1),
    createData('Apple Watch Series 15', 'Larry Doe', 'The Series 4 is a significant step...', 4.0, '12.07.2018', 2)
];

// table sort
function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator: GetComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array: ProductReviewData[], comparator: (a: ProductReviewData, b: ProductReviewData) => number) {
    const stabilizedThis = array.map((el: ProductReviewData, index: number) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] as ProductReviewData, b[0] as ProductReviewData);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells: HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        label: 'Product Name',
        align: 'left'
    },
    {
        id: 'author',
        numeric: true,
        label: 'Author',
        align: 'left'
    },
    {
        id: 'review',
        numeric: true,
        label: 'Review',
        align: 'left'
    },
    {
        id: 'rating',
        numeric: true,
        label: 'Rating',
        align: 'center'
    },
    {
        id: 'date',
        numeric: true,
        label: 'Date',
        align: 'center'
    },
    {
        id: 'status',
        numeric: false,
        label: 'Status',
        align: 'center'
    }
];

// ==============================|| TABLE HEADER ||============================== //

export interface ProReviewEnhancedTableHeadProps extends EnhancedTableHeadProps {
    theme: Theme;
    selected: string[];
}

function EnhancedTableHead(props: ProReviewEnhancedTableHeadProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected } = props;
    const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={7}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                            Action
                        </Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                p: 0,
                pl: 1,
                pr: 1,
                ...(numSelected > 0 && {
                    color: (theme) => theme.palette.secondary.main
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography color="inherit" variant="h4">
                    {numSelected} Selected
                </Typography>
            ) : (
                <Typography variant="h6" id="tableTitle">
                    Nutrition
                </Typography>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton size="large">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

// ==============================|| PRODUCT REVIEW LIST ||============================== //

export interface ProductReviewProps {}

const ProductReview = (props: ProductReviewProps) => {
    const theme = useTheme();

    // open dialog to edit review
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const [order, setOrder] = React.useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
    const [search, setSearch] = React.useState<string>('');
    const [rows, setRows] = React.useState<ProductReviewData[]>(rowsInitial);

    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['name', 'author', 'review'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(rowsInitial);
        }
    };

    const handleRequestSort = (event: React.SyntheticEvent<Element, Event>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelectedId = rows.map((n) => n.name);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <MainCard title="Product Review" content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearch}
                            placeholder="Search Product"
                            value={search}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <Tooltip title="Copy">
                            <IconButton size="large">
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                            <IconButton size="large">
                                <PrintIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter">
                            <IconButton size="large">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        theme={theme}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.name)} sx={{ pl: 3 }}>
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {row.name}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{row.author}</TableCell>
                                        <TableCell>{row.review}</TableCell>
                                        <TableCell align="center">
                                            <Rating name="read-only" value={row.rating} precision={0.5} readOnly />
                                        </TableCell>
                                        <TableCell align="center">{row.date}</TableCell>
                                        <TableCell align="center">
                                            {row.status === 1 && <Chip label="Complete" chipcolor="success" size="small" />}
                                            {row.status === 2 && <Chip label="Processing" chipcolor="orange" size="small" />}
                                            {row.status === 3 && <Chip label="Confirm" chipcolor="primary" size="small" />}
                                        </TableCell>
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <IconButton color="primary" size="large">
                                                <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={handleClickOpenDialog} size="large">
                                                <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* review edit dialog */}
                <ReviewEdit open={open} handleCloseDialog={handleCloseDialog} />
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ProductReview;
