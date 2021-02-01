/**
 * Creates all the elements on Page 1. First creates the checkboxes, then 
 * creates the next button. Only when both of those elements are created is the 
 * page validated.
 */

// Global variable used in create_checkboxes.js to select images 00-09.
window.imageNum = 0;

// Global variable used in create_checkboxes.js to select the correct page
window.pageNum = "One";

$.getScript('/static/create_pages/page_elements/checkboxes/create_checkboxes.js', function() {

    $.getScript('/static/create_pages/page_elements/buttons/create_previous_next_buttons.js', function() {
        
        var validatePageOne = document.createElement('script');
        validatePageOne.src = "/static/validate_form_submissions/validate_form_submission.js";
        document.head.appendChild(validatePageOne);
    
    });

});