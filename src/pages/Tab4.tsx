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
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import "./Tab3.css";
import { convertDate } from "../services";
import { trash } from "ionicons/icons";

const Tab4: React.FC = (props: any) => {
  const [favorite, setFavorite] = useState<any>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  useEffect(() => {
    let getFav: any = localStorage.getItem("favorite");
    const getFavJSON = JSON.parse(getFav);
    setFavorite(getFavJSON);
    document.title = "Favorite"
  }, [isDeleted]);

  useEffect(() => {
    let getFav: any = localStorage.getItem("favorite");
    const getFavJSON = JSON.parse(getFav);
    setFavorite(getFavJSON);
    document.title = "Favorite"
  }, [document.title]);

  const DeleteFavorite = () => {
    var confirmed = window.confirm("Apakah yakin ingin menghapus seluruh favorit");
    if (confirmed == true) {
      localStorage.removeItem('favorite');
      setFavorite([])
      setIsDeleted(true)
    }
  }

  const Favorite = (props: any) => {
    // const data = props.data
    return (
      <IonItem button>
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
          <p className="main-temp">{props.data.main.temp}°C</p>
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
        { favorite ? favorite.map(function (value: any, key:number) {
          return (
          <div key={key}>
            <Favorite data={value}/>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton onClick={DeleteFavorite} style={{position: 'fixed', right: "5%", bottom: 15}} mode="ios" color="danger">
                <IonIcon icon={trash}></IonIcon>
              </IonFabButton>
            </IonFab>
          </div>)
        }) : <div className="ion-padding">Belum ada favorit</div>
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
