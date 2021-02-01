/**
 * Creates all the elements on Page 2. First creates the checkboxes, then 
 * creates the next button. Only when both of those elements are created is the 
 * page validated.
 */

// Global variable used in create_checkboxes.js to select images 10-19.
window.imageNum = 1;

// Global variable used in create_checkboxes.js to select the correct page
window.pageNum = "Two";

$.getScript('/static/create_pages/page_elements/checkboxes/create_checkboxes.js', function() {

    $.getScript('/static/create_pages/page_elements/buttons/create_previous_next_buttons.js', function() {

        var validatePageTwo = document.createElement('script');
        validatePageTwo.src = "/static/validate_form_submissions/validate_form_submission.js";
        document.head.appendChild(validatePageTwo);
    
    });

});