import React from "react";

import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import Loading from "./Loading";

import { withRoomConsumer } from "../context";

export const RoomsContainer = ({ context }) => {
  const { loading, rooms, sortedRooms } = context;
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
};

export default withRoomConsumer(RoomsContainer);

// import React from "react";

// import RoomsFilter from "./RoomsFilter";
// import RoomsList from "./RoomsList";
// import Loading from "./Loading";

// import { RoomConsumer } from "../context";

// export const RoomsContainer = () => {
//   return (
//     <RoomConsumer>
//       {value => {
//         const { loading, rooms, sortedRooms } = value;

//         if (loading) {
//           return <Loading />;
//         }

//         return (
//           <>
//             <RoomsFilter rooms={rooms} />
//             <RoomsList rooms={sortedRooms} />
//           </>
//         );
//       }}
//     </RoomConsumer>
//   );
// };

// export default RoomsContainer;
