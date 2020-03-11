import React, { Component } from "react";
import { Link } from "react-router-dom";

import { RoomContext } from "../context";

import defaultBcg from "../images/room-1.jpeg";

import Banner from "../components/Banner";
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    };
  }

  static contextType = RoomContext;

  componentDidMount = () => {};

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    if (!room) {
      return (
        <div className="error">
          <h3>Room does not exist</h3>
          <Link to="/rooms" className="btn-primary">
            Back to Rooms
          </Link>
        </div>
      );
    }

    const {
      breakfast,
      capacity,
      description,
      extras,
      images,
      name,
      pets,
      price,
      size
    } = room;

    const [, ...defaultImg] = images;

    return (
      <>
        <StyledHero img={images[0] || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              Back to Rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => (
              <img key={index} src={item} alt="room-img" />
            ))}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>Details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>Info</h3>
              <h6>Price: ${price}</h6>
              <h6>Size: {size} sq. ft</h6>
              <h6>
                Max Capacity: {capacity}
                {capacity === 1 ? " person" : " people"}
              </h6>
              <h6>{pets ? "Pets Allowed" : "No Pets Allowed"}</h6>
              <h6>{breakfast && "Free Breakfast"}</h6>
            </article>
          </div>
        </section>

        <section className="room-extras">
          <h6>Extras</h6>
          <ul className="extras">
            {extras.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </>
    );
  }
}
