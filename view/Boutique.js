import React from 'react';

import { WebView } from 'react-native-webview';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';


class Boutique extends React.Component {

    constructor(props) {
        super(props)

    }


    render(){
    const boutique = require('../Boutique.jpg')
    const marque = require('../marque.jpg')
        
        return (
          <ScrollView>
            <View >
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    height: 50,
                    lineHeight: 50,
                  }}>
                  Boutique chasse à Paris Passion-Campagne
                </Text>
              </View>
              <View style={styles.container}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Passion-Campagne : boutique à Paris au 18 bis rue Brunel
                  (17ème arrondissement) Tél : 09 82 38 98 98 (prix d'un appel
                  local)
                </Text>
                <Text
                  style={{textAlign: 'center', fontSize: 15, color: '#008000'}}>
                  Fermeture de la boutique à partir du vendredi 19 mars 2021
                  pour plusieurs semaines. Nous espérons vous retrouver
                  rapidement et en pleine forme. Possibilité de retrait en
                  boutique de vos commandes internet sur rendez-vous.
                </Text>
                <Text
                  style={{textAlign: 'center', fontSize: 15, color: '#1600ff'}}>
                  Merci de respecter les gestes barrières en boutique : port du
                  masque / nettoyage au gel hydroalcoolique à l’entrée / respect
                  de la distanciation sociale.
                </Text>
                
              </View>
              <Image 
                    source={boutique}
                    style={{
                        width: '100%',
                        resizeMode:'contain',
                        height:400,
                    }}
                />
              <View style={styles.container}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color:'#7a7a7a'
                    }}>
                    . Boutique de 90 m² {'\n'}
                    . Produits de qualité pour la campagne,
                    particulièrement pour la chasse et l’après-chasse {'\n'}
                    . Vêtements Homme, Femme & Enfant {'\n'}
                    . Chaussures & Bottes {'\n'}
                    . Accessoires, Décorations, Idées cadeaux… (livres, DVD,
                    Bronzes…) {'\n'}
                    . Nombreuses marques : Härkila, Le Chameau,
                    Laksen, Chevalier, Alexandre Mareuil, Barbour, Chiruca,
                    DuBarry, Filson,Musto, Pennine…
                  </Text>
                </View>
              </View>
              <View style={{backgroundColor:'#ffff', marginVertical:10}}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginTop:20, 
                    textAlign: 'center'
                  }}>
                  QUELQUES MARQUES PRESENTEES CHEZ PASSION CAMPAGNE A PARIS (ET BIEN D'AUTRES MARQUES...)
                </Text>
                <Image 
                    source={marque}
                    style={{
                        width: '100%',
                        resizeMode:'contain',
                        height:300,
                    }}
                />
              </View>
              <View style={styles.container }>
                <Text
                  style={{
                    textAlign:'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                    height:30,
                    lineHeight:30
                  }}>
                 BOUTIQUE
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                  }}>
                  
                    Adresse : PARIS XVIIe 18bis rue Brunel Porte Maillot {'\n'}

                    Téléphone : 09 82 38 98 98 {'\n'}

                    E-mail : paris@passion-campagne.com {'\n'}

                    Horaire d’ouverture : 

                    du Mardi au Vendredi - 10h30 à 14h et de 15h à 19h

                    Samedi - 10h30 à 14h et de 15h à 18h {'\n'}

                    Métro : Argentine (ligne 1)
                </Text>
              </View>
              <WebView
                source={{html: '<iframe width="100%" height="100%" src="https://www.google.com/maps/embed/v1/place?q=PARIS%2017E%2018bis%20rue%20Brunel&key=AIzaSyARRzckPVxcmYr40_jio3_uZvvsyvNH-4U&" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style = "zoom: 100;"></iframe>'}}
                style = {{height:300}}
              />
            </View>
          </ScrollView>
        );
    }
}

export default Boutique;

const styles = StyleSheet.create({
    container: {
        marginHorizontal:15,
        marginBottom: 10
    }

});