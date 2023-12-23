export default function Footer() {
  return (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
        <path
          fill="#0a785e"
          fillOpacity="1"
          d="M0,96L30,90.7C60,85,120,75,180,58.7C240,43,300,21,360,32C420,43,480,85,540,117.3C600,149,660,171,720,154.7C780,139,840,85,900,64C960,43,1020,53,1080,85.3C1140,117,1200,171,1260,160C1320,149,1380,75,1410,37.3L1440,0L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
      <div className="absolute left-0 bottom-0 w-full">
        <div className="w-[1170px] max-w-full mx-auto py-12 flex justify-between text-emerald-950">
          <p className="text-center text-3xl">FON / FOI 2023.</p>
        </div>
      </div>
    </div>
  );
}
