import React from "react";
import { Link } from "react-router-dom";

import Services from "../components/Services";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
import FeaturedRooms from "../components/FeaturedRooms";

export const Home = () => {
  return (
    <>
      <Hero>
        <Banner
          title="Luxurious Rooms"
          subtitle="Deluxe Rooms starting at $299"
        >
          <Link to="/rooms" className="btn-primary">
            Our Rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
  );
};

export default Home;
