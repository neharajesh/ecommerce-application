import one from "./images/one.jpg";
import two from "./images/two.jpg";
import three from "./images/three.jpg";

export const Home = () => {
    return (
      <div className="home-page-container">
        <div>
          <h1>This is the homepage!</h1>

          {/* <div className="slideshow-container">
            <div className="slideshow-image">
              <div className="slideshow-image-number">1 / 3</div>
              <img src={one} alt="one" />
              <div className="slideshow-image-caption">Caption Text</div>
            </div>
            <div className="slideshow-image">
              <div className="slideshow-image-number">2 / 3</div>
              <img src={two} alt="two" />
              <div className="slideshow-image-caption">Caption Text</div>
            </div>
            <div className="slideshow-image">
              <div className="slideshow-image-number">3 / 3</div>
              <img src={three} alt="three" />
              <div className="slideshow-image-caption">Caption Text</div>
            </div>
          </div> */}
          
          <br/>
          
          <p>here we can add those circles if wanted</p>
        </div>
      </div>
    );
  };
  