/**
 * Small Loader for Button
 * @returns
 */
const Loader = () => {
  return (
    <>
      <div className="loader absolute right-5">
        <img
          className="w-5 "
          src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
          alt="preloader"
        />
      </div>
    </>
  );
};

export default Loader;
