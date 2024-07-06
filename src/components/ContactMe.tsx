import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";
import image3D from '../assets/images/rafi-3d.png'
import Image from "next/image";

const ContactMe = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <div
        className={
            theme === "dark"
              ? "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-black text-white"
              : "flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto bg-white text-black"
          }
          >
            <div className="flex items-center justify-center flex-col md:flex-row max-w-7xl mx-auto w-11/12">
                <div className={
                    theme === 'dark'
                    ? "flex items-center justify-center md:w-1/2 bg-slate-950 rounded-3xl"
                    : "flex items-center justify-center md:w-1/2 bg-slate-100 rounded-3xl"
                }>
                    <Image src={image3D} alt="Rafi 3D" width={500} height={500} />
                </div>

            </div>
        </div>
    );
};

export default ContactMe;