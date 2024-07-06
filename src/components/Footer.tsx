import logo from '@/assets/images/logo.png'
import { ThemeContext } from '@/providers/ThemeProvider';
import Image from 'next/image';
import { useContext } from 'react';
const Footer = () => {
    const { theme } = useContext(ThemeContext);
  return (
    <footer className={
        theme === 'dark'
        ? "footer justify-center bg-slate-950 items-center p-4"
        : "footer justify-center bg-slate-100 items-center p-4"
    }>
      <aside className="flex items-center">
        <Image src={logo} className='rounded-md' alt="Rafi Ferdos" width={40} height={40} />
        <p>Copyright ©{new Date().getFullYear()} - All right reserved</p>
      </aside>
      
    </footer>
  );
};

export default Footer;
