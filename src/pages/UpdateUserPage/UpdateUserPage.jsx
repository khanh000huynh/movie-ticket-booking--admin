import React from "react";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import UpdateUserForm from "../../components/UpdateUserForm/UpdateUserForm";

const UpdateUserPage = () => {
  return (
    <>
      <ContentHeader prevPath="/user-management" title="CẬP NHẬT NGƯỜI DÙNG" />
      <UpdateUserForm />
    </>
  );
};

export default UpdateUserPage;
