import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonAvatar,
  IonText,
} from "@ionic/react";
import "./Tab2.css";
import { fetchData, convertDate } from "../services";
import { key } from "ionicons/icons";

const Tab2: React.FC = () => {
  useEffect(() => {
    // document.title = "Forecast"
    fetchData("forecast")
      .then((res) => {
        setForecast(res.list);
      })
      .then((res) => {
        document.title = "Forecast";
      });
  }, [document.title]);

  const [forecast, setForecast] = useState<any>([]);

  const ListForecast = (data: any) => {
    return (
      <IonItem routerLink={`/detail/${data.data.dt}`} button key={key}>
        <IonAvatar slot="start">
          <img
            src={`http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`}
            alt="img weather"
          />
        </IonAvatar>
        <IonLabel>
          <IonText>
            <h3>{data.data.weather[0].description}</h3>
          </IonText>
          <p>{convertDate(data.data.dt_txt)}</p>
          <p>
            {data.data.main.temp_min}°C - {data.data.main.temp_max}°C
          </p>
        </IonLabel>
        <IonText color="success" slot="end">
          <p className="main-temp">{data.data.main.temp}°C</p>
        </IonText>
      </IonItem>
    );
  };

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Forecast</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          {forecast ? (
            forecast.map(function (value: any, key: number) {
              return <ListForecast data={value} key={key} />;
            })
          ) : (
            <div className="container">Data tidak dapat ditampilkan!</div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
