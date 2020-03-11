import React from "react";
import { Link } from "react-router-dom";

import Banner from "../components/Banner";
import Hero from "../components/Hero";

export const Error = () => {
  return (
    <Hero>
      <Banner title="404" subtitle="Page Not Found">
        <Link to="/" className="btn-primary">
          Return Home
        </Link>
      </Banner>
    </Hero>
  );
};

export default Error;
