import * as React from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Checkbox,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
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
import ProductAdd from './ProductAdd';
import MainCard from 'ui-component/cards/MainCard';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { GetComparator, HeadCell, KeyedObject, EnhancedTableHeadProps, EnhancedTableToolbarProps, ArrangementOrder } from 'types';

export type ProductData = { id: string; name: string; category: string; price: number; date: string; qty: number };

// table data
function createData(id: string, name: string, category: string, price: number, date: string, qty: number) {
    return { id, name, category, price, date, qty };
}

const rowsInitial: ProductData[] = [
    createData('790841', 'Samsung TV 32” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('790842', 'Iphone 11 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('798699', 'Samsung TV 34” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('790752', 'Iphone 12 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('790955', 'Samsung TV 36” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('790785', 'Iphone 13 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('800837', 'Samsung TV 38” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('810365', 'Iphone 14 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('810814', 'Samsung TV 40” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('820385', 'Iphone 15 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('820885', 'Samsung TV 42” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('830390', 'Iphone 16 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('830879', 'Samsung TV 44” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('900111', 'Iphone 17 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('900836', 'Samsung TV 46” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('900112', 'Iphone 18 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('900871', 'Samsung TV 48” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('910232', 'Iphone 19 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('910886', 'Samsung TV 50” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('910232', 'Iphone 20 Pro Max', 'Television', 5000, '12.07.2018', 2)
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

function stableSort(array: ProductData[], comparator: (a: ProductData, b: ProductData) => number) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] as ProductData, b[0] as ProductData);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells: HeadCell[] = [
    {
        id: 'id',
        numeric: true,
        label: 'ID',
        align: 'center'
    },
    {
        id: 'name',
        numeric: false,
        label: 'Product Name',
        align: 'left'
    },
    {
        id: 'category',
        numeric: false,
        label: 'Category',
        align: 'left'
    },
    {
        id: 'price',
        numeric: true,
        label: 'Price',
        align: 'right'
    },
    {
        id: 'date',
        numeric: true,
        label: 'Date',
        align: 'center'
    },
    {
        id: 'qty',
        numeric: true,
        label: 'QTY',
        align: 'right'
    }
];

// ==============================|| TABLE HEADER ||============================== //

export interface ProEnhancedTableHeadProps extends EnhancedTableHeadProps {
    theme: Theme;
    selected: string[];
}

function EnhancedTableHead(props: ProEnhancedTableHeadProps) {
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
                                {orderBy === headCell?.id ? (
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

// ==============================|| PRODUCT LIST ||============================== //

const Product = () => {
    const theme = useTheme();

    // show a right sidebar when clicked on new product
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
    const [rows, setRows] = React.useState<ProductData[]>(rowsInitial);

    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['name', 'category', 'price', 'qty', 'id'];
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
        <MainCard title="Product List" content={false}>
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

                        {/* product add & dialog */}
                        <Tooltip title="Add Product">
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        <ProductAdd open={open} handleCloseDialog={handleCloseDialog} />
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
                                        <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.name)}>
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                #{row.id}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {row.name}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell align="right">{row.price}$</TableCell>
                                        <TableCell align="center">{row.date}</TableCell>
                                        <TableCell align="right">{row.qty}</TableCell>
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <IconButton size="large">
                                                <MoreHorizOutlinedIcon sx={{ fontSize: '1.3rem' }} />
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

export default Product;
