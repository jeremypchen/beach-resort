import React, { Component } from "react";
import Client from "./Contentful";

import items from "./data";
export const RoomContext = React.createContext();

export class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,

    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  getData = async () => {
    try {
      const { items } = await Client.getEntries({
        content_type: "beachResortRoom",
        order: "fields.price"
      });

      let rooms = this.formatData(items);
      let featuredRooms = rooms.filter(room => !!room.featured);

      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));

      this.setState({
        rooms,
        sortedRooms: rooms,
        featuredRooms,
        loading: false,

        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (err) {
      console.err(err);
    }
  };

  componentDidMount = () => {
    this.getData();
  };

  formatData = items => {
    let tempItems = items.map(item => {
      const id = item.sys.id;
      const images = item.fields.images.map(image => image.fields.file.url);
      return {
        ...item.fields,
        images,
        id
      };
    });
    return tempItems;
  };

  getRoom = slug => {
    return this.state.rooms.find(room => room.slug === slug);
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    let tempRooms = [...rooms];
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    capacity = parseInt(capacity);
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    tempRooms = tempRooms.filter(room => room.price <= parseInt(price));

    tempRooms = tempRooms.filter(
      room => minSize <= room.size && room.size <= maxSize
    );

    if (breakfast) {
      tempRooms = tempRooms.filter(room => !!room.breakfast);
    }

    if (pets) {
      tempRooms = tempRooms.filter(room => !!room.pets);
    }

    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

export const withRoomConsumer = Component => {
  return props => (
    <RoomConsumer>
      {value => <Component {...props} context={value} />}
    </RoomConsumer>
  );
};

export const RoomConsumer = RoomContext.Consumer;
