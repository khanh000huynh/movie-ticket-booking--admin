import {
  Box,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFinishedLoadingShowtime } from "../../redux/actions/showtimeActions";
import theme from "../../theme/theme";
import { convert, toDMY, toYMD } from "../../utils/datetime";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
    boxSizing: "border-box",
    marginTop: theme.spacing(2),
    "& .MuiTableSortLabel-root": {
      color: theme.palette.text.primary,
      "& svg, & path": {
        color: theme.palette.text.primary,
      },
    },
  },
  container: {
    border: "1px solid " + theme.palette.grey[250],
    width: "100%",
    height: 354,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.grey[250],
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[100],
    },
  },
  loader: {
    height: "100%",
    minHeight: 425,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid " + theme.palette.grey[250],
  },
  notFound: {
    color: theme.palette.grey[250],
    textAlign: "center",
  },
});

const DetailShowtimeBottom = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("maRap");
  const { showtimeByMaPhim } = props;
  const { lichChieuPhim, heThongRapChieu } = showtimeByMaPhim;
  const searchInfo = useSelector((state) => state.search.searchInfo);
  const filteredLichChieuPhim = React.useMemo(() => {
    const filter = (input) => {
      const search = searchInfo
        .toString()
        .replace(/\\/g, "")
        .replace(/\//g, "-");
      return input.toString().search(new RegExp(search, "gi")) !== -1;
    };

    if (!lichChieuPhim) return;
    return lichChieuPhim.filter(
      (lichChieu) =>
        filter(lichChieu.maLichChieu) ||
        filter(lichChieu.maRap) ||
        filter(lichChieu.tenRap) ||
        filter(toDMY(new Date(lichChieu.ngayChieuGioChieu))) ||
        filter(convert(new Date(lichChieu.ngayChieuGioChieu)))
    );
  }, [lichChieuPhim, searchInfo]);

  const descendingComparator = React.useCallback((a, b, orderBy) => {
    let cloneA = a[orderBy];
    let cloneB = b[orderBy];
    if (orderBy === "ngayChieu") {
      cloneA = toYMD(a[orderBy]);
      cloneB = toYMD(b[orderBy]);
    }
    if (cloneB < cloneA) {
      return -1;
    }
    if (cloneB > cloneA) {
      return 1;
    }
    return 0;
  }, []);

  const getComparator = React.useCallback(
    (order, orderBy) => {
      return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    },
    [descendingComparator]
  );

  const stableSort = React.useCallback((array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }, []);

  const handleChangePage = React.useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = React.useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  const handleRequestSort = React.useCallback(
    (property) => (event) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const createData = React.useCallback(
    (maLichChieu, maRap, tenRap, ngayChieuGioChieu) => {
      const ngayChieu = toDMY(new Date(ngayChieuGioChieu));
      const gioChieu = convert(new Date(ngayChieuGioChieu));

      return { maLichChieu, maRap, tenRap, ngayChieu, gioChieu };
    },
    []
  );

  const columns = React.useMemo(
    () => [
      {
        id: "maLichChieu",
        label: "Mã lịch chiếu",
        width: "20%",
        align: "right",
      },
      {
        id: "maRap",
        label: "Mã rạp",
        width: "20%",
        align: "right",
      },
      { id: "tenRap", label: "Tên rạp", width: "20%" },
      {
        id: "ngayChieu",
        label: "Ngày chiếu",
        width: "20%",
        align: "left",
      },
      {
        id: "gioChieu",
        label: "Giờ chiếu",
        width: "20%",
        align: "left",
      },
    ],
    []
  );

  const rows = React.useMemo(() => {
    if (!filteredLichChieuPhim && !lichChieuPhim) return;
    return (searchInfo
      ? filteredLichChieuPhim
      : lichChieuPhim
    ).map((lichChieu, index) =>
      createData(
        lichChieu.maLichChieu,
        lichChieu.maRap,
        lichChieu.tenRap,
        lichChieu.ngayChieuGioChieu
      )
    );
  }, [searchInfo, filteredLichChieuPhim, lichChieuPhim, createData]);

  const renderHead = React.useCallback(() => {
    return columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        style={{ width: column.width }}
        sortDirection={order === column.id ? order : false}
      >
        <TableSortLabel
          active={orderBy === column.id}
          direction={orderBy === column.id ? order : "asc"}
          onClick={handleRequestSort(column.id)}
        >
          {column.label}
        </TableSortLabel>
      </TableCell>
    ));
  }, [columns, order, orderBy, handleRequestSort]);

  const renderLichChieuPhim = React.useCallback(
    (row) => {
      return columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {value}
          </TableCell>
        );
      });
    },
    [columns]
  );

  const renderBody = React.useCallback(() => {
    return stableSort(rows, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.maLichChieu}>
          {renderLichChieuPhim(row)}
        </TableRow>
      ));
  }, [
    stableSort,
    getComparator,
    order,
    orderBy,
    rows,
    rowsPerPage,
    page,
    renderLichChieuPhim,
  ]);

  const renderFormWithNoData = React.useCallback(() => {
    if (!searchInfo.length && !heThongRapChieu)
      return (
        <Box className={classes.loader}>
          <CircularProgress size={80} />
        </Box>
      );

    return <Box className={classes.notFound}>Không tìm thấy lịch chiếu!</Box>;
  }, [searchInfo.length, heThongRapChieu, classes.loader, classes.notFound]);

  React.useEffect(() => {
    if ((rows && rows.length) || (heThongRapChieu && !heThongRapChieu.length))
      dispatch(setIsFinishedLoadingShowtime(true));
  }, [rows, heThongRapChieu, dispatch]);

  return (
    <Box className={classes.root}>
      {rows && rows.length ? (
        <>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>{renderHead()}</TableRow>
              </TableHead>
              <TableBody>{renderBody()}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        renderFormWithNoData()
      )}
    </Box>
  );
};

export default DetailShowtimeBottom;
