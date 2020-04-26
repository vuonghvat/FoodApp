const Url = "http://34.92.167.188:4000/"
 class URL {
    static UrlSignUp = Url+ "user";
    static UrlSignIn = Url+"signin";
    static UrlGetProducts = Url+"user/products/";
    static UrlSearch =  Url + "user/products/search"
    static UrlGetCity = Url+"city";
    static UrlViewProduct = Url +"user/view";
    static UrlGetBanner = Url +"user/banner";
    static UrlCheckHasRating = Url +"user/products/isRate"
    static UrlCreateReview = Url +"user/products/createRate"
    static UrlGetAllReviews = Url+"user/products/ratedetail/"
    static UrlAddToCart = Url +"user/product/addToCart"
    static UrlGetItemCard = Url +"user/cart/"
    static UrlOrder = Url +"user/order"
    static UrlDeleteCard = Url + "user/product/minusToCart"
    
    static UrlGetHistory = Url +"user/history/";
    static UrlHistoryDetail  = Url +"user/historyDetail/";
    static UrlCancelOrder = Url +"user/reject/";
    static UrlGetRecommend = Url +"recommend/";
    static UrlDeleteAllCArd = Url +"user/cart/";
    
    static UrlGetQA = Url +"user/products/qnadetail/"
    static UrlComment = Url +"user/products/createqnadetail"
    static UrlAddQuestion = Url +"user/products/createqna"
 
  
    

}
export default URL;