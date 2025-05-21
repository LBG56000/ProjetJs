/**
 * Récupération de l'ensemble des pays
 */
const all_countries = Country.all_countries

/**
 * Création de la constante sur le nombre d'élément par page
 */
const elements_per_page = 25

/**
 * Création de la variable contenant la page actuelle
 */
let pageNumber = 0

/**
 * L'ensembles des colonnes à ce jour
*/
const colums = ['Nom Français', 'Population', 'Surface', 'Densité de population', 'Continent d\'appartenance', 'Drapeau']

/**
 * Définition des boutons à utiliser
*/
const buttons = ['PRÉC', 'SUIV','Fermer']

/**
 * Définiion des classes utilisées
 */
const classes = {
    buttonContainer:'button-container',
    showDetails:'show-details',
    showPicture:'show-picture',
    popupContent:'popup-content',
    popup:'popup',
    popupButtonContainer:'popup-button-container'
}

// Ajout d'un tableau sur la page html
$("body").append("<table></table>")

// Ajout d'un haut de tableau
$("table").append("<thead></thead>")

// Ajout d'une ligne au table
$("thead").append("<tr></tr>")

// Ajout des noms de colonne
$.map(colums, (colum) => {
    $("thead > tr").append(`<th>${colum}</th>`)
})

/**
 * Fonction permattant d'ajouter le tableau avec les différents pays
 */
function printCountriesTable() {

    // Suppression du corps du tableau avant l'ajout
    $("tbody").remove()
    
    // Ajout d'un corps de tableau
    $("table").append("<tbody></tbody>")

    const allCountriesSliced = Object.values(all_countries).slice(pageNumber * elements_per_page, (pageNumber + 1) * elements_per_page)
    
    // Ajout des pays dans le corps du tableau
    $.map(Object.values(allCountriesSliced), (country) => {
    
        // Création de la ligne avec les différentes information demandées
        const countryLine = `<tr id="${country.codeAlpha3}">
        <td class="${classes.showDetails}" >${country.frenchName || 'N/A'}</td>
        <td class="${classes.showDetails}">${country.population || 'N/A'}</td>
        <td class="${classes.showDetails}">${country.area || 'N/A'}</td>
        <td class="${classes.showDetails}">${country.getPopDensity || 'N/A'}</td>
        <td class="${classes.showDetails}">${country.region || 'N/A'}</td>
        <td class="${classes.showPicture}"><img src=${country.linkToImage} alt=Drapeau_${country.frenchName} width="130" height="75" title=Drapeau_${country.frenchName}></img></td>
        </tr>`
        
        // Ajout de la ligne au corps du tableau
        $("tbody").append(countryLine)
    })
}

/**
 * Fonction permattant à l'utilisateur de faire défiler les pages
 */
function determinePageNumber (actionButton){
    switch (actionButton) {
        case buttons[0]:
            if (pageNumber > 0) pageNumber -= 1
            break

        case buttons[1]:
            if ((pageNumber + 1) * elements_per_page < Object.values(all_countries).length) {
                pageNumber += 1
            }
            break
        default:
            break
    }
    printCountriesTable()
}

/**
 * Condition permettant de n'appeller qu'une seule fois la fonction d'affichage
 */
if (pageNumber === 0) printCountriesTable()

/**
 * Ajout du container des boutons
 */
$("body").append(`<div class=${classes.buttonContainer}></div>`)

/**
 * Ajout des boutons dans le container permettant de faire défiler les pages
 */
$(`.${classes.buttonContainer}`).append(`<button onClick=determinePageNumber('${buttons[0]}')>${buttons[0]}</button>`)
$(`.${classes.buttonContainer}`).append(`<button onClick=determinePageNumber('${buttons[1]}')>${buttons[1]}</button>`)

/**
 * Fonction permettant d'ajouter le contenu de la popup
 * @param {le pays} country 
 * @param {le contenu à ajouter} contentType 
 */
function addPopupContent(country,contentType) {
    //  Création de la popup
    $("body").append(`<div class=${classes.popup}><div class=${classes.popupContent}></div></div>`)

    // Regard du type de contenu à ajouté
    switch (contentType) {
        case 'img':
            // Récupération de la hauteur et largeur de l'image permettant ainsi de la grossir
            let widthImage = $("table td img").attr("width")
            let heightImage = $("table td img").attr("height")

            // Ajout de l'image dans la pop-up
            $(`.${classes.popupContent}`).append(`<img src=${country.linkToImage} alt=Drapeau_${country.frenchName} width=${widthImage * 7} height=${heightImage * 7} title=Drapeau_${country.frenchName}></img></td>`)
            break
        case 'table':

            // Ajout d'un tableau avec le détail du pays
            $(`.${classes.popupContent}`).append(`<h1>Nom: ${country.frenchName || 'N/A'}</h1>`)
            $(`.${classes.popupContent}`).append("<table><tbody></tbody></table>")
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Nom anglais</th><td>${country.englishName || 'N/A'}</td></tr>`)
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Code</th><td>${country.codeAlpha3 || 'N/A'}</td></tr>`)
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Capitale</th><td>${country.capitale || 'N/A'}</td></tr>`)
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Continent</th><td>${country.region || 'N/A'}</td></tr>`)
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Population</th><td>${country.population || 'N/A'}</td></tr>`)
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Voisins</th><td>${country.traductionOfBorders || 'N/A'}</td></tr>`)
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Surface</th><td>${country.area || 'N/A'}</td></tr>`)
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Langues</th><td> ${country.getLanguages || 'N/A'}</td></tr>`)
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Monnaies</th><td>${country.getCurrencies || 'N/A'}</td></tr>`)
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Nom(s) de domaine(s)</th><td>${country.domainExtension || 'N/A'}</td></tr>`)        
            $(`.${classes.popupContent} tbody`).append(`<tr><th>Densité de population</th><td>${country.getPopDensity.toFixed(3) || 'N/A'}</td></tr>`)         
        break
        default:
            break
    }
    $(`.${classes.popupContent}`).append(`<div class=${classes.popupButtonContainer}><button onclick=closePopup()>${buttons[2]}</button></div>`)
}

function closePopup() {
    $(`.${classes.popup}`).remove()
}

/**
 * Ajout des clics sur les cellules contenant une certaine classe
 */
$("table").on("click", `.show-picture`, function() {
    // Récupération de l'id du parent contenant le code du pays
    const parentId = $(this).parent().attr('id')
    addPopupContent(all_countries[parentId],'img')
})

$("table").on("click", `.show-details`, function() {
    const parentId = $(this).parent().attr('id')
    addPopupContent(all_countries[parentId],'table')
})
