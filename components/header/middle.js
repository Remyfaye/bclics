import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Middle() {
  return (
    <div className="w-[100%] lg:w-[60%] ">
      <div className="carousel mt-3 w-full h-[100%] rounded-xl">
        <Carousel
          showArrows={true}
          autoPlay={true}
          interval={2000}
          infiniteLoop={true}
          showThumbs={false}
        >
          <div>
            <img src="/shoes.png" className="h-[100%] w-full " />
          </div>
          <div>
            <img src="/add1.png" />
          </div>
          <div>
            <img src="headphones.png" />
          </div>
          <div>
            <img src="/add2.png" />
          </div>
          <div>
            <img src="/woman.png" />
          </div>
        </Carousel>

        {/* <div id="slide1" className="carousel-item relative w-full">
          <img src="/nav.gif" alt="image" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full">
          <img src="/cashless.png" className="w-full" alt="image" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full">
          <img src="/headphones.png" className="w-full" alt="image" />
          <h1>3rd slide</h1>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide4" className="carousel-item relative w-full">
          <img src="/woman.png" className="w-full" alt="image" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
