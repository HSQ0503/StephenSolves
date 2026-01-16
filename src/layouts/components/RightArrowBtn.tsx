import Link from "next/link";

interface Props {
  label: string;
  link: string;
  className?: string;
  [key: string]: any;
}

const RightArrowBtn = ({ label, link, className, ...rest }: Props) => {
  return (
    <Link
      href={link}
      {...rest}
      className={`group/arrowBtn flex items-center max-w-max gap-x-4 ${className}`}
      aria-label={label}
    >
      <span>{label}</span>
      <div className="relative w-4 h-4 grid place-items-center overflow-hidden">
        <i className="group-hover/arrowBtn:translate-x-full transition-transform duration-500 ease-out w-4 h-4 grid place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "100%", height: "100%" }}
          >
            <line x1={5} y1={12} x2={19} y2={12} />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </i>
        <i className="absolute top-0 right-full group-hover/arrowBtn:translate-x-full transition-transform duration-500 ease-out w-4 h-4 grid place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "100%", height: "100%" }}
          >
            <line x1={5} y1={12} x2={19} y2={12} />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </i>
      </div>
    </Link>
  );
};

export default RightArrowBtn;
