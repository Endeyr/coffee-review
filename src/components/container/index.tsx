import { twMerge } from "tailwind-merge";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  const baseClasses =
    "space-y-10 md:space-y-16 flex w-full xl:min-h-[calc(100vh-100px)] items-center justify-center p-[50px] border border-red-500";

  const mergedClasses: string = twMerge([baseClasses, className]);
  return (
    <>
      {/* Content Container */}
      <div className={mergedClasses} {...props}>
        {/* Content Section */}
        {children}
      </div>
    </>
  );
};
export default Container;
