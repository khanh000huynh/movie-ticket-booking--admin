import React from "react";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import UpdateMovieForm from "../../components/UpdateMovieForm/UpdateMovieForm";

const UpdateMoviePage = () => {
  return (
    <>
      <ContentHeader prevPath="/movie-management" title="CẬP NHẬT PHIM" />
      <UpdateMovieForm />
    </>
  );
};

export default UpdateMoviePage;
