/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { Box, Link, Skeleton, IconButton, Avatar, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { prepareUrl } from '../../utils/helpers';
import { dateConvertor } from '../../utils/persianToEnglish';
import { fetchTransactions } from '../../features/reportSlice';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    const newPage = 0;
    onPageChange(event, newPage);
  };

  const handleBackButtonClick = (event) => {
    const newPage = page - 1;
    onPageChange(event, newPage);
  };

  const handleNextButtonClick = (event) => {
    const newPage = page + 1;
    onPageChange(event, newPage);
  };

  const handleLastPageButtonClick = (event) => {
    // guard against rowsPerPage === 0
    const lastPage =
      rowsPerPage > 0 ? Math.max(0, Math.ceil(count / rowsPerPage) - 1) : 0;
    onPageChange(event, lastPage);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={
          rowsPerPage > 0 ? page >= Math.ceil(count / rowsPerPage) - 1 : true
        }
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={
          rowsPerPage > 0 ? page >= Math.ceil(count / rowsPerPage) - 1 : true
        }
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ReportTable({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
  const dispatch = useDispatch();

  const transactions = useSelector((s) => s.report.transactions);
  const loadingTransactions = useSelector((s) => s.report.loadingTransactions);

  // total items (fall back to data length if meta is missing)
  const totalItems = React.useMemo(
    () =>
      transactions &&
      transactions.meta &&
      typeof transactions.meta.totalItems === 'number'
        ? transactions.meta.totalItems
        : transactions && transactions.data
          ? transactions.data.length
          : 0,
    [transactions],
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(
      fetchTransactions({
        page: newPage,
        rowsPerPage,
        start: null,
        end: null,
      }),
    );
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
    dispatch(
      fetchTransactions({
        page: 0,
        rowsPerPage: value,
        start: null,
        end: null,
      }),
    );
  };

  // compute the slice of transactions to display for the current page
  // If the backend provides paginated data (i.e. only the current page in transactions.data)
  // we should display it as-is. If the frontend has the full dataset, we slice it client-side.
  const paginatedData = React.useMemo(() => {
    if (!transactions || !transactions.data) return [];

    // Detect server-side pagination: backend commonly returns a `currentPage` or similar field
    const isServerSide =
      transactions.meta &&
      (typeof transactions.meta.currentPage === 'number' ||
        typeof transactions.meta.page === 'number');

    if (isServerSide) {
      // transactions.data already contains the items for the current page
      return transactions.data;
    }

    // Client-side pagination (we have the full dataset)
    if (rowsPerPage <= 0) return transactions.data; // show all
    const start = page * rowsPerPage;
    return transactions.data.slice(start, start + rowsPerPage);
  }, [transactions, page, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      {loadingTransactions ? (
        <Skeleton width="100%" height={600} />
      ) : (
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>شناسه پرداخت</TableCell>
              <TableCell>شناسه نیاز</TableCell>
              <TableCell>تامین کننده</TableCell>
              <TableCell>تاریخ پرداخت</TableCell>
              <TableCell align="right">پرداخت</TableCell>
              <TableCell align="right">هزینه نیاز</TableCell>
              <TableCell>بازگشت وجه</TableCell>
              <TableCell>توانمند‌سازی SAY</TableCell>
              <TableCell>شناسه تراکنش</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                  }}
                  component="th"
                  scope="row"
                >
                  {row.id}
                </TableCell>
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                  }}
                  component="th"
                  scope="row"
                >
                  <Avatar
                    variant="circle"
                    sx={{ border: '1px solid lightGrey' }}
                    src={prepareUrl(row.need?.imageUrl)}
                  />
                  {row.id_need}
                </TableCell>
                <TableCell align="center">
                  <Link href={row.need?.link} target="_blank">
                    <Avatar
                      variant="square"
                      sx={{ border: '1px solid lightGrey' }}
                      src={row.need?.img}
                    />
                  </Link>
                </TableCell>
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {dateConvertor(row.created)}
                </TableCell>
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                  }}
                  align="right"
                >
                  {row.need_amount
                    ? Number(row.need_amount).toLocaleString()
                    : '-'}
                </TableCell>
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                  }}
                  align="right"
                >
                  {row.need?._cost
                    ? Number(row.need._cost).toLocaleString()
                    : '-'}
                </TableCell>
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {row.credit_amount ? row.credit_amount.toLocaleString() : '-'}
                </TableCell>
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {row.donation_amount
                    ? row.donation_amount.toLocaleString()
                    : '-'}
                </TableCell>
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {row.order_id ?? '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}–${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`
                }
                labelRowsPerPage="ردیف در هر صفحه"
                rowsPerPageOptions={[5, 10, 25]}
                count={totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={(subprops) => (
                  <TablePaginationActions
                    {...subprops}
                    rowsPerPage={rowsPerPage}
                  />
                )}
              />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </TableContainer>
  );
}
