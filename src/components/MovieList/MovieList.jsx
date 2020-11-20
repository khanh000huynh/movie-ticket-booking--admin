import {
  Box,
  CardMedia,
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
import {
  CreateRounded,
  DateRangeRounded,
  DeleteRounded,
} from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { createAction } from "../../redux/actions/actionCreator";
import { SET_SHOWTIME_BY_MAPHIM } from "../../redux/actions/actionTypes";
import {
  chooseMovie,
  deleteMovie,
  setMovieList,
} from "../../redux/actions/movieActions";
import { setSearchInfo } from "../../redux/actions/searchActions";
import {
  setShowtime,
  setShowtimeByMaPhim,
} from "../../redux/actions/showtimeActions";
import theme from "../../theme/theme";
import { toDMY, toYMD } from "../../utils/datetime";
import MiniIconButton from "../MiniIconButton/MiniIconButton";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
    boxSizing: "border-box",
    padding: theme.spacing(0, 2),
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
    height: 486,
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
  media: {
    width: "100%",
    height: 105,
  },
  showtimeButton: {
    color: theme.palette.primary.main,
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
  },
  editButton: {
    color: "#e3cb19",
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#e3cb19",
      color: theme.palette.text.secondary,
    },
  },
  deleteButton: {
    color: theme.palette.error.main,
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.text.secondary,
    },
  },
  loader: {
    minHeight: 520,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid " + theme.palette.grey[250],
    marginBottom: theme.spacing(2),
  },
  notFound: {
    color: theme.palette.grey[250],
    textAlign: "center",
  },
});

