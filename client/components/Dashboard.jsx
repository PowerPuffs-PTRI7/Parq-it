import * as React from "react";
import axios from "axios";
import "../styles.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@mui/material/TextField";
import Maps from "./Map.jsx";
import ParkingSpot from "./ParkingSpot.jsx";
import { useEffect, useState } from "react";
import ParkingSpotTest from "./ParkingSpotTest.jsx";
import { useLocation } from "react-router";

export default function Dashboard(state) {
  const useStyles = makeStyles(() => ({
    textField: {
      width: "98%",
      height: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500,
      borderRadius: 0,
    },
    overrides: {
      border: 0,
      borderRadius: 20,
    },
    input: {
      color: "white",
    },
  }));

  const classes = useStyles();
  const location = useLocation();

  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(10);
  const [data, setData] = useState({
    lat: 34.052235,
    lng: -118.243683,
    listings: [],
  });

  const props = {
    data: data,
    isVisible: true,
    zoom: zoom,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/all", {
        address: address,
      })
      .then((res) => {
        setData(res.data);
        setZoom(13);
      })
      .catch((err) => {
        console.log(`Error occured in useEffect: ${err}`);
      });
  };

  useEffect(
    () => {
      setData(location.data ? location.data : data);
      setZoom(13);
    },[]
  );
  // { lat: 34.052235, lng: -118.243683, listings: [] }

  const listings = data.listings;
  // console.log('the listings are', listings)

  const spotElems = listings.map((ele, i) => {
    // convert latitude to longitude of the search to radians
    const radLatSearch = (Math.PI * data.lat) / 180;
    const radLngSearch = (Math.PI * data.lng) / 180;

    // convert latitude to longitude of the parking spot to radians
    const radLatSpot = (Math.PI * ele.coordinates.lat) / 180;
    const radLngSpot = (Math.PI * ele.coordinates.lng) / 180;

    // calculate the great circle
    var R = 6371; // km
    var dLat = radLatSpot - radLatSearch;
    var dLon = radLngSpot - radLngSearch;

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(radLatSearch) *
        Math.cos(radLatSpot);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    // console.log(d);
    // check if the distance is within 5 miles
    if (d > 8.04672) {
      props.isVisible = false;
    } else {
      props.isVisible = true;
    }

    // only return spots with isVisible set to true
    if (props.isVisible) {
      return <ParkingSpotTest key={i} info={ele} {...props} />;
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      <div
        className="filterBar"
        style={{ height: "40px" }}
        sx={{ flexGrow: 1 }}
      >
        <div
          className="leftFilter"
          style={{ width: "30%", float: "left", marginLeft: "10px" }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard-search"
              variant="outlined"
              label="city, state, zip code"
              className={classes.textField}
              value={address}
              size="small"
              onChange={(e) => setAddress(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <div className='search-icon-div' onClick={handleSubmit}>
                      <SearchIcon sx={{ color: "#B9D8D8" }} />
                    </div>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </form>
        </div>

        <div className="rightFilter" style={{ width: "60%", float: "right" }}>
          <Button className="filterPrice" color="inherit" sx={{ width: 10 }}>
            <Typography
              // variant="h6"
              component="div"
              sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
              }}
            >
              price
            </Typography>
          </Button>
          <Button className="filterPrice" color="inherit" sx={{ width: 10 }}>
            <Typography
              // variant="h6"
              component="div"
              sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
              }}
            >
              size
            </Typography>
          </Button>
          <Button className="filterPrice" color="inherit" sx={{ width: 10 }}>
            <Typography
              // variant="h6"
              component="div"
              sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
              }}
            >
              type
            </Typography>
          </Button>
        </div>
      </div>
      <div className="mapAndTiles" style={{ height: `calc( 100vh - 145px )` }}>
        <div
          className="leftMap"
          style={{ width: "49%", height: "100%", float: "left" }}
        >
          <Maps className="map" {...props} />
        </div>
        <div
          className="rightTiles"
          style={{ width: "50%", height: "100%", float: "right" }}
        >
          {spotElems}
        </div>
      </div>
    </div>
  );
}
