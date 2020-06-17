import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonItem,
  IonAvatar,
  IonLabel,
  IonText,
} from "@ionic/react";
import "./Tab3.css";
import { convertDate } from "../services";

const Tab4: React.FC = (props: any) => {
  const [favorite, setFavorite] = useState<any>();
  useEffect(() => {
    let getFav: any = localStorage.getItem("favorite");
    const getFavJSON = JSON.parse(getFav);
    setFavorite(getFavJSON.data);
    // console.log(getFavJSON.data)
    document.title = "Favorite"
  }, [document.title]);

  const Favorite = (props: any) => {
    // const data = props.data
    return (
      <IonItem routerLink={`/detail/${props.data.dt}`} button>
        <IonAvatar slot="start">
          <img
            src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
            alt="img weather"
          />
        </IonAvatar>
        <IonLabel>
          <IonText>
            <h3>{props.data.weather[0].description}</h3>
          </IonText>
          <p>{convertDate(props.data.dt_txt)}</p>
          <p>
            {props.data.main.temp_min}°C - {props.data.main.temp_max}°C
          </p>
        </IonLabel>
        <IonText color="success" slot="end">
          <p className="main-temp">{"10"}°C</p>
        </IonText>
      </IonItem>
    );
  };

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Favorite</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* { favorite ? favorite.map(function (value: any) {
          return <Favorite />
        }) : ""
        } */}
        {favorite ? <Favorite data={favorite} /> : "kwowkokw"}
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
