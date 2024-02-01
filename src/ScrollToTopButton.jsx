import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    const currentScrollPos = window.pageYOffset;
    const isVisible = currentScrollPos > 800;
    setIsVisible(isVisible);
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button className="topButton" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} className="icon" />
        </button>
      )}
    </div>
  );
}

export default ScrollToTopButton;
