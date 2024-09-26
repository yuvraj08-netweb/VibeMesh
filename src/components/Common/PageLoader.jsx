const PageLoader = () => {
  return (
    <>
      <div className="loaderContainer w-full min-h-screen bg-darkPurple flex items-center justify-center" >
        <div className="pageloader">
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
        </div>
      </div>
    </>
  );
};

export default PageLoader;
