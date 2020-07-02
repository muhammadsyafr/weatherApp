import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonInput,
  IonToolbar
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
  const [weather, setWeather] = useState<any>([]);
  const [realtime, setRealtime] = useState<any>([]);
  const [text, setText] = useState<string>();
  let getCities: any = localStorage.getItem("cities")

  useEffect(() => {
    fetchData('', getCities).then((res: any) => {
      setWeather(res);
      setTimeout(() => {
        document.title = "Current Weather";
      }, 1000);
    });
  }, [text]);

  useEffect(() => {
    setInterval(() => {
      setRealtime(moment().format("hh:mm:ss a"));
    }, 1000);
  });

  const setCities = (cities:any) => {
    window.localStorage.setItem("cities", cities);
    setText(cities)
  }

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle className="ion-text-capitalize"> {weather ? weather.name : "Data not found"} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div style={{ textAlign: "center" }}>
          <h2 className="ion-60p">
            {realtime}
          </h2>
          <IonInput placeholder={'Masukan Lokasi'} className="ion-text-capitalize" debounce={1000} mode="ios" onIonChange={e => setCities(e.detail.value!)}></IonInput>
        </div>
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
