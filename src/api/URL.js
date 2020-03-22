const Url = "http://45.32.105.81:4000/"
 class URL {

    static UrlSignUp = Url+ "user";
    static UrlSignIn = Url+"signin";
    static UrlGetProducts = Url+"user/products/";
    static UrlGetCity = Url+"city";
    static UrlViewProduct = Url +"user/view";
    static UrlGetBanner = Url +"user/banner";
    static UrlCheckHasRating = Url +"user/products/isRate"
    static UrlCreateReview = Url +"user/products/createRate"
    static UrlGetAllReviews = Url+"user/products/ratedetail/"
    static UrlAddToCart = Url +"user/product/addToCart"
    static UrlGetItemCard = Url +"user/cart/"
    static UrlOrder = Url +"user/order"
}
export default URL;