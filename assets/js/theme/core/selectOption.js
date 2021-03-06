/**
 * Visually hides the option from user by moving option to an invisible
 * and disabled select placeholder element.
 *
 * This approach is required rather than simply hiding the option because
 * hidden option can still be included when serializeArray() is called and
 * cause wrong value to be submitted.
 * (eg. if you have option 1, 2, 3 and 2 is hidden, when you select 3,
 * serializeArray() will use the value of 2 instead of 3)
 */
function toggleOption(show) {
  const currentSelectElement = $(this).closest('select'); // the select containing this
  let disabledSelectElement; // the disabled select element
  let selectElement; // the real select element

  if (currentSelectElement.is(':disabled')) {
    disabledSelectElement = currentSelectElement;
    selectElement = disabledSelectElement.data('linkedSelectElement');
  } else {
    selectElement = currentSelectElement;
    disabledSelectElement = currentSelectElement.data('linkedSelectElement');
    if (!disabledSelectElement) {
      // create the disabled placeholder select element
      disabledSelectElement = $('<select>')
        .prop('disabled', true)
        .hide()
        .attr('name', currentSelectElement.attr('name'))
        .addClass(currentSelectElement.attr('class'))
        .data('linkedSelectElement', selectElement)
        .insertAfter(selectElement);

      selectElement.data('linkedSelectElement', disabledSelectElement);
    }
  }

  // save the selected option
  const selectedOption = selectElement.find('option:selected');

  // update .form-selected-text element
  const text = selectElement.find(`[value="${selectedOption.val()}"]`).text();

  let $prefix = selectElement.parents('.form-select-wrapper').data('selected-prefix');
  $prefix = ($prefix ? `<span class="form-selected-text-prefix">${$prefix}</span>` : '');

  selectElement.siblings('.form-selected-text').html($prefix + text);

  // move the option to the correct select element if required
  if (currentSelectElement.is(':disabled') && show) {
    const previousIndex = this.data('index');

    if (previousIndex > 0) {
      // loop through to put the select element in it's proper place
      for (let i = previousIndex; i > 0; i--) {
        if (selectElement.find(`option:eq(${i - 1})`).length) {
          this.insertAfter(selectElement.find(`option:eq(${i - 1})`));
          break;
        }
      }
    } else {
      $(this).appendTo(selectElement);
    }
  } else if (!currentSelectElement.is(':disabled') && !show) {
    this.data('index', currentSelectElement.find('option').index(this));
    $(this).prependTo(disabledSelectElement);
  }

  // make sure the option is still selected
  selectedOption.prop('selected', true);
}

$.fn.toggleOption = toggleOption;
