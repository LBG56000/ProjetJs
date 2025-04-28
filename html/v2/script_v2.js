/**
 * Récupération de l'ensemble des pays
 */
const all_countries = Country.all_countries

/**
 * Définition de la page actuelle
 */
let pageNumber = 0

/**
 * Définition de la du tableau diviser 
 */

let allCountriesSliced =Object.values(all_countries).slice(0,25)

/**
 * L'ensembles des colonnes à ce jour
 */
const colums = ['Nom Français', 'Population','Surface','Densité de population','Continent d\'appartenance','Drapeau']

/**
 * Définition des boutons à utiliser
 */
const buttons = ['PRÉC.','SUIV.']

/**
 * Ajout d'un tableau sur la page html
 */
$("body").append("<table></table>")

/**
 * Ajout d'un haut de tableau
 */
$("table").append("<thead></thead>")

/**
 * Ajout d'une ligne au table
 */
$("thead").append("<tr></tr>")

/**
 * Ajout des noms de colonne
 */

$.map(colums, (colum) => {
    $("thead > tr").append(`<th>${colum}</th>`)
})

/**
 * Ajout d'un corps de tableau
 */
$("table").append("<tbody></tbody>")

/**
 * Ajout des pays dans le corps du tableau
 */
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

$("body").append("<div class=button_container></div>")
$.map(buttons, (button) => {
    $(".button_container").append(`<button onClick=alert('couc')>${button}</button>`);
})
