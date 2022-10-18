const api_path_file = 'mobile_data/root_url.php?type=';

const api_menu_file = 'mobile_data/Menu.php?type=';

const api_wishlist = 'mobile_data/Mywishlist.php?type=';

//export const api_url = 'https://www.passion-campagne2.projets-omega.net/';
export const api_url = 'http://192.168.88.227/ow.randev.ovh/';
// export const api_url = 'http://www.projets-omega-web.net/';

export const api_create_guest_url = api_url + api_path_file + 'createGuest';
//export const viewAPI = "https://www.passion-campagne2.projets-omega.net/modules/easycarousels/commande.php";
export const viewAPI = "http://192.168.88.227/ow.randev.ovh/modules/easycarousels/commande.php";
export const api_get_product_home_url = api_url + api_path_file + 'produit';

export const api_get_product_by_id_url =
  api_url + api_path_file + 'getProductById&idProduct=';

export const api_get_category_by_id_url =
  api_url + api_path_file + 'getCategoryById&idCategory=';////https://www.ow.randev.ovh/mobile_data/root_url.php?type=getCategoryById&idCategory=2

export const api_add_cart_url = api_url + api_path_file + 'addToCart';

export const api_get_spec_prices_product = api_url + api_path_file + 'getSpecificPricesProduct&use_tax_sp=1'; // &idCombination_sp=987987&idProduct_sp=876&quantity_sp=3  http://localhost:8888/passioncampagne/mobile_data/root_url.php?type=getSpecificPricesProduct&idCombination_sp=32988&idProduct_sp=5185&quantity_sp=3&use_tax_sp=1

export const api_combination_get_price_url =
  api_url + api_path_file + 'combinationGetPrices';

export const api_get_adress_url =
  api_url + api_path_file + 'getAdressByIdCustomer&idCustomer=';

export const api_login_url = api_url + api_path_file + 'login';

export const api_register_url = api_url + api_path_file + 'createCustomer';

export const api_get_category_url = api_url + api_menu_file + 'Menu'; //https://www.ow.randev.ovh/mobile_data/Menu.php?type=Menu

