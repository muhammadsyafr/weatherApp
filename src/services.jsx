import axios from "axios";
import moment from 'moment';
import 'moment/locale/id'  // without this line it didn't work
moment.locale('id')

export const weatherService = {
  url: "https://api.openweathermap.org/data/2.5/",
  key: "ca90722e10f0a0fdd99f15f4314073db",
  urlmyCity: `http://api.openweathermap.org/data/2.5/weather?q=purwokerto&appid=ca90722e10f0a0fdd99f15f4314073db&units=metric&lang=id`,
};

export const fetchData = async (loadContent, city) => {
  let cities = 'Purwokerto' //default cities in Tab1
  if (city) {
    cities = city
  }
  if(loadContent === 'forecast'){
    try {
      const res = await axios.get(
        `${weatherService.url}/forecast?q=${cities}&appid=${weatherService.key}&units=metric`
      );
      return res.data;
    } catch (error) {}
  } else {
    try {
      const {
        data: { main, name, weather },
      } = await axios.get(
        `${weatherService.url}/weather?q=${cities}&appid=${weatherService.key}&units=metric`
      );
      const modifiedData = {
        main,
        name,
        weather,
      };
      return modifiedData;
    } catch (error) {}
  }
};

export const convertDate = date => {
    if (!date) return null;
    return moment(date).format("lll") + " WIB";
};
