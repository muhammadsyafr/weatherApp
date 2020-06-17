import React, { useEffect, useState } from "react";
import {
  IonButtons,
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import "./Tab3.css";
import { fetchData, convertDate } from "../services";

const DataWeather = (props: any) => {
  const [showAlert1, setShowAlert1] = useState(false);

  const setToLocalStorage = () => {
    window.localStorage.setItem("favorite", JSON.stringify(props));
    setShowAlert1(true);
    // window.location.reload();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{props.data.dt}</IonCardSubtitle>
            <IonCardTitle>{convertDate(props.data.dt_txt)}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent className="ion-text-center">
          <img
            src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
            alt={props.data.weather[0].icon}
            style={{ width: "180px" }}
          />
          </IonCardContent>
          <IonButton
            fill="clear"
            color="secondary"
            onClick={setToLocalStorage}
            expand="full"
          >
            Add to Favorite
          </IonButton>
        </IonCard>
      </IonContent>

      {/* Alert when Success Add to Localstorage */}
      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        cssClass="my-custom-class"
        header={"Success"}
        message={"Success Add to Favorite"}
        // buttons={['Back']}
      />
    </div>
  );
};

const Tab3: React.FC = (props: any) => {
  const weatherId = props.match.params.id;
  const [weatherMatch, setWeatherMatch] = useState<any>([]);
  useEffect(() => {
    fetchData("forecast").then((res) => {
      let arrWeather = {
        list: res.list,
        city: res.city,
      };
      setWeatherMatch(arrWeather.list);
    });
  }, []);

  let findWeatherById = weatherMatch.find((obj: any) => obj.dt == weatherId);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="../tab2" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {findWeatherById ? <DataWeather data={findWeatherById} /> : "Loading"}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
