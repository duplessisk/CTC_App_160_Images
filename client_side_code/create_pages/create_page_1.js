/**
 * This script first creates the checkboxes, then creates the next button. Only when
 * both of those elements are created is the page validated 
 */

$.getScript('/static/create_pages/page_elements/checkboxes/create_checkboxes.js', function() {

    $.getScript('/static/create_pages/page_elements/buttons/create_next_button.js', function() {
        
        var validatePageOne = document.createElement('script');
        validatePageOne.src = "/static/validate_form_submissions/validate_form_submission_page_1.js";
        document.head.appendChild(validatePageOne);
    
    });

});