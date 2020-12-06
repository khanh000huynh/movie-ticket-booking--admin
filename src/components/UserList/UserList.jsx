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
import { CreateRounded, DeleteRounded } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setSearchInfo } from "../../redux/actions/searchActions";
import { deleteUser, setUserList } from "../../redux/actions/userActions";
import theme from "../../theme/theme";
import MiniIconButton from "../MiniIconButton/MiniIconButton";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: 536,
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
    height: 480,
    maxHeight: 480,
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
  table: {
    tableLayout: "fixed",
    "& td": {
      overflowX: "hidden",
      whiteSpace: "nowrap",
    },
  },
  media: {
    width: "100%",
    height: 105,
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
    padding: theme.spacing(1),
    color: theme.palette.error.main,
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

const UserList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("taiKhoan");
  const userList = useSelector((state) => state.user.userList);
  const searchInfo = useSelector((state) => state.search.searchInfo);
  const filteredUserList = React.useMemo(() => {
    const filter = (input) => {
      const search = searchInfo.toString().replace(/\\/g, "");
      return input
        ? input.toString().search(new RegExp(search, "gi")) !== -1
        : "";
    };

    return userList.filter(
      (user) =>
        filter(user.taiKhoan) ||
        filter(user.hoTen) ||
        filter(user.email) ||
        filter(user.soDt) ||
        filter(user.maLoaiNguoiDung)
    );
  }, [userList, searchInfo]);

  const descendingComparator = React.useCallback((a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
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

  const handleEdit = React.useCallback(
    (taiKhoan) => () => {
      props.history.push(`/user-management/update-user/${taiKhoan}`);
      sessionStorage.setItem("taiKhoan", taiKhoan);
    },
    [props.history]
  );

  const handleDelete = React.useCallback(
    (taiKhoan) => () => {
      const c = window.confirm(`Bạn chắc chắn xóa tài khoản "${taiKhoan}"?`);
      if (c) {
        dispatch(deleteUser(taiKhoan));
      }
    },
    [dispatch]
  );

  const createData = React.useCallback(
    (taiKhoan, hoTen, email, soDt, maLoaiNguoiDung) => {
      const actions = (
        <>
          <MiniIconButton
            hint="Sửa"
            ariaLabel="edit user"
            classname={classes.editButton}
            onClick={handleEdit(taiKhoan)}
          >
            <CreateRounded />
          </MiniIconButton>
          <MiniIconButton
            hint="Xóa"
            ariaLabel="delete user"
            classname={classes.deleteButton}
            onClick={handleDelete(taiKhoan)}
          >
            <DeleteRounded />
          </MiniIconButton>
        </>
      );
      return { taiKhoan, hoTen, email, soDt, maLoaiNguoiDung, actions };
    },
    [classes.editButton, handleEdit, classes.deleteButton, handleDelete]
  );

  const columns = React.useMemo(
    () => [
      {
        id: "taiKhoan",
        label: "Tài khoản",
        width: "15%",
        align: "left",
      },
      {
        id: "hoTen",
        label: "Họ tên",
        width: "25%",
        align: "left",
      },
      {
        id: "email",
        label: "Email",
        width: "25%",
        align: "left",
      },
      { id: "soDt", label: "SĐT", width: "10%" },
      { id: "maLoaiNguoiDung", label: "Loại ND", width: "10%" },
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
    return filteredUserList.map((user) =>
      createData(
        summary(user.taiKhoan, 20),
        summary(user.hoTen, 35),
        summary(user.email, 30),
        summary(user.soDt, 10),
        user.maLoaiNguoiDung === "KhachHang" ? "Khách hàng" : "Quản trị"
      )
    );
  }, [filteredUserList, createData, summary]);

  const renderHead = React.useCallback(() => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ width: column.width }}
          >
            {column.id !== "actions" ? (
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
        ))}
      </TableRow>
    );
  }, [columns, order, orderBy, handleRequestSort]);

  const renderUser = React.useCallback(
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
        <TableRow hover role="checkbox" tabIndex={-1} key={row.taiKhoan}>
          {renderUser(row)}
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
    renderUser,
  ]);

  const renderFormWithNoData = React.useCallback(() => {
    if (!searchInfo.length)
      return (
        <Box className={classes.loader}>
          <CircularProgress size={80} />
        </Box>
      );
    return <Box className={classes.notFound}>Không tìm thấy người dùng!</Box>;
  }, [searchInfo.length, classes.loader, classes.notFound]);

  React.useEffect(() => {
    dispatch(setSearchInfo({}));
    dispatch(setUserList());
  }, [dispatch]);

  React.useEffect(() => {
    if (searchInfo.length) {
      setPage(0);
    }
  }, [searchInfo]);

  return (
    <Box className={classes.root}>
      {rows && rows.length ? (
        <>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              aria-label="sticky table"
              className={classes.table}
            >
              <TableHead>{renderHead()}</TableHead>
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

export default withRouter(UserList);