const MovieList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("maPhim");
  const movieList = useSelector((state) => state.movie.movieList);
  const searchInfo = useSelector((state) => state.search.searchInfo);
  const showtime = useSelector((state) => state.showtime.showtime);
  const filteredMovieList = React.useMemo(() => {
    const filter = (input) => {
      const search = searchInfo
        .toString()
        .replace(/\\/g, "")
        .replace(/\//g, "-");
      return input.toString().search(new RegExp(search, "gi")) !== -1;
    };

    return movieList.filter(
      (movie) =>
        filter(movie.maPhim) ||
        filter(movie.tenPhim) ||
        filter(toDMY(new Date(movie.ngayKhoiChieu)))
    );
  }, [movieList, searchInfo]);

  const descendingComparator = React.useCallback((a, b, orderBy) => {
    let cloneA = a[orderBy];
    let cloneB = b[orderBy];
    if (orderBy === "ngayKhoiChieu") {
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

  const summary = React.useCallback((input, length) => {
    if (input && input.length > length) return input.substr(0, length) + "...";
    return input;
  }, []);

  const st = React.useCallback(
    (maPhim) => {
      return (
        showtime &&
        showtime.filter((showtime) => showtime.maPhim === maPhim)[0]?.lichChieu
      );
    },
    [showtime]
  );

  const handleRedirectToDetailShowtimePage = React.useCallback(
    (maPhim) => () => {
      sessionStorage.setItem("renderShowtimeWithAllTheaters", true);
      dispatch(createAction(SET_SHOWTIME_BY_MAPHIM, {}));
      dispatch(setShowtimeByMaPhim(maPhim));
      props.history.push(`/showtime-management/detail-showtime/${maPhim}`);
    },
    [dispatch, props.history]
  );

  const handleEdit = React.useCallback(
    (maPhim) => () => {
      const chosenMovie = movieList.find((movie) => movie.maPhim === maPhim);
      dispatch(chooseMovie(chosenMovie));
      sessionStorage.setItem("chosenMovie", JSON.stringify(chosenMovie));
      props.history.push(`/movie-management/update-movie/${maPhim}`);
    },
    [movieList, dispatch, props.history]
  );

  const handleDelete = React.useCallback(
    (info) => () => {
      const { maPhim, tenPhim } = info;
      if (st(maPhim) && st(maPhim).length) return;
      const c = window.confirm(
        `Bạn chắc chắn muốn xóa "${tenPhim}" (${maPhim}) ?`
      );
      if (c) {
        dispatch(deleteMovie(info));
      }
    },
    [st, dispatch]
  );

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
    (hinhAnh, maPhim, tenPhim, maNhom, ngayKhoiChieu) => {
      ngayKhoiChieu = toDMY(new Date(ngayKhoiChieu));

      const actions = (
        <>
          <MiniIconButton
            hint="Lịch chiếu"
            ariaLabel="create ngayKhoiChieu"
            classname={classes.showtimeButton}
            onClick={handleRedirectToDetailShowtimePage(maPhim)}
          >
            <DateRangeRounded />
          </MiniIconButton>
          <MiniIconButton
            hint="Sửa"
            ariaLabel="edit movie"
            classname={classes.editButton}
            onClick={handleEdit(maPhim)}
          >
            <CreateRounded />
          </MiniIconButton>
          <MiniIconButton
            hint="Xóa"
            ariaLabel="delete movie"
            classname={classes.deleteButton}
            disabled={
              st(maPhim) && st(maPhim).length ? st(maPhim).length : false
            }
            onClick={st(maPhim) ? handleDelete({ maPhim, tenPhim }) : null}
          >
            {st(maPhim) ? <DeleteRounded /> : <CircularProgress size={24} />}
          </MiniIconButton>
        </>
      );

      return { hinhAnh, maPhim, tenPhim, maNhom, ngayKhoiChieu, actions };
    },
    [
      st,
      classes.showtimeButton,
      handleRedirectToDetailShowtimePage,
      classes.editButton,
      classes.deleteButton,
      handleEdit,
      handleDelete,
    ]
  );

  const columns = React.useMemo(
    () => [
      {
        id: "hinhAnh",
        label: "Hình ảnh",
        width: "10%",
        align: "left",
      },
      {
        id: "maPhim",
        label: "Mã phim",
        width: "10%",
        align: "right",
      },
      { id: "tenPhim", label: "Tên phim", width: "35%" },
      { id: "maNhom", label: "Mã nhóm", width: "15%" },
      {
        id: "ngayKhoiChieu",
        label: "Ngày công chiếu",
        width: "15%",
      },
      {
        id: "actions",
        label: "Thao tác",
        width: "15%",
        align: "center",
      },
    ],
    []
  );

  const rows = React.useMemo(() => {
    return filteredMovieList.map((movie, index) =>
      createData(
        <CardMedia
          image={movie.hinhAnh}
          className={classes.media}
          key={index}
        />,
        movie.maPhim,
        summary(movie.tenPhim, 97),
        movie.maNhom,
        movie.ngayKhoiChieu
      )
    );
  }, [filteredMovieList, createData, classes.media, summary]);

  const renderHead = React.useCallback(() => {
    return columns.map((column) => (
      <TableCell
        key={column.id}
        align={column.align}
        style={{ width: column.width }}
        sortDirection={order === column.id ? order : false}
      >
        {!["hinhAnh", "actions"].includes(column.id) ? (
          <TableSortLabel
            active={orderBy === column.id}
            direction={orderBy === column.id ? order : "asc"}
            onClick={handleRequestSort(column.id)}
          >
            {column.label}
          </TableSortLabel>
        ) : (
          column.label
        )}
      </TableCell>
    ));
  }, [columns, order, orderBy, handleRequestSort]);

  const renderMovie = React.useCallback(
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
        <TableRow hover role="checkbox" tabIndex={-1} key={row.maPhim}>
          {renderMovie(row)}
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
    renderMovie,
  ]);

  const renderFormWithNoData = React.useCallback(() => {
    if (!searchInfo.length)
      return (
        <Box className={classes.loader}>
          <CircularProgress size={80} />
        </Box>
      );
    return <Box className={classes.notFound}>Không tìm thấy phim!</Box>;
  }, [searchInfo.length, classes.loader, classes.notFound]);

  React.useEffect(() => {
    dispatch(setSearchInfo({}));
    dispatch(setMovieList());
    sessionStorage.removeItem("chosenTheaterSystem");
    sessionStorage.removeItem("chosenTheater");
  }, [dispatch]);

  React.useEffect(() => {
    if (!movieList.length) return;
    movieList.forEach((movie) => {
      dispatch(setShowtime(movie.maPhim));
    });
  }, [movieList, dispatch]);

  React.useEffect(() => {
    if (searchInfo.length) {
      setPage(0);
      setRowsPerPage(100);
    } else setRowsPerPage(10);
  }, [searchInfo]);

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

export default withRouter(MovieList);
