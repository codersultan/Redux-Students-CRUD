const Preloader = () => {
  return (
    <>
      <div className="preloader flex absolute left-0 top-0 w-full h-full justify-center items-center bg-white/90">
        <img
          className="w-16"
          src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
          alt="preloader"
        />
      </div>
    </>
  );
};

export default Preloader;
