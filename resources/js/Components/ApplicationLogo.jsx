export default function ApplicationLogo({ className }) {
  return (
    <a href={route('home')}>
      <img src="/imgs/brand/logo_teners.png" alt="Invoicer by Teners" className={` ${className}`} />
    </a>
  );
}
