import React from "react";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import CreateMovieForm from "../../components/CreateMovieForm/CreateMovieForm";

const CreateMoviePage = () => {
  return (
    <>
      <ContentHeader prevPath="/movie-management" title="THÊM PHIM" />
      <CreateMovieForm />
    </>
  );
};

export default CreateMoviePage;
