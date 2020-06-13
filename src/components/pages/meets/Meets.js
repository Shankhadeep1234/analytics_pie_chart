/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import map from "lodash/map";
import DatePicker from "react-date-picker";
import Select from "react-dropdown-select";
import addDays from "date-fns/addDays";
import "./Meets.css";
import "./PieChart.css";
import PieChart from "./PieChart";
import { getData, getRooms } from "../../../services/analytics";

const NO_OF_DAYS = 15;
class Meets extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    analyticsData: [],
    filterBy: [],
    rooms: [{ value: "all", label: "All Rooms" }],
    usertypes: [{ value: 1, label: "Teacher" }],
    start_date: new Date(),
    end_date: addDays(new Date(), NO_OF_DAYS),
  };

  async componentDidMount() {
    // const { data } = await getData("sample_response_browser_os.json");
    // const filters = data.filterd_by;
    // delete data.filterd_by;

    // this.setState({
    //   analyticsData: this.formatRespinseData(data),
    //   filterBy: filters,
    // });

    const { data } = await getRooms();
    this.setState({
      rooms: this.formatRooms(data.rooms),
    });
  }

  formatRespinseData = (input) => {
    const output = [];
    map(input, (value, key) => {
      value.title = key;
      const widthClass = output.length === 2 ? "chart-item-full-width" : "";
      output.push({
        title: key,
        widthClass,
        chartdata: value,
      });
    });

    output.push({
      title: "devices",
      widthClass: "chart-item-full-width",
      chartdata: [
        {
          browser: "Phone",
          count: 2,
        },
        {
          browser: "PC",
          count: 10,
        },
      ],
    });
    output.push({
      title: "network_upstream",
      widthClass: "",
      chartdata: [
        {
          browser: "Chrome",
          count: 1,
        },
        {
          browser: "Firefox",
          count: 3,
        },
      ],
    });
    output.push({
      title: "network_downstream",
      widthClass: "",
      chartdata: [
        {
          browser: "Chrome",
          count: 5,
        },
        {
          browser: "Firefox",
          count: 1,
        },
      ],
    });
    return output;
  };

  formatRooms = (input) => {
    return map(input, (value, key) => ({
      data: value,
      label: value.room_name,
      value: value.room_name,
    }));
  };

  _onSelect = (field) => (value) => {
    // this.setState({
    //   [field]: value,
    // });
  };

  _onDateChnage = (field) => (date) => {
    this.setState({
      [field]: date,
      [field === "start_date" ? "end_date" : "start_date"]: addDays(
        date,
        NO_OF_DAYS
      ),
    });
  };

  customItemRenderer = ({ item, itemIndex, props, state, methods }) => (
    <span
      className="dropdown-select-item"
      title={`${item.data.teacher_name} | ${item.data.subject}`}
      onClick={() => methods.addItem(item)}
    >
      {item.label}
    </span>
  );

  render() {
    const {
      analyticsData,
      rooms,
      usertypes,
      start_date,
      end_date,
    } = this.state;
    return (
      <div className="container text-center Meets clearfix">
        <h1>Meets Analytics</h1>
        <div className="chart-filter">
          <div className="chart-filter-items">
            <div className="filter" onClick={() => console.log("ok")}>
              <label>Fiter Rooms</label>
              <Select
                itemRenderer={this.customItemRenderer}
                value={rooms[0]}
                options={rooms}
                placeholder="Fiter by Rooms"
              />
            </div>

            <div className="filter">
              <label>Fiter UserType</label>
              <Select
                onChange={this._onSelect("usertypes")}
                values={[1]}
                options={usertypes}
                placeholder="Fiter by UserType"
              />
            </div>
          </div>
          <div className="chart-filter-items">
            <div className="filter">
              <label>Start Date</label>
              <DatePicker
                value={start_date}
                onChange={this._onDateChnage("start_date")}
              />
            </div>
            <div className="filter">
              <label>End Date</label>
              <DatePicker
                value={end_date}
                onChange={this._onDateChnage("end_date")}
              />
            </div>
          </div>
        </div>
        <div className="chart-container clearfix">
          {analyticsData.map((value) => (
            <PieChart key={value.title} title={value.title} data={value} />
          ))}
        </div>
      </div>
    );
  }
}

export default Meets;
