import React from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { DotsLoader } from 'react-native-indicator';
import { Icon, Button, Image } from 'react-native-elements';

import { AuthContext } from '../helper/context/auth-context';
import {
  api_get_all_notif,
  api_url,
  api_get_category_by_id_url,
} from '../helper/api_url';
import { fetch_url_get } from '../helper/function/common-function/fetch';
import { primaryColor } from '../helper/color';
import FlatLister from '../components/Flatlister';
import { notification } from '../notification/Notification';
import FooteraSocial from './FooteraSocial';
import Flatlistercategorydetailssubsub from '../components/Flatlistercategorydetailssubsub';

import HTMLView from 'react-native-htmlview';

class Categdetailssubsub extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      guest: null,
      dataCategory: null,
      isLoading: false,
      idCategory: null,
    };
  }z

  get_notif = async () => {
    try {
      const response = await fetch_url_get(api_get_all_notif);
      const json = await response;
      this.setState({
        data: json,
      });
    } catch (error) {
      // //console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getGuest = async () => {
    this.get_notif();
    var guest = null;
    guest = await this.context.getGuest();
    if (guest) {
      this.setState({
        guest: guest,
      });
      this.context.guest = guest;
    }
  };

  getCategory = async () => {

    //console.log("********");
    //console.log(global.idCategory_main);
    //console.log("********");


    var category = null;
    category = await fetch_url_get(api_get_category_by_id_url + global.idCategory_main);
    // //console.log("********");
    // //console.log(category);
    // //console.log("********");
    this.setState({
      dataCategory: category,
    });
  };

  showProductList = data => {

    this.props.navigation.navigate('Query', {
      screen: 'Query',
      params: {
        data: {
          IdCategorie: data.IdCategorie,
          SousSousSousTitre: data.titre,
          Text: data.text,
        },
      },
    });

  };

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            /* flex: 1, */
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 150,
          }}>
          <DotsLoader color={primaryColor} betweenSpace={20} size={20} />
        </View>
      );
    }
  };

  showHtmlView = (varcontent) => {
    if (varcontent) {
      return (
        <HTMLView
          value={varcontent}
          style={{ padding: 20, justifyContent: 'center' }}
        />
      )
    }
  }


  /*  recheck here randev  */

  displayCategory = () => {

    // console.log("===========****===========");
    // console.log(this.state.isLoading);
    // console.log("***")
    // console.log(this.state.dataCategory);
    // console.log("===========****==========");

    if (!this.state.isLoading && this.state.dataCategory) {
      const data = this.state.dataCategory;

      // console.log("=======00E000=");
      // //console.log(api_url + "c/" + data.id + "-category_default" + "/" + data.link_rewrite.language + ".jpg");
      // console.log(data);
      // console.log("=======00E000=");

      if (data) {
        return (
          <View>
            <View style={styles.title_view}>
              <Text style={styles.title_text}>
                {data.name.language ? data.name.language : ""}
              </Text>
            </View>

            <Image
              style={styles.img_product}
              source={{
                uri:
                  api_url +
                  "img/c/" +
                  data.id +
                  ".jpg",
              }}
            />
            {/* <View style={{ flex: 1 }}>
              <Text style={styles.title_text}>
                {data.description.language &&
                typeof data.description.language !== "object" &&
                data.description.language !== null
                  ? this.showHtmlView(data.description.language)
                  : ""}
              </Text>
            </View> */}

            <View style={styles.title_view}>
              <Text style={styles.title_text}>PRODUITS</Text>
            </View>

            <View>
              <FlatLister
                key={data.id}
                idCategories={data.id}
                navigation={this.props.navigation}
              />
            </View>

            <View style={styles.title_view}>
              <Text style={styles.title_text}>SOUS-CATEGORIES</Text>
            </View>

            <View>
              <Flatlistercategorydetailssubsub
                key={data.id}
                idCategory={data.id}
                navigation={this.props.navigation}
              />
            </View>
          </View>
        );
      } else {
        return (
          <View>
            <Text>Cette catégorie n'existe pas.</Text>
          </View>
        )
      }


    }
  };


  isIncreasing(xs) {
    var prev, cur;

    for (var i = 0; i < xs.length; i++) {
      cur = xs[i];
      if (i && cur !== prev && cur !== prev + 1) return false;
      prev = cur;
    }

    return true;
  }

  async componentDidMount() {

    this.setState({
      isLoading: true,
    });
    await this.getGuest();
    await this.getCategory();
    this.setState({
      isLoading: false,
    });

    var array = [];

    for (let prop in this.state.data) {
      array.push(this.state.data[prop]);
    }

    //8  //console.log('json=', array[0].titre);

    var a = await this.isIncreasing(array);

    await this.get_notification(
      '1',
      array[array.length - 1].titre,
      array[array.length - 1].description,
      array[array.length - 1].media,
      array[array.length - 1].lien,
    );
  }

  get_notification = (id, titre, desc, image, url) => {

    notification.configure(url);
    notification.buatchannel('1');
    notification.kirimNotificationJadwal(id, titre, desc, image);

  };

  render() {
    const data = this.state;
    return (
      <View style={{ flex: 1, maxWidth: '100%' }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {this.displayLoading()}
          {this.displayCategory()}
        </ScrollView>
        <FooteraSocial navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#20232A',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 200,
    width: 250,
  },
  title: {
    fontSize: 32,
  },
  title_view: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_text: {
    fontSize: 20,
    color: '#713F18',
    textTransform: 'uppercase',
  },
  title_text_under: {
    fontSize: 11,
    color: 'grey',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});



export default Categdetailssubsub;
