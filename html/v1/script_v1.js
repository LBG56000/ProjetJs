/**
 * Récupération de l'ensemble des pays
 */
const all_countries = Country.all_countries

/**
 * L'ensembles des colonnes à ce jour
 */
const colums = ['Nom Français', 'Population','Surface','Densité de population','Continent d\'appartenance','Drapeau']

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

    // Ajout d'un tableau sur la page html
    $("body").append("<table></table>")
    

    // Ajout d'un haut de tableau
    $("table").append("<thead></thead>")
    
    // Ajout d'un corps de tableau
    $("table").append("<tbody></tbody>")
    
    // Ajout des pays dans le corps du tableau
    $.map(Object.values(all_countries), (country) => {
    
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

// Appel de la fonction permettant d'ajouter la table
printCountriesTable()
