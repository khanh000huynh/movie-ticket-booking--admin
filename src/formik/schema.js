import * as Yup from "yup";

export const MovieSchema = Yup.object().shape({
  tenPhim: Yup.string()
    .min(3, "Tên phim phải có ít nhất 3 kí tự!")
    .max(50, "Tên phim không quá 50 kí tự!")
    .required("Tên phim không được để trống!"),
  biDanh: Yup.string()
    .min(3, "Bí danh phải có ít nhất 3 kí tự!")
    .max(50, "Bí danh không quá 50 kí tự!")
    .required("Bí danh không được để trống!"),
  trailer: Yup.string().required("Trailer không được để trống!"),
  // hinhAnh: Yup.object().required("Vui lòng chọn hình!"),
  moTa: Yup.string()
    .max(1000, "Mô tả không quá 1000 kí tự!")
    .required("Mô tả không được để trống!"),
  ngayKhoiChieu: Yup.string().required("Vui lòng chọn ngày hợp lệ!"),
});

export const LogInSchema = Yup.object().shape({
  taiKhoan: Yup.string()
    .min(3, "Tài khoản phải có ít nhất 3 kí tự!")
    .required("Tài khoản không được để trống!"),
  matKhau: Yup.string().required("Mật khẩu không được để trống!"),
});

export const UserSchema = Yup.object().shape({
  taiKhoan: Yup.string()
    .min(3, "Tài khoản phải có ít nhất 3 kí tự!")
    .max(25, "Tài khoản không quá 25 kí tự!")
    .required("Tài khoản không được để trống!"),
  matKhau: Yup.string().required("Mật khẩu không được để trống!"),
  email: Yup.string()
    .email("Email không hợp lệ!")
    .required("Email không được để trống"),
  soDt: Yup.string()
    .matches(/^((09|03|07|08|05)+([0-9]{8}))+$/g, "SĐT không hợp lệ!")
    .required("SĐT không được để trống!"),
  hoTen: Yup.string().required("Họ tên không được để trống!"),
});

export const UpdateUserSchema = Yup.object().shape({
  hoTen: Yup.string().required("Họ tên không được để trống!"),
  matKhau: Yup.string().required("Mật khẩu không được để trống"),
  email: Yup.string()
    .email("Email không hợp lệ!")
    .required("Email không được để trống"),
  soDt: Yup.string().matches(
    /^((09|03|07|08|05)+([0-9]{8}))+$/g,
    "SĐT không hợp lệ!"
  ),
});

export const CreateShowtimeSchema = Yup.object().shape({
  ngayChieu: Yup.string().required("Ngày chiếu không được để trống!"),
  gioChieu: Yup.string().required("Giờ chiếu không được để trống!"),
  maRap: Yup.string().required("Vui lòng chọn rạp!"),
  giaVe: Yup.string()
    .matches(/^[0-9]*$/g, "Vui lòng nhập số!")
    .required("Giá vé không được để trống!"),
});
