import axios from 'axios';
import { Message } from "element-react";

export function getPlace(place) {
    var key = "&key=AIzaSyCA5G_bktqug6RuvSZNgG2n-4hTLsluKCg"
    var fixCore = 'https://cors-anywhere.herokuapp.com/'
    return axios.get(fixCore+`https://maps.googleapis.com/maps/api/place/textsearch/json?query=`+place+key)
      .then(res => {
          console.log(res)
        return res;
      })

};