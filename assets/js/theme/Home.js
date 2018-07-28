import PageManager from '../PageManager';
import MasonryGrid from './components/masonry-grid';
import HomeCarousel from './components/home-carousel';

export default class Home extends PageManager {
  constructor() {
    super();

    this.layoutSetup = new MasonryGrid();

    /**
     *  TODO: Instagram Module from PxU, to be reintegrated when BC offers support
     *  TODO: Add this into config.json
     *  "instagram-access-token": "",
     *  "instagram-tag-filter": false,
     *  "instagram-tag": "",
     *  this.$instagram = $('.widget-instagram');
     */

    /**
     * @type {{$carouselImages: (jQuery|HTMLElement), $carouselText: (jQuery|HTMLElement)}}
     */
    this.carouselOptions = {
      carousel: '.carousel-wrapper',
      cellSelector: '.carousel-item',
    };

  }

  loaded(next) {
    this.layoutSetup.init();

    /**
     * TODO: Instagram Module from PxU, to be reintegrated when BC offers support
     *
     * if (context.instagramEnabled) {
     * this._bindInstagram(this.context);
     * }
     **/

    if ($(this.carouselOptions.carousel).length) {
      this.carousel = new HomeCarousel(this.carouselOptions, this.context);
    }

    next();
  }

  /**
   * TODO: Instagram Module from PxU, to be reintegrated when BC offers support
   * _bindInstagram(context) {
   *   try {
   *     this.instagram = new Instagram({
   *       accessToken: context.instagramAccessToken,
   *       imageCount: parseInt(this.$instagram.data('image-count'), 10),
   *       filterByTag: context.instagramFilterByTag,
   *       tag: context.instagramTag,
   *     }).done((element) => {
   *         this.$instagram.append(element);
   *       }).fail((jqXHR, status, data) => {
   *         //TODO: l18n from Theme settings
   *         this.$instagram.append(context.instagramError);
   *       });
   *   } catch (err) {}
   * } */
}
