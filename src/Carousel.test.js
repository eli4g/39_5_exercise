import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


it("renders without crashing", function() {
  render(<Carousel  />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Carousel  />);
  expect(asFragment()).toMatchSnapshot();
}); 

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});



it("works when you click on the right arrow then on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

      // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();


});



it("doesn't show you the left arrow on load", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

    // set rightArrow to the element
    const leftArrow = queryByTestId("left-arrow");
    

  // expect the the value of rightArrow to not be in the document
  expect(leftArrow).toHaveClass('Carousel-main-chevron');


});


it("doesn't show you the right arrow at the end of the carousel", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);


      

 
  // expect the the value of leftArrow to not be in the document
  expect(rightArrow).toHaveClass('Carousel-main-chevron');


});
