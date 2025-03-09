import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { MdOutlineLanguage } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaLink,FaArrowRight } from "react-icons/fa";
import Footer from "./Footer";

const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [language, setLanguage] = useState<string>("EN");
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    // Add functionality here to change the whole content based on the selected language
  };

  // Add scroll event listener
  useEffect(() => {
    const firstContentHeight =
      document.querySelector(".first-content")?.clientHeight || 0;

    const handleScroll = () => {
      if (window.scrollY > firstContentHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper scrolled={scrolled}>
      <div className="home">
        <div className={`first-content ${scrolled ? "hidden" : ""}`}>
          <h4>
            <span>NEW</span> Explore innovative ways to connect! Dive into
            <span className="line"> our QR Code Inspiration Gallery </span>{" "}
            today.
          </h4>
        </div>

        <div className={`second-content ${scrolled ? "scrolled" : ""}`}>
          <div className={`navbar ${scrolled ? "sticky" : ""}`}>
            <div className="logo lobster-regular">
              <h2>bitly</h2>
            </div>
            <div className="links">
              {["Platform", "Solutions", "Pricing", "Resources"].map(
                (link, index) => (
                  <div
                    className="nav-link"
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    {link}
                    {activeIndex === index ? (
                      <SlArrowUp size={12} />
                    ) : (
                      <SlArrowDown size={12} />
                    )}
                  </div>
                )
              )}
            </div>
            <div className="languages">
              <MdOutlineLanguage size={20} />
              <p>{language}</p>
              <TiArrowSortedDown size={20} />
              <div className="dropdown-content">
                {["EN", "FR", "ES"].map((lang) => (
                  <div
                    className="dropdown-item"
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                  >
                    {lang === "EN"
                      ? "English"
                      : lang === "FR"
                      ? "French"
                      : "Spanish"}
                  </div>
                ))}
              </div>
            </div>
            <div className="btn">
              <button className="log-in transparent-btn">Log in</button>
              <button className="get-quote">Get a Quote</button>
              <button className="signup">Sign up Free</button>
            </div>
          </div>
          <div className="middle-content">
            <h1>Build stronger digital connections</h1>
            <h4>
              Use our URL shortener, QR Codes, and landing pages to engage your
              audience and connect them to the right information. Build, edit,
              and track everything inside the Bitly Connections Platform.
            </h4>
            <div className="tag">
              <FaLink className="FaLinkStyled" />
              <p>Short Link</p>
            </div>
          </div>
          <div className="url-input-content">
            <div className="url-input-card">
              <h2>Shorten a long link</h2>
              <p>No credit card required.</p>
              <label>Paste your long link here</label>
              <input
                type="text"
                defaultValue="https://example.com/my-long-url"
              />
              <button className="icon-btn">
                Get your link for Free
                <FaArrowRight className="icon" />
              </button>
            </div>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;

///// styles
const Wrapper = styled.section<{ scrolled: boolean }>`
  .home {
    width: 100%;
    height: 150vh;
    display: flex;
    flex-direction: column;
  }

  .first-content {
    width: 100%;
    height: 8vh;
    background-color: #cedafa;
    color: #031f39;
    font-family: sans-serif;
    font-size: 1.1em;
    font-weight: bold;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
    opacity: 1;
    visibility: visible;
  }

  .first-content.hidden {
    height: 0;
    opacity: 0;
    visibility: hidden;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .first-content span {
    color: white;
    background-color: #031f39;
    border-radius: 5px;
    padding: 3px 5px;
  }

  .first-content .line {
    text-decoration: underline;
    background-color: #cedafa;
    color: #031f39;
  }

  .second-content {
    width: 100%;
    height: 140vh;
    border: 1px solid green;
    background-color: #031f39;
    transition: background-color 0.3s ease;
  }

  .second-content.scrolled {
    padding-top: 12vh; /* Same as navbar height */
  }

  .navbar {
    width: 100%;
    height: 12vh;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 20px;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .navbar.sticky {
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e0e0e0;
  }

  .logo {
    color: #ee6123;
    font-size: 2em; /* Increase font size for larger logo */
  }

  .links {
    display: flex;
    gap: 30px;
  }

  .nav-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;
    font-size: 1.1em;
    font-weight: bold;
    gap: 5px;
    transition: color 0.3s ease;
  }

  .sticky .nav-link {
    color: #031f39;
  }

  .languages {
    position: relative;
    display: flex;
    align-items: center;
    color: white;
    font-size: 1.1em;
    gap: 5px;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .sticky .languages {
    color: #031f39;
  }

  .languages:hover .dropdown-content {
    display: block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 30px;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    min-width: 200px;
    border-radius: 3px;
  }

  .languages:hover {
    background-color: ${(props) => (props.scrolled ? "#f0f0f0" : "#575757")};
    padding: 3px 3px;
    border-radius: 3px;
  }

  .dropdown-item {
    color: #575757;
    padding: 8px 12px;
    text-decoration: none;
    display: block;
    text-align: left;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #575757;
    color: white;
  }

  .btn {
    display: flex;
    gap: 20px;
    font-weight: bolder;
  }

  .log-in {
    padding: 5px 10px;
    border: none;
    color: white;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .sticky .log-in {
    color: #031f39;
  }

  .btn button {
    text-align: center;
    padding: 10px;
    height: 7vh;
    width: 8vw;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .log-in:hover {
    background-color: ${(props) => (props.scrolled ? "#f0f0f0" : "#6395c4")};
  }

  .transparent-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .sticky .transparent-btn {
    color: #031f39;
  }

  .lobster-regular {
    font-family: "Lobster", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .signup {
    background-color: white;
    color: #031f39;
  }

  .sticky .signup {
    background-color: #031f39;
    color: white;
  }

  .signup:hover {
    background-color: #6395c4;
    border: none;
    color: white;
  }

  .get-quote {
    color: white;
    background-color: #031f39;
    border: 2px solid white;
    transition: all 0.3s ease;
  }

  .sticky .get-quote {
    color: #031f39;
    background-color: white;
    border: 2px solid #031f39;
  }

  .get-quote:hover {
    background-color: #6395c4;
    color: white;
    border: none;
  }
  .middle-content {
    width: 100%;
    height: 50vh;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #e0e0e0;
    gap: 2em;
  }
  .middle-content h1 {
    font-size: 50px;
  }
  .middle-content h4 {
    font-size: 20px;
    font-weight: lighter;
    width: 80%;
    height: 20vh;
    border: 1px solid red;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centers vertically */
    justify-content: center; /* Centers horizontally */
    text-align: center; /* Centers text horizontally */
  }
  .tag {
    height: 10vh;
    width: 10vw;
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .tag:hover {
    background-color: #cedafa;
  }
  .tag p {
    color: black;
    font-weight: bold;
  }
  .FaLinkStyled {
    color: #ee6123;
  }
  .url-input-content {
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: 30px;
    align-items: center;
    border: 1px solid red;
    width: 100%;
    height: 70vh;
  }
  .url-input-card {
    border: 1px solid black;
    height: 60vh;
    width: 70%;
    padding: 5px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    padding: 10px 0px 10px 30px;
  }

  .url-input-card h2 {
    font-size: 30px;
  }
  .url-input-card input {
    font-size: 27px; /* Adjust the font size as needed */
    width: 80%;
    border: 1px solid #6395c4;
    padding: 10px;
    border-radius: 5px;
  }
  .url-input-card p {
    font-size: 20px;
  }
  .url-input-card button {
    font-size: 20px;
    width: 27%;
    height: 8vh;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
  }
  .url-input-card label {
  font-weight:bold;
  }
  .icon-btn {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    font-weight: bolder;
    background-color: #6395c4;
    color: white;
    border: none;
  }
  .icon-btn:hover {
    background-color: white;
    color: #6395c4;
    border: 2px solid #6395c4;
    cursor: pointer;
  }
`;
