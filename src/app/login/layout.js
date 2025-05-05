// app/admin/layout.js
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function LoginLayout({ children }) {
  return (
    <div className={roboto.className}>
      {children}
    </div>
  );
}