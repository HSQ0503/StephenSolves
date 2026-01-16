import DynamicIcon from "@/helpers/DynamicIcon";
import Link from "next/link";

interface ISocial {
  name: string;
  icon: string;
  link: string;
}

interface Props {
  source: ISocial[];
  className: string;
}

const Social = ({ source, className }: Props) => {
  return (
    <ul className={className}>
      {source.map((social: ISocial) => (
        <li key={social.name}>
          <Link
            aria-label={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <span className="sr-only">{social.name}</span>
            <DynamicIcon
              fontSize={24}
              className="inline-block text-secondary hover:text-primary hover:-translate-y-1 transition-all duration-300"
              icon={social.icon}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Social;
