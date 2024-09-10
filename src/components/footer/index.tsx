const Footer = () => {
  const classes = "flex flex-col justify-start items-start gap-2 w-full h-full";
  const header = "font-bold capitalize text-xl";
  const ul = "flex flex-col";
  const li = "flex gap-2 justify-start items-center";
  return (
    <footer className="hidden w-full gap-3 bg-white p-[50px] text-gray-800 dark:bg-black dark:text-white sm:grid sm:grid-cols-4 sm:items-center sm:justify-between">
      <div className={classes}>
        <h2 className={header}>Title</h2>
        <p className="w-1/2">paragraph</p>
      </div>
      <div className={classes}>
        <h2 className={header}>Browse</h2>
        <ul className={ul} role="list">
          <li>Home</li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className={classes}>
        <h2 className={header}>Services</h2>
        <ul className={ul} role="list">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
      <div className={classes}>
        <h2 className={header}>Contact</h2>
        <ul className={ul} role="list">
          <li className={li}>1</li>
          <li className={li}>2</li>
          <li className={li}>3</li>
          <li className={li}>4</li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
