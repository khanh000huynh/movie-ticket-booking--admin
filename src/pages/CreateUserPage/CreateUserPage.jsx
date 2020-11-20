import React from "react";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";

const CreateUserPage = () => {
  return (
    <div>
      <ContentHeader prevPath="/user-management" title="THÊM NGƯỜI DÙNG" />
      <CreateUserForm />
    </div>
  );
};

export default CreateUserPage;
