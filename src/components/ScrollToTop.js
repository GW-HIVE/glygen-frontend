import React, { useEffect, useState } from "react";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import { Button } from "@material-ui/core";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <div onClick={scrollToTop}>
          <Button className="gg-btn-outline">
            <VerticalAlignTopIcon fontSize="large" />
          </Button>

          {/* <img src="https://i.postimg.cc/44Ytsk8Z/top-arrow-emoj.png" alt="Go to top" /> */}
        </div>
      )}
    </div>
  );
}
