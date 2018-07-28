export default class SelectWrapper {
  constructor(el) {
    this.$el = $(el);
    this.$parent = this.$el.parent('.form-select-wrapper');

    // only run if wrapper is in place AND it's not the currency selector
    if (this.$parent.length) {
      this._init();
    } else {
      this._bindEvents();
    }
  }

  _init() {
    if(!this.$el.prev('.form-selected-text').length){
      let $selected = this.$el.find('option:selected').text();

      if(!$selected){
        $selected = this.$el.find('option:first').text();
      }
      this.$el.before(`<span class="form-selected-text">${$selected}</span>`);
    }

    this._bindEvents();
  }

  _bindEvents() {
    this.$el.on('change', () => {
      this.updateSelectText();
    });
  }

  updateSelectText(option) {
    const newOption = option ? option : this.$el.find('option:selected').text();
    this.$el.siblings('.form-selected-text').text(newOption);
  }

}
