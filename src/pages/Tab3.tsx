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
      <h1>{props.data.dt}</h1>
      <h2>{props.data.weather[0].icon}</h2>
      <h2>{convertDate(props.data.dt_txt)}</h2>
      <IonButton color="secondary" onClick={setToLocalStorage}>
        Add to Favorite
      </IonButton>
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

      console.log(localStorage.getItem("favorite"));
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
