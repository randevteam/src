import "react-native-gesture-handler";
import React from "react";
import Notif from "./src/view/Notif";
import { MenuProvider } from "react-native-popup-menu";

import Navigation from "./src/navigation/navigations";
import AuthContextProvider from "./src/helper/context/auth-context";
import CronJob from "react-native-cron-job";
import RNFS from "react-native-fs";
import { DotsLoader } from "react-native-indicator";

class App extends React.Component {
  constructor(props) {
    super(props);
    // CronJob.startCronJob(11,38)
    Notif.localNotifications();
  }
  state = {
    isloading: true,
  };
  creatFile = () => {
    var FileName = "/data.json";
    const path = RNFS.DocumentDirectoryPath + FileName;
    fetch(
      "https://www.passion-campagne.projets-omega.net/mobile_data/root_url.php?type=getLatestProducts"
    )
      .then((response) => response.json())
      .then((responseJson) =>
        RNFS.writeFile(path, JSON.stringify(responseJson), "utf8")
          .then((sucess) => {
            // console.log(responseJson);
            this.setState({ isloading: false });
          })
          .catch((err) => {
            console.log(err.message);
          })
      );
  };
  componentDidMount() {
    this.creatFile();
  }

  render() {
    if (!this.state.isloading) {
      return (
        <AuthContextProvider>
          <MenuProvider>
            <Navigation />
          </MenuProvider>
        </AuthContextProvider>
      );
    } else {
      return (
        <View
          style={{
            /* flex: 1, */
            alignItems: "center",
            justifyContent: "center",
            marginTop: 150,
          }}
        >
          <DotsLoader color="#713F18" betweenSpace={20} size={20} />
        </View>
      );
    }
  }
}
export default App;
