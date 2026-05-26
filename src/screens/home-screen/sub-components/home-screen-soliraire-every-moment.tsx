//import Image from "next/image";

const HomeScreenSolitaireEveryMoment: React.FC = () => {
  const features = [
    {
      img: "/home-page/features/Website Banner 311 X 497 pxl 8.png",
      label: "Hearts & Arrows",
    },
    {
      img: "/home-page/features/Website Banner 311 X 497 pxl 5.png",
      label: "100% Certified",
    },
    {
      img: "/home-page/features/Website Banner 311 X 497 pxl 6.png",
      label: "Upgrade",
    },
    {
      img: "/home-page/features/Website Banner 311 X 497 pxl 1.png",
      label: "Buyback",
    },

    {
      img: "/home-page/features/Website Banner 311 X 497 pxl 1.png",
      label: "Free Insurance",
    },
    {
      img: "/home-page/features/Website Banner 311 X 497 pxl 7.png",
      label: "Light Performance",
    },
    {
      img: "/home-page/features/Website Banner 311 X 497 pxl 4.png",
      label: "Laser Inscribed",
    },
    {
      img: "/home-page/features/Website Banner 311 X 497 pxl 2.png",
      label: "360° Loupe View",
    },
    {
      img: "/home-page/features/Website Banner 311 X 497 pxl 7.png",
      label: "Conflict Free Diamonds",
    },
  ];

  return (
    <>
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-5xl font-light tracking-wide text-black">
              Solitaires for every moment
            </h1>

            <p className="mt-4 text-gray-600 text-base lg:text-lg">
              Add brilliance to each day
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/home-page/features/Website Banner 427 X 342 pxl_1.jpg"
                  alt="Superior Quality"
                  className="w-full h-[260px] lg:h-[360px] object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <p className="mt-4 text-center text-lg tracking-wide">
                Superior Quality
              </p>
            </div>

            {/* Card 2 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/home-page/features/Website Banner 427 X 342 pxl_2.jpg"
                  alt="Transparent Pricing"
                  className="w-full h-[260px] lg:h-[360px] object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <p className="mt-4 text-center text-lg tracking-wide">
                Transparent Pricing
              </p>
            </div>

            {/* Card 3 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/home-page/features/Website Banner 427 X 342 pxl_4.jpg"
                  alt="Diamond Journey"
                  className="w-full h-[260px] lg:h-[360px] object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <p className="mt-4 text-center text-lg tracking-wide">
                Diamond Journey
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="block bg-white features-wrap text-center">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-xs-12 features-inner plr-xs-0 overflow-x-auto scrollbar-hidden">
              <ul className="branding-slider">
                {features.map(({ img, label }) => (
                  <li
                    key={label}
                    className="branding-slider-block min-w-[125.56px]"
                  >
                    <div
                      style={{
                        backgroundImage: `url("${img}")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "120px",
                        height: "120px",
                        margin: "0 auto",
                      }}
                    ></div>
                    <p>{label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomeScreenSolitaireEveryMoment;
