import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { fetchData } from "../services";

const LocalWeather = (props: any) => {
  let main = props.data.main || {};
  let weather = props.data.weather || [];

  interface KeyValuePair {
    icon: string;
    description: string;
  }

  let datas: KeyValuePair = { icon: "", description: "" };

  weather.forEach(function (value: any) {
    datas.icon = value.icon;
    datas.description = value.description;
  });

  return (
    <div className="container">
      {weather ? (
        <>
          <h1 className="ion-60p">{main.temp} °C </h1>
          <img
            src={`http://openweathermap.org/img/wn/${datas.icon}@2x.png`}
            alt={datas.description}
            style={{ width: "180px" }}
          />
          <p>{datas.description}</p>
        </>
      ) : (
        "Loading Content"
      )}
    </div>
  );
};

const Tab1: React.FC = () => {
  useEffect(() => {
    fetchData().then((res: any) => {
      setWeather(res);
      setTimeout(() => {
        document.title = "Current Weather " + res.name;
      }, 1000);
    });
  }, [document.title]);

  useEffect(() => {
    setInterval(() => {
      setRealtime(moment().format("hh:mm:ss a"));
    }, 1000);
  });

  const [weather, setWeather] = useState<any>([]);
  const [realtime, setRealtime] = useState<any>([]);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle> {weather ? weather.name : "Data not found"} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h1 className="ion-60p" style={{ textAlign: "center" }}>
          {realtime}
        </h1>
        <div className="container-tab1">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Test</IonTitle>
            </IonToolbar>
          </IonHeader>
          {weather ? <LocalWeather data={weather} /> : "Data not found"}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