export const api_get_category_url_constant = '[{"MenuName":[{"Menu_Name":" V\u00caTEMENT "}],"SousMenu":[{"SousTitre":[{"SousMenu":"V\u00caTEMENT DE CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Chapeau de chasse","IdCategorie":81},{"SousSousSousTitre":"Chaussettes de chasse","IdCategorie":110},{"SousSousSousTitre":"Chemise de chasse","IdCategorie":114},{"SousSousSousTitre":"Cuissard de chasse","IdCategorie":54},{"SousSousSousTitre":"Gants de chasse","IdCategorie":82},{"SousSousSousTitre":"Gilet de chasse","IdCategorie":46},{"SousSousSousTitre":"Gu\u00eatres","IdCategorie":53},{"SousSousSousTitre":"Knickers de chasse","IdCategorie":52},{"SousSousSousTitre":"Polaire de chasse","IdCategorie":135},{"SousSousSousTitre":"Pull de chasse","IdCategorie":76},{"SousSousSousTitre":"Softshell de chasse","IdCategorie":214},{"SousSousSousTitre":"Sous-v\u00eatement de chasse","IdCategorie":84},{"SousSousSousTitre":"Tablier de chasse","IdCategorie":51},{"SousSousSousTitre":"V\u00eatement chasse \u00e0 l\'approche","IdCategorie":128},{"SousSousSousTitre":"V\u00eatement fluo","IdCategorie":48},{"SousSousSousTitre":"V\u00eatement safari","IdCategorie":73},{"SousSousSousTitre":"V\u00eatements en tweed","IdCategorie":223}]},{"SousTitre":[{"SousMenu":"VESTE DE CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Veste chasse d\'approche","IdCategorie":124},{"SousSousSousTitre":"Veste chasse de traque","IdCategorie":148},{"SousSousSousTitre":"Veste chasse grand froid","IdCategorie":149},{"SousSousSousTitre":"Veste chasse pour poste","IdCategorie":144},{"SousSousSousTitre":"Veste de chasse Fluo","IdCategorie":146},{"SousSousSousTitre":"Veste de chasse toute saison","IdCategorie":147}]},{"SousTitre":[{"SousMenu":"PANTALON DE CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Fuseau de chasse","IdCategorie":191},{"SousSousSousTitre":"Pantalon chasse chaud","IdCategorie":194},{"SousSousSousTitre":"Pantalon chasse cuir","IdCategorie":192},{"SousSousSousTitre":"Pantalon de chasse toute saison","IdCategorie":190},{"SousSousSousTitre":"Pantalon de traque","IdCategorie":193}]},{"SousTitre":[{"SousMenu":"VETEMENT CAMPAGNE HOMME"}],"SousSousTitre":[{"SousSousSousTitre":"Chapeau","IdCategorie":206},{"SousSousSousTitre":"Chemise outdoor","IdCategorie":199},{"SousSousSousTitre":"Gilet Outdoor","IdCategorie":203},{"SousSousSousTitre":"Pantalon outdoor","IdCategorie":202},{"SousSousSousTitre":"Polaire","IdCategorie":224},{"SousSousSousTitre":"Pull outdoor","IdCategorie":217},{"SousSousSousTitre":"Veste Outdoor","IdCategorie":201}]},{"SousTitre":[{"SousMenu":"VETEMENT CHASSE FEMME"}],"SousSousTitre":[{"SousSousSousTitre":"Chapeau femme","IdCategorie":80},{"SousSousSousTitre":"Chemise chasse femme","IdCategorie":187},{"SousSousSousTitre":"Gants de chasse femme","IdCategorie":185},{"SousSousSousTitre":"Gilet de chasse femme","IdCategorie":196},{"SousSousSousTitre":"Pantalon chasse femme","IdCategorie":50},{"SousSousSousTitre":"Pull chasse femme","IdCategorie":74},{"SousSousSousTitre":"Veste chasse femme","IdCategorie":37},{"SousSousSousTitre":"V\u00eatement apr\u00e8s-chasse femme","IdCategorie":145}]}]},{"MenuName":[{"Menu_Name":" CHAUSSURE & BOTTES "}],"SousMenu":[{"SousTitre":[{"SousMenu":"BOTTES DE CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Bottes chasse ext\u00e9rieur cuir","IdCategorie":154},{"SousSousSousTitre":"Bottes chasse femme","IdCategorie":159},{"SousSousSousTitre":"Bottes chasse int\u00e9rieur cuir","IdCategorie":156},{"SousSousSousTitre":"Bottes chasse int\u00e9rieur divers","IdCategorie":158},{"SousSousSousTitre":"Bottes chasse int\u00e9rieur jersey","IdCategorie":157},{"SousSousSousTitre":"Bottes chasse int\u00e9rieur n\u00e9opr\u00e8ne","IdCategorie":155},{"SousSousSousTitre":"Bottes chasse tr\u00e8s chaudes","IdCategorie":184}]},{"SousTitre":[{"SousMenu":"CHAUSSURES DE CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Chaussures chasse chaudes","IdCategorie":102},{"SousSousSousTitre":"Chaussures chasse d\'approche","IdCategorie":113},{"SousSousSousTitre":"Chaussures chasse la\u00e7age facile","IdCategorie":112},{"SousSousSousTitre":"Chaussures chasse toutes saisons","IdCategorie":111}]},{"SousTitre":[{"SousMenu":"BOTTES \/ CHAUSSURES CAMPAGNE"}],"SousSousTitre":[{"SousSousSousTitre":"Bottes enfant","IdCategorie":71},{"SousSousSousTitre":"Bottes femme","IdCategorie":68},{"SousSousSousTitre":"Chaussures Outdoor","IdCategorie":200}]}]},{"MenuName":[{"Menu_Name":" \u00c9QUIPEMENT & ACCESSOIRES "}],"SousMenu":[{"SousTitre":[{"SousMenu":"ACCESSOIRES DE CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Amortisseur de recul","IdCategorie":64},{"SousSousSousTitre":"Armoire forte pour armes","IdCategorie":89},{"SousSousSousTitre":"Canne de pirsh","IdCategorie":65},{"SousSousSousTitre":"Casque anti-bruit chasse","IdCategorie":105},{"SousSousSousTitre":"Corne de chasse","IdCategorie":69},{"SousSousSousTitre":"Si\u00e8ge de battue","IdCategorie":63}]},{"SousTitre":[{"SousMenu":"GESTION DU TERRITOIRE DE CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Agrainoirs","IdCategorie":67},{"SousSousSousTitre":"Appareil photo d\u00e9tecteur de mouvement","IdCategorie":66}]},{"SousTitre":[{"SousMenu":"SACS DE CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Cartouchi\u00e8re","IdCategorie":43},{"SousSousSousTitre":"Etui","IdCategorie":42},{"SousSousSousTitre":"Mallette chasse","IdCategorie":41},{"SousSousSousTitre":"Sac \u00e0 dos chasse","IdCategorie":87},{"SousSousSousTitre":"Sac de battue","IdCategorie":44}]},{"SousTitre":[{"SousMenu":"ACCESSOIRES CHIEN CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Collier anti-aboiement","IdCategorie":118},{"SousSousSousTitre":"Collier de dressage","IdCategorie":59},{"SousSousSousTitre":"Collier de rep\u00e9rage chien de chasse","IdCategorie":60},{"SousSousSousTitre":"Gilet de protection pour chiens","IdCategorie":79}]},{"SousTitre":[{"SousMenu":"JEUX ENFANT"}],"SousSousTitre":[{"SousSousSousTitre":"Jeux enfant","IdCategorie":27}]},{"SousTitre":[{"SousMenu":"LIVRES CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Livres chasse","IdCategorie":9}]},{"SousTitre":[{"SousMenu":"OPTIQUE CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Optique chasse","IdCategorie":26}]},{"SousTitre":[{"SousMenu":"VID\u00c9O CHASSE"}],"SousSousTitre":[{"SousSousSousTitre":"Vid\u00e9o chasse","IdCategorie":34}]}]}]';

export const api_products_by_id_categorie = api_url + api_path_file + 'products&IdCategories=';//https://www.ow.randev.ovh/mobile_data/root_url.php?type=products&IdCategories=2

export const api_productslimited_by_id_categorie = api_url + api_path_file + 'productslimited&IdCategories='; //https://www.ow.randev.ovh/mobile_data/root_url.php?type=productslimited&IdCategories=125

export const api_get_all_notif = api_url + api_path_file + 'notification';


export const api_get_countries_url = api_url + api_path_file + 'getCountries';

export const api_get_adress_by_id_customer_url =
  api_url + api_path_file + 'getAdressByIdCustomer&idCustomer=';

export const api_get_state_country_url =
  api_url + api_path_file + 'getStates&country=';

export const api_create_adress_url = api_url + api_path_file + 'createAdresse';

export const api_get_HomeOrganizer = api_url + api_path_file + 'HomeOrganizer';

export const api_get_all_adress_by_id_customer_url =
  api_url + api_path_file + 'getAllAdressByIdCustomer&idCustomer=';

export const api_delete_adress_by_id_adress_url =
  api_url + api_path_file + 'deleteAdressByIdadress&idAdress=';

export const api_edit_adress_by_id_adress_url =
  api_url + api_path_file + 'editAdress&idAdress=';

export const api_edit_customer_url =
  api_url + api_path_file + 'editCustomer&idCustomer=';

export const api_get_search_result = api_url + api_path_file + 'search&query=';

export const api_edit_cart_url = api_url + api_path_file + 'editCart&idCart=';

export const api_similar_product_url =
  api_url + api_path_file + 'getSimilarProduct&id_category=';

export const api_get_all_delivery_url =
  api_url + api_path_file + 'getDeliveriesList';

export const api_get_link_rewrite =
  api_url + api_path_file + 'GetCategoriesLinkRewrite&IdCategories=';

export const api_get_promotion_state = api_url + api_path_file + 'getPromotionState';
//  Send email footer
export const api_send_email = api_url + api_path_file + 'sendEmail';

  // get promo products
export const getAllProductPromo = api_url + api_path_file + 'getAllProductPromo';
// get latest product
export const getLatestProducts = api_url + api_path_file + 'getLatestProducts';//https://www.ow.randev.ovh/mobile_data/root_url.php?type=getLatestProducts
// get product manufacturers
export const getProductsManufacturer = api_url + api_path_file + 'getProductsManufacturer';

//-------------------------------- WISHLIST---------------------------------//

export const api_get_wishlist = api_url + api_wishlist + 'wishlist&IdCustomer=';

export const api_post_wishlist_ = api_url + api_wishlist;

export const api_get_wishlist_categories = api_url + api_wishlist + 'wishlist_categories&IdCustomer=';

//--------------------------------------------------------------------------//

export const api_validate_cart_url = data => {
  return (
    api_url +
    api_path_file +
    'validateCart&idCustomer=' +
    data.customer.id +
    '&idGuest=' +
    data.guest
  );
};

export const api_get_nb_cart_url = data => {
  return (
    api_url +
    api_path_file +
    'getCartByGuest&idCustomer=' +
    data.idCustomer +
    '&idGuest=' +
    data.guest +
    '&idDefaultGroup=' +
    data.defaultGroup
  );
};

export const api_delete_cart_url = data => {
  return (
    api_url +
    api_path_file +
    'deleteCart&idProduct=' +
    data.idProduct +
    '&idAttribute=' +
    data.idAttribute +
    '&idGuest=' +
    data.guest
  );
};

export const api_get_stock_by_id_attribute_product_url = data => {
  return (
    api_url +
    api_path_file +
    'getStockByIdProductAndIdProductAttribute&idProduct=' +
    data.idProduct +
    '&idProductAttribute=' +
    data.idAttribute +
    '&idGuest=' +
    data.guest
  );
};
