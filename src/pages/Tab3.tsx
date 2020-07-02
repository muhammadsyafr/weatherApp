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
  const [showAlert2, setShowAlert2] = useState(false);

  const setToLocalStorage = () => {
    let dataArr = [];
    let getFav: any = localStorage.getItem("favorite");
    if (getFav === null) {
      dataArr.push(props.data);
      window.localStorage.setItem("favorite", JSON.stringify(dataArr));
      setShowAlert1(true);
    } else {
      let parseGetFav = JSON.parse(getFav);
    
      // array check parseGetFav != props.data
      const isFavoriteExist = parseGetFav.filter((v:any) => v.dt === props.data.dt && v.wind.deg === props.data.wind.deg)
    
      if (isFavoriteExist[0]) {
        setShowAlert2(true);
      } else {
        // console.log('boleh tambah data disini');
        dataArr.push(...parseGetFav, props.data)
        window.localStorage.setItem("favorite", JSON.stringify(dataArr));
        setShowAlert1(true);
      }
    }
  };

  return (
    <div>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{props.data.dt}</IonCardSubtitle>
            <IonCardTitle>{props.data.weather[0].main}</IonCardTitle>
            <IonCardSubtitle>{convertDate(props.data.dt_txt)}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className="ion-text-center">
            <h2></h2>
            <img
              src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
              alt={props.data.weather[0].icon}
              style={{ width: "180px" }}
            />
            <p> ({props.data.weather[0].description})</p>
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
        mode="ios"
        message={"Success Add to Favorite"}
        buttons={['Ok']}
      />

      {/* Alert if object exist in localstorage */}
      <IonAlert
        isOpen={showAlert2}
        onDidDismiss={() => setShowAlert2(false)}
        cssClass="secondary"
        header={"Favorit Exist!"}
        message={"Object ini <strong>sudah ada </strong>pada tab Favoritmu!"}
        mode="ios"
        buttons={[
          {
            text: 'Ok',
          }
        ]}
      />
    </div>
  );
};

const Tab3: React.FC = (props: any) => {
  const weatherId = props.match.params.id;
  const [weatherMatch, setWeatherMatch] = useState<any>([]);
  const [cities, setCities] = useState<any>();
  useEffect(() => {
    let getCities: any = localStorage.getItem("cities")
    setCities(getCities)
    fetchData("forecast",getCities).then((res) => {
      let arrWeather = {
        list: res.list,
        city: res.city,
      };
      setWeatherMatch(arrWeather.list);
      document.title = "Detail";
    });
  }, []); //cities

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
