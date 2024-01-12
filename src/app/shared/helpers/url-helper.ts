export class UrlHelper {

  public static getPageAccessedUrl(withParameters = false) {
    const url = window.location.href;
    const splittedUrl = url.split('/');
    const pageAccessedUrl = splittedUrl[splittedUrl.length - 1];
    if (withParameters){
      return pageAccessedUrl;
    }
    const pageAccessedUrlWithoutParameters = pageAccessedUrl.split('?')[0];
    return pageAccessedUrlWithoutParameters;
  }
}
