import { useRef, useState } from "react";

const withHorizontalScrollButtons = (WrappedComponent) => {
  const WithHorizontalScrollButtons = (props) => {
    const scrollX = useRef(0);
    const scrollableElementRef = useRef();
    const [showLeftScrollBtn, setShowLeftScrollBtn] = useState(false);
    const [showRightScrollBtn, setShowRightScrollBtn] = useState(true);
    const { scrollStep } = props;

    const handleListScroll = (value) => {
      const newScrollX = scrollX.current + value;
      scrollX.current = newScrollX;
      scrollableElementRef.current.scrollLeft = scrollX.current;

      if (newScrollX > 0) {
        setShowLeftScrollBtn(true);
      } else {
        setShowLeftScrollBtn(false);
      }
      const isFullyScrolled =
        Math.ceil(scrollableElementRef.current.scrollLeft) +
          scrollableElementRef.current.clientWidth >=
        scrollableElementRef.current.scrollWidth;
      if (isFullyScrolled) {
        setShowRightScrollBtn(false);
      } else {
        setShowRightScrollBtn(true);
      }
    };

    return (
      <div className="relative">
        <WrappedComponent
          {...props}
          scrollableElementRef={scrollableElementRef}
        />
        {showLeftScrollBtn && (
          <button
            className="absolute h-full w-16 bg-gradient-to-r from-black bg-opacity-90 flex justify-center items-center opacity-75 hover:opacity-100 text-white font-bold text-4xl z-10 top-0"
            onClick={(e) => handleListScroll(-scrollStep)}
          >
            {"<"}
          </button>
        )}

        {showRightScrollBtn && (
          <button
            className="absolute h-full w-16 bg-gradient-to-l from-black bg-opacity-90 flex justify-center items-center opacity-75 hover:opacity-100 text-white font-bold text-4xl z-10 top-0 right-0"
            onClick={(e) => handleListScroll(scrollStep)}
          >
            {">"}
          </button>
        )}
      </div>
    );
  };

  return WithHorizontalScrollButtons;
};

export default withHorizontalScrollButtons;
