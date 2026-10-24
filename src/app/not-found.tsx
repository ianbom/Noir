import Link from "next/link";

export default function NotFound() {
  return <section className="empty-page"><p className="label">404 / A different direction</p><h1>A space not found.</h1><p>The page you are looking for is not here.</p><Link href="/" className="action">Return to the studio</Link></section>;
}
