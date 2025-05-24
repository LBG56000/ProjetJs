/**
 * Récupération de l'ensemble des pays
 */
const all_countries = Country.all_countries

/**
 * Récupération de l'ensemble des langues
 */
const all_languages = Language.all_languages

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
const buttons = ['PRÉC', 'SUIV', 'Fermer']

/**
 * Définiion des classes utilisées
 */
const classes = {
    buttonContainer:'button-container',
    showDetails:'show-details',
    showPicture:'show-picture',
    popupContent:'popup-content',
    popup:'popup',
    popupButtonContainer:'popup-button-container',
    sortContainer:'sort-container',
    inputContainer:'input-container',
    selectRegion:'select-region',
    selectLanguage:'select-language',
    inputCountry:'input-country',
    optionRegion:'option-region',
    optionLanguage:'option-language'
}

/**
 * Contante contenant la chaine renvoyée si aucun filtre n'est sélectionné dans les select
 */
const notFiltersSelected = 'choisir-une-option'

/**
 * Variable contenant les futures pays triés ou divisié en 25
 */
let filteredCountries = Object.values(all_countries)

// Création du conteneur ayant les trois filtres demandés
$("body").append(`<div class=${classes.sortContainer}></div>`)

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

    const allCountriesSliced = filteredCountries.slice(pageNumber * elements_per_page, (pageNumber + 1) * elements_per_page)

    // Opérateur ternaire permettant de savoir si nous devons afficher les boutons de navigation
    filteredCountries.length < elements_per_page ? $(`.${classes.buttonContainer} button`).attr("class","hidden") : $(`.${classes.buttonContainer} button`).removeAttr("class")

    if (allCountriesSliced.length === 0) {
        const countryEmpty = "<tr><td id=emptyCountry colspan=6>Aucuns pays ne correpond à votre recherche</td></tr>"
        $("tbody").append(countryEmpty)
    } else {
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
    })}
}

/**
 * Fonction permattant à l'utilisateur de faire défiler les pages
 */
function determinePageNumber(actionButton) {
    switch (actionButton) {
        case buttons[0]:
            if (pageNumber > 0) pageNumber -= 1
            break

        case buttons[1]:
            if ((pageNumber + 1) * elements_per_page < filteredCountries
            .length) {
                pageNumber += 1
            }
            break
        default:
            console.log('test')
            break
        }
    printCountriesTable()
}

/**
 * Condition permettant d'appeler une seule fois la fonction d'affichage de la table au début
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
function addPopupContent(country, contentType) {
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
$("table").on("click", `.show-picture`, function () {
    // Récupération de l'id du parent contenant le code du pays
    const parentId = $(this).parent().attr('id')
    addPopupContent(all_countries[parentId], 'img')
})

$("table").on("click", `.show-details`, function () {
    const parentId = $(this).parent().attr('id')
    addPopupContent(all_countries[parentId], 'table')
})

function addDifferentSort() {
    // Ajout des continents
    const allRegions = addAllRegions()
    // Ajout des langues
    const allLanguages = addAllLanguages()

    let regionSelected = notFiltersSelected
    let languageSelected = notFiltersSelected
    let countryNameTyped = ''

    // Création des différents éléments HTML (2 select et un input)
    const selectRegion = `<div class=${classes.inputContainer}><label>Choississez un continent </label><select class=${classes.selectRegion}></select></div>`
    const selectLanguage = `<div class=${classes.inputContainer}><label>Choississez une langue </label><select class=${classes.selectLanguage}></select></div>`
    const selectCountry = `<div class=${classes.inputContainer}><label>Entrez un nom de pays (anglais/français) </label><input type=search class=${classes.inputCountry}></input></div>`

    // Ajout dans le DOM des éléments permettant le tri
    $(`.${classes.sortContainer}`).append(selectRegion)
    $(`.${classes.sortContainer}`).append(selectLanguage)
    $(`.${classes.sortContainer}`).append(selectCountry)

    // Ajout des différentes options de continent
    $.map(allRegions, (region) => {
        // Traitement sur la value permettant une identification plus facile par la suite
        $(`.${classes.selectRegion}`).append(`<option value=${region.toLowerCase().replaceAll(' ','-')} class=${classes.optionRegion}>${region}</option>`);
    })

    // Ajout des différentes options de langues
    $.map(allLanguages, (language) => {
        $(`.${classes.selectLanguage}`).append(`<option value=${language.toLowerCase().replaceAll(' ','-')} class=${classes.optionLanguage}>${language}</option>`);
    })

    // Création des écouteurs sur les différents champs et appel de la fonction
    $(".select-region").on("change", function () {
        regionSelected = $(this).val().toLowerCase()
        sortedByDifferentsFilters(regionSelected,languageSelected,countryNameTyped)
    })
    
    $(".select-language").on("change", function () {
        languageSelected = $(this).val().toLowerCase()
        sortedByDifferentsFilters(regionSelected,languageSelected,countryNameTyped)
    })
    
    $(".input-country").on("input", function () {
        // Normalisation de la saisie 
        countryNameTyped = $(this).val().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        sortedByDifferentsFilters(regionSelected,languageSelected,countryNameTyped)
    })
}
addDifferentSort()

/**
 * Fonction permettant d'ajouter l'ensemble des continents
 * @returns un tableau contenant uniquement le nom des continents
 */
