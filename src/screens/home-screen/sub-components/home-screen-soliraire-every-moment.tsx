//import Image from "next/image";

const HomeScreenSolitaireEveryMoment: React.FC = () => {
  const features = [
    { img: "/home-page/features/insurance.jpg", label: "Free Insurance" },
    { img: "/home-page/features/certified.jpg", label: "100% Certified" },
    {
      img: "/home-page/features/diamond-upgrade.jpg",
      label: "Lifetime Upgrade",
    },
    { img: "/home-page/features/hearts-arrows.jpg", label: "Hearts & Arrows" },
    { img: "/home-page/features/buyback.jpg", label: "Lifetime Buyback" },
    {
      img: "/home-page/features/conflict-free.jpg",
      label: "Conflict Free Diamonds",
    },
    { img: "/home-page/features/laser.jpg", label: "Laser Inscribed" },
    {
      img: "/home-page/features/light-performance.jpg",
      label: "Light Performance",
    },
    { img: "/home-page/features/360-view.jpg", label: "360° Loupe View" },
  ];

  return (
    <>
      <section className="block module-home">
        <div className="featured-products waypoint-active" data-waypoint="once">
          <header>
            <h1 className="raise main-title"> Solitaires for every moment </h1>
            <p className="body-large raise">Add brilliance to each day</p>
          </header>
          <div className="container">
            <div className="row">
              <div className="flex branding-slider">
                <div className="col col-sm-4 classic branding-slider-block">
                  <div className="with-link-primary">
                    <div className="background-container">
                      <div
                        className="image-container image-ready small-img mobile-view-image"
                        style={{
                          backgroundImage: 'url("/UVWXY1abb6jpg.jpg")',
                          minHeight: "230px",
                        }}
                      ></div>
                    </div>
                    <span className="link-primary animate-out">
                      Superior Quality
                    </span>
                  </div>
                </div>
                <div className="col col-sm-4 classic branding-slider-block">
                  <div className="with-link-primary">
                    <div className="background-container">
                      <div
                        className="image-container image-ready small-img mobile-view-image"
                        style={{
                          backgroundImage: 'url("/wxyzA5c076jpg.jpg")',
                          minHeight: "230px",
                        }}
                      ></div>
                    </div>
                    <span className="link-primary animate-out">
                      Transparent Pricing
                    </span>
                  </div>
                </div>
                <div className="col col-sm-4 classic branding-slider-block">
                  <div className="with-link-primary">
                    <div className="background-container">
                      <div
                        className="image-container image-ready small-img mobile-view-image"
                        style={{
                          backgroundImage: 'url("/MNOPQ3e663jpg.jpg")',
                          minHeight: "230px",
                        }}
                      ></div>
                    </div>
                    <span className="link-primary animate-out">
                      Diamond Journey
                    </span>
                  </div>
                </div>
              </div>
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
