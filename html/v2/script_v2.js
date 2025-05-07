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
const buttons = ['PRÉC', 'SUIV']

/**
 * Définiion des classes utilisées
 */
const classes = {
    buttonContainer:'button-container'
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
        const countryLine = `<tr>
            <td>${country.frenchName || 'N/A'}</td>
            <td>${country.population || 'N/A'}</td>
            <td>${country.area || 'N/A'}</td>
            <td>${country.getPopDensity() || 'N/A'}</td>
            <td>${country.region || 'N/A'}</td>
            <td><img src=${country.linkToImage} alt=Drapeau_${country.frenchName} width="130" height="75" title=Drapeau_${country.frenchName}></img></td>
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
 * Ajout des boutons dans le container
 */
$(`.${classes.buttonContainer}`).append(`<button onClick=determinePageNumber('${buttons[0]}')>${buttons[0]}</button>`)
$(`.${classes.buttonContainer}`).append(`<button onClick=determinePageNumber('${buttons[1]}')>${buttons[1]}</button>`)


