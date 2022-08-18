import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navbar() {
  const Router = useRouter();

  return (
    <nav className="navbar sticky-top navbar-dark bg-dark d-flex">
      <Link passHref href={'/'} className="navbar-brand">
        <button type="button" className="btn btn-md btn-success fw-bold">
          Dashboard
        </button>
      </Link>

      <Link passHref href={'/marketPlace'} className="navbar-brand">
        <button type="button" className="btn btn-md btn-success fw-bold">
          Market Place
        </button>
      </Link>

      <Link passHref href={'/searchBuyer'} className="navbar-brand">
        <button type="button" className="btn btn-md btn-success fw-bold">
          Search Buyer Transaction 
        </button>
      </Link>

      <Link passHref href={'/addProduct'} className="navbar-brand">
        <button type="button" className="btn btn-md btn-success fw-bold">
          ADD Product
        </button>
      </Link>
    </nav>
  )
}
