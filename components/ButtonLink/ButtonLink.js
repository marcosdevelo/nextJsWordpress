import Link from "next/link";
export const ButtonLink = ({ destination, label }) => {
  return (
    <div>
      <Link href={destination}>
        <a className="btn">{label}</a>
      </Link>
    </div>
  );
};
