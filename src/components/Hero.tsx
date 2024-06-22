import { Spotlight } from "./ui/Spotlight";

const Hero = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full flex-col relative overflow-hidden mx-auto py-10 md:py-0">
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="blue"
      />
      <div className="p-4 z-10 relative w-full text-center">
        <h1>Hello, I&apos;m Rafi Ferdos</h1>
      </div>
    </div>
  );
};

export default Hero;
