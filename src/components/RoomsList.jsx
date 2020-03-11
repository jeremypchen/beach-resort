import React from "react";

import Room from "./Room";

export const RoomsList = ({ rooms }) => {
  if (!rooms.length) {
    return (
      <div className="empty-search">
        <h3>Unfortunately, no rooms matched your search</h3>
      </div>
    );
  }

  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map(item => {
          return <Room key={item.id} room={item} />;
        })}
      </div>
    </section>
  );
};

export default RoomsList;
