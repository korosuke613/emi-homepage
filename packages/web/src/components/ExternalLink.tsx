type Props = {
  title: string;
  description: string;
  href: string;
};

export default function ExternalLink({ description, href, title }: Props) {
  return (
    <a href={href} rel="noreferrer" target="_blank">
      <p>
        {title} <span>→</span>
      </p>
      <p>{description}</p>
    </a>
  );
}