function addAllRegions() {
    // Le tableau final
    let allRegions = []

    // Parcourt du tableau
    Object.values(all_countries).forEach((country) => {

        // Regard si la region est déjà présente dans le tableau
        if (allRegions.includes(country.region) === false) {

            // Ajout du nom de continent
            allRegions.push(country.region)
        }
    })
    // Tri alphabétique des continents
    allRegions = allRegions.sort((region1, region2) => region1.localeCompare(region2, "fr", { ignorePunctuation: true, caseFirst: false }))
    // Ajout de l'option de base
    allRegions.unshift('Choisir une option')
    return allRegions
}

/**
 * Fonction permettant d'ajouter l'ensembles des langues
 * @returns un tableau avec l'ensemble des langues
 */
function addAllLanguages() {
    // Le tableau final
    let allLanguages = []

    // Parcourt du tableau des langues uniques
    Object.values(all_languages).forEach((language) => {

        // Ajout du nom de la langue
        allLanguages.push(language.englishName)
    })
    // Tri alphabétique 
    allLanguages = allLanguages.sort((lang1, lang2) => lang1.localeCompare(lang2, "fr", { ignorePunctuation: true, caseFirst: false }))
    // Ajout de l'option de base
    allLanguages.unshift('Choisir une option')
    return allLanguages
}

/**
 * Fonction appelé lors de l'applicaction d'un ou plusieurs tris
 * @param {la région sélectionnée} regionSelected 
 * @param {la langue sélectionnée} languageSelected 
 * @param {le nom écrit} countryNameTyped 
 */
function sortedByDifferentsFilters(regionSelected, languageSelected, countryNameTyped) {

    // Permet de trouver les différents pays contenant les trois filtres
    let countriesFiltered = Object.values(all_countries).filter(country => {

        // Quelque mise en forme pour être sur de chercher sur des bases communes
        const countryRegion = country.region.toLowerCase().replaceAll(' ','-') || ''
        const countryLanguages = country.getLanguages || undefined
        const countryNameFr = country.frenchName.toLowerCase()
        const countryNameEn = country.englishName.toLowerCase()

        // Renvoie un booléen permettant de savoir si c'est la même région
        const isTheSameRegion = regionSelected === notFiltersSelected || regionSelected === countryRegion

        // Renvoie un booléen si la langue sélectionnée est comprise dans le pays
        const isTheSameLanguage = languageSelected === notFiltersSelected || Object.values(countryLanguages).some(language => language.englishName.toLowerCase().replaceAll(' ','-') === languageSelected)

        // Renvoie un booléen si une partie d'un pays écrit correspond au nom français ou anglais
        const countainCountryName = countryNameFr.includes(countryNameTyped) || countryNameEn.includes(countryNameTyped)
        
        return isTheSameLanguage && isTheSameRegion && countainCountryName
    })

    // Nous renvoie sur la première page du tableau
    pageNumber = 0
    // Ré-affecte la variable pour quelle soit prise en compte dans la fonction d'affichage
    filteredCountries = countriesFiltered
    // Appel de la fonction d'affichage
    printCountriesTable()
}