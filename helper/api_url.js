const api_path_file = 'mobile_data/root_url.php?type=';

const api_menu_file = 'mobile_data/Menu.php?type=';

const api_wishlist = 'mobile_data/Mywishlist.php?type=';

export const api_url = 'https://www.ow.randev.ovh/';
// export const api_url = 'http://192.168.1.105/passioncampagne/';
// export const api_url = 'http://www.projets-omega-web.net/';

export const api_create_guest_url = api_url + api_path_file + 'createGuest';
export const viewAPI = "https://www.ow.randev.ovh//modules/easycarousels/commande.php";
export const api_get_product_home_url = api_url + api_path_file + 'produit';

export const api_get_product_by_id_url =
  api_url + api_path_file + 'getProductById&idProduct=';

export const api_get_category_by_id_url =
  api_url + api_path_file + 'getCategoryById&idCategory=';////https://www.ow.randev.ovh/mobile_data/root_url.php?type=getCategoryById&idCategory=2

export const api_add_cart_url = api_url + api_path_file + 'addToCart';

export const api_combination_get_price_url =
  api_url + api_path_file + 'combinationGetPrices';

export const api_get_adress_url =
  api_url + api_path_file + 'getAdressByIdCustomer&idCustomer=';

export const api_login_url = api_url + api_path_file + 'login';

export const api_register_url = api_url + api_path_file + 'createCustomer';

export const api_get_category_url = api_url + api_menu_file + 'Menu'; //https://www.ow.randev.ovh/mobile_data/Menu.php?type=Menu

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
export const getLatestProducts = api_url + api_path_file + 'getLatestProducts';
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
