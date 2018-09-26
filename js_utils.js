function previewPicture(input, img) {
    /**
     *Display picture on input change
     */
    let reader = new FileReader();
    reader.onload = function (e) {
        img.attr('src', e.target.result);
    };
    reader.readAsDataURL(this.files[0]);
}

function recurseDropdown(elems) {
    /**
     * Generate a bootstrap dropdown with ident
     * @Array elems: list of obj with format { text:text, id:id, children:[] }
     */
    let div = $('<div>');
    for (let x in elems) {
        let link = $('<a>').text(elems[x].text).data('id', elems[x].id).addClass('dropdown-item pl-1');
        div.append(link);
        if (elems[x].children.length) {
            var child_div = $('<div>').addClass('ml-4');
            child_div.append(
                recurseDropdown(elems[x].children)
            );
        }
        div.append(child_div);
    }
    return div
}

/******************************************** AJAX UTILS POUR DJANGO *********************************/

function get_cookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 * Test si la méthode utilisée est safe face au CSRF
 * @param method
 * @returns {boolean}
 */
function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

let csrftoken = get_cookie('csrftoken');

function beforeSendAjax(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
}