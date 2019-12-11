
/**
 * Permet de supprimer une mémoire en fonction de l'id
 * @param {*} id 
 */
function deleteMemoire(id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method: "DELETE", //method transfert
        url: "/api/memoires/" + id,
        dataType: "json",
    }).done(function (data) {
        if (data.status === 'ok') {
            undisplayMemoire(id);
        } else if (data.status === 'nok') {
            alert("La mémoire (" + id + ") n'a pas pu être supprimer.")
        }
    });
}


/* function editMemoire(id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method: "get", //method transfert
        url: "/admin/memoires/{id}/edit",
        dataType: "json",
    }).done(function (data) {
        if (data.status === 'ok') {
            console.log(data);
        } else if (data.status === 'nok') {
            console.log("Erreur !");
        }
    });
} */

function undisplayMemoire(id) {
    $('#memoire_' + id).fadeOut().remove();
}

function displayDatas(datas) {
    console.log(datas)
    $.each(datas, function (index, data) {  // Appel la fonction affichage à chaque ligne
        $("#affichagevoulu").append(
            "<tr>" +
            "<th>" + data.id + "</th>" +
            "<th>" + data.titre + "</th>" +
            "<th>" + data.resumer + "</th>" +
            "<th>" + data.description + "</th>" +
            "<th>" + data.auteur + "</th>" +
            "<th>" + data.category.nom + "</th>" +
            "<th>" + data.media.type.type + "</th>" +
            "<th>" + data.media.image + "</th>" +
            "<th>" + data.media.video + "</th>" +
            "<th>" + "</th>" +
            "<th><button type='submit' onclick='deleteMemoire(" + data.id + ")'>Supprimer</button></th>" +
            "</tr>"
        );
    })

}

/* AJOUTER MEMOIRE BDD POUR ADMINISTRATEUR */
function add() {
    event.preventDefault();
    let post_titre = $("#titre").val();
    let post_resumer = $("#resumer").val();
    let post_description = $("#description").val();
    let post_categorie = $("#id_categories").val();
    let post_mediatype = $("#id_mediatype").val();
    let post_auteur = $("#auteur").val();
    let post_image = $("#image").val();
    let post_video = $("#video").val();
    let post_status = $("#status").val();

    let table = {
        titre: post_titre,
        resumer: post_resumer,
        description: post_description,
        id_categorie: post_categorie,
        //id_media: post_mediatype,
        id_type: post_mediatype,
       
        auteur: post_auteur,
        image: post_image,
        video: post_video,
        id_status: post_status
    }
    console.log(table);
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method: "post",
        url: "/admin/memoires/add",
        data: table,
        dataType: "json",
    })
        .done(function (data) {
        })
        .fail(function (status) {
        })
}

// /* AJOUTER CATEGORIE BDD POUR ADMINISTRATEUR */
function categoriesBdd() {
    event.preventDefault();
    let post_nom = $("#nom").val();
    let post_color = $("#couleur").val();
    let post_img = $("#image_categorie").val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method: "post",
        url: "/admin/categorie/add",
        data: {
            nom: post_nom,
            couleur: post_color,
            image: post_img
        },
        dataType: "json",
    })
        .done(function (data) {
            console.log(data);
        })
        .fail(function (status) {
        })
}
// /* AJOUTER TYPE BDD POUR ADMINISTRATEUR */
function typesBdd() {
    event.preventDefault();
    let post_type = $("#type").val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method: "post",
        url: "/admin/type/add",
        data: {
            type: post_type,
        },
        dataType: "json",
    })
        .done(function (data) {
        })
        .fail(function (status) {
        })

}

/* AFFICHE TYPE DANS FORMULAIRE MEMOIRE */
function getListMedia() {

    $.ajax({
        method: "GET", //method transfert
        url: "/admin/media",
        dataType: "json",
    }).done(function (datas) {
        $.each(datas, function (index, data) {  // Appel la fonction affichage à chaque ligne
            $("#id_mediatype").append("<option value=" + data.id + ">" + data.type + "</option>");
        })

    });
}

getListMedia();

/* AFFICHE CATEGORIE DANS FORMULAIRE MEMOIRE */
function getListCategories() {

    $.ajax({
        method: "get", //method transfert

        url: "/admin/categorie",
        dataType: "json",
    }).done(function (datas) {

        $.each(datas, function (index, data) {  // Appel la fonction affichage à chaque ligne
            $("#id_categories").append("<option value="+ data.id +">"+ data.nom +"</option>");
        })

    });
}

getListCategories();



/* AFFICHE TYPE DANS FORMULAIRE MEMOIRE */
// function getListMedia() {

//     $.ajax({
//         method: "GET", //method transfert
//         url: "/mediatheque/type/{id}",
//         dataType: "json",
//     }).done(function (datas) {
//         $.each(datas, function (index, data) {  // Appel la fonction affichage à chaque ligne
//             $("#id_mediatype").append("<option value=" + data.id + ">" + data.type + "</option>");
//         })

//     });
// }

// getListMedia();

// /* AFFICHE CATEGORIE DANS FORMULAIRE MEMOIRE */
// function getListCategories() {

//     $.ajax({
//         method: "get", //method transfert

//         url: "/mediatheque/categories/{id}",
//         dataType: "json",
//     }).done(function (datas) {

//         $.each(datas, function (index, data) {  // Appel la fonction affichage à chaque ligne
//             $("#id_categories").append("<option value="+ data.id +">"+ data.nom +"</option>");
//         })

//     });
// }

// getListCategories();



