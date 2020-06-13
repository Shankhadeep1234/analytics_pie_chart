/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import map from "lodash/map";
import DatePicker from "react-date-picker";
import Select from "react-select";
import "./Meets.css";
import "./PieChart.css";
import PieChart from "./PieChart";
import { getData } from "../../../services/analytics";

class Meets extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    analyticsData: [],
    filterBy: [],
    rooms: [{ value: "all", label: "All Rooms" }],
    usertypes: [{ value: 1, label: "default" }],
  };

  async componentDidMount() {
    const { data } = await getData("sample_response_browser_os.json");
    const filters = data.filterd_by;
    delete data.filterd_by;

    this.setState({
      analyticsData: this.formatRespinseData(data),
      filterBy: filters,
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

  _onSelect = (field) => () => {
    console.log(field);
  };

  render() {
    const { analyticsData, rooms, usertypes } = this.state;
    return (
      <div className="container text-center Meets clearfix">
        <h1>Meets Analytics</h1>
        <div className="chart-filter">
          <div className="chart-filter-items">
            <div className="filter">
              <label>Fiter Rooms</label>
              <Select
                value={rooms[0]}
                options={rooms}
                placeholder="Fiter by Rooms"
              />
            </div>

            <div className="filter">
              <label>Fiter UserType</label>
              <Select
                onChange={this._onSelect("usertypes")}
                value={usertypes[0]}
                options={usertypes}
                placeholder="Fiter by UserType"
              />
            </div>
          </div>
          <div className="chart-filter-items">
            <div className="filter">
              <label>Start Date</label>
              <DatePicker />
            </div>
            <div className="filter">
              <label>End Date</label>
              <DatePicker />
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
