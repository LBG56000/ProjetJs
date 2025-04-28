/**
 * Récupération de l'ensemble des pays
 */
const all_countries = Country.all_countries

/**
 * Récupération de l'ensemble des langues
 */
const all_languages = Language.all_languages

/**
 * Récupération de l'ensemble des monnaies
 */
const all_currencies = Currency.all_currencies

/**
 * Q1 - outsideTheContinent() : 
 * Tableau JS des pays (objets Country) dont au moins 
 * un pays frontalier n’est pas dans le même continent.
 * 
 * Permet d'avoir les pays voisins qui ne sont pas dans le même continent que leur pays
 * @returns bordersOutsideTheContinent
 */
function outsideTheContinent() {

    // Tableau contenant les pays voisins qui ne sont pas dans le même continent que lui même
    let bordersOutsideTheContinent = []

    // Récupération des clés du tableau contenant tous les pays permettant de sélectionner les éléments dans le tableau all_countries
    Object.values(all_countries).forEach(country => {

        // Récupération des pays voisins du pays
        const bordersOfCoutry = country.getBorders()

        //Si le tableau n'est pas défini on return
        if (bordersOfCoutry) {
            // On parcourt le tableau des pays voisins
            bordersOfCoutry.forEach(border => {

            // On comparer chaque voisin et on le compare avec la region de l'object Country
            if (border["region"] !== country["region"]) {
                // On ajoute le pays dans le tableau bordersOutsideTheContinent
                bordersOutsideTheContinent.push(country)
            }
            })
        }
    })
    return bordersOutsideTheContinent
}

/**
 * Q2 - moreNeighbors() :
 * moreNeighbors() : Tableau des pays ayant le plus grand nombre de voisins.
 * Affichez aussi les voisins
 * 
 * Permet d'afficher les pays avec le plus de voisins ainsi que les voisins associés
 */
function moreNeighbors() {

    // Tableau contenant les futurs pays avec le plus de voisins
    let moreNeighbors = []

    // Variable changeante permettant de stocker le longueurs du tableau voisins
    let maxBorders = 0

    console.log('test');
    // Parcourts du tableau contenant les pays
    Object.values(all_countries).forEach(country => {
        
        // Initialisation des voisins de pays
        const borders = country.getBorders()
        
        if (borders !== undefined) {
            // Récupération de la longueur du tableau des voisins
            let numberOfBorders = borders.length
            if (numberOfBorders >= maxBorders) {
                maxBorders = numberOfBorders
                // Ajout dans le tableau du pays avec le plus de voisins
                moreNeighbors.push(country)
            }
        }
    })

    return moreNeighbors
}

/**
 * Q3 - neighborless() : Tableau des pays n’ayant aucun voisin
 * Permet d'afficher les pays n'ayant aucuns voisins
 * @return le tableau des pays n'ayant aucun voisin
 */
function neighborless() {
    // Tableau contenant les futurs pays avec le plus de voisins
    let neighborless = []

    // Parcourts du tableau contenant les pays
    Object.values(all_countries).forEach(country => {

        // Initialisation des voisins de pays
        const borders = country.getBorders()
        if (borders.length === 0) {
            neighborless.push(country)
        }
    })
    return neighborless
}

/**
 * Q4 - moreLanguages() : Tableau des pays parlant le plus de langues. 
 * Affichez aussi les langues (objets Language)
 * 
 * Permet d'obtenir un tableau des pays ayant le plus grand nombre de langues dans leur pays
 * @return le tableau contenant les pays avec le plus de langues parlées
 */

function moreLanguages() {
    // Tableau ou seront ajouter les futurs objets Country
    let countryWithMoreLanguages = []

    // Variable contenant le plus grand nombre de langues
    let maxLanguages = 0

    // Parcourt du tableau de pays
    Object.values(all_countries).forEach(country => {
        // Récupération des langues du pays
        const languagesOfCountry = country.getLanguages
        if (languagesOfCountry.length !== 0) {
            // Récupération de la longueur du tableau
            const numberOfLanguages = languagesOfCountry.length
            if (numberOfLanguages >= maxLanguages) {
                maxLanguages = numberOfLanguages
                // Ajout du pays
                countryWithMoreLanguages.push(country)
            }
        }
    })
    return countryWithMoreLanguages
}

/**
 * Q5 - withCommonLanguage() : Tableau des pays ayant au moins un voisin parlant l’une 
 * de ses langues. Affichez aussi les pays voisins (objets Country) et les langues en question (objets Language)
 * 
 * Permet de donner les pays ou un voisins parle une des langues du pays 
 * @returns tableau contenant les pays
 */

function withCommonLanguage() {
    let withCommonLanguage = {}

    Object.values(all_countries).forEach(country => {

        // Récupération du code des langues parlées dans le pays
        const languagesOfCountry = country.getLanguages.map(
            language => language["languageCode"]
        )

        // Réupération des voisins du pays
        const bordersOfCountry = country.getBorders()
        
        if (languagesOfCountry.length > 0 && bordersOfCountry.length > 0) {
            
            // Parcourt des voisins
            bordersOfCountry.forEach(border => {

                // Récupération pour chaque voisins des langues
                const languagesOfBorder = border.getLanguages.map(
                    language => language["languageCode"]
                )
                // Récupération des langues communes aux deux pays
                const languageCommon = languagesOfCountry.filter( 
                    language => languagesOfBorder.includes(language)
                )

                if (languageCommon.length > 0) {

                    // Récupération de la langue commune
                    let language = all_languages[languageCommon[0]]
                    
                    // Ajout dans l'objet du voisin et de la langue commune
                    withCommonLanguage[country.frenchName] = {
                        voisinParlantMemeLangue : border,
                        langueCommune: language
                    }
                }
            })
        }
    })
    return withCommonLanguage
}

/**
 * Q6 - withoutCommonCurrency() : Tableau des pays sans aucun voisin 
 * ayant au moins une de ses monnaies.
 * 
 * Permet de récupérer les pays voisins n'ayant pas leur(s) monnaie(s)
 * @return un objet contenant les pays qui ont des voisins n'ayant pas au moins une seule de leur monnaie
 */

function withoutCommonCurrency() {
    let withoutCommonCurrency = {}
    
    Object.values(all_countries).forEach(country => {

        // Récupération des monnaies du pays
        const currenciesOfCountry = country.getCurrencies

        // Récupération des voisins du pays
        const bordersOfCountry = country.getBorders()

        if (currenciesOfCountry !== undefined && bordersOfCountry !== undefined) {

            // Parcourt de chaque voisins
            bordersOfCountry.forEach(border => {

                // Récupération des monnaies du voisin
                const currenciesOfBorder = border.getCurrencies.map(
                    currency => currency["code"]
                )

                if (currenciesOfBorder !== undefined) {
                    // Récupération de la présence ou non de la monnaies dans
                    const checkIfCurrencyCommon = currenciesOfCountry.some(currency => {
                        return currenciesOfBorder.includes(currency["code"])
                    })

                    // Vérification de la non présence de la monnaies chez le voisin
                    if (checkIfCurrencyCommon == false) {
                        if (withoutCommonCurrency[country.frenchName] === undefined) {
                            // Création de l'objet avec le pays
                            withoutCommonCurrency[country.frenchName] = {
                                voisinPasMemeMonnaie: []
                            }
                        }
                        // Ajout du voisin
                        withoutCommonCurrency[country.frenchName].voisinPasMemeMonnaie.push(border)
                    }
                }
            })
            
        }
    })
    return withoutCommonCurrency
}

/**
 * Q7 - sortingDecreasingDensity() : Tableau des pays triés par ordre 
 * décroissant de densité de population.
 * 
 * Permet de donner les pays triés pas ordre décroissant de densité de population
 * @return Un objet contenant le tableau trié
 */

function sortingDecreasingDensity() {
    // Récupération des valeurs de l'objet
    const all_countries_sorted = Object.values(all_countries)
    all_countries_sorted.sort((country1,country2) => {
        // Comparaison des densitée
        return country1.getPopDensity() - country2.getPopDensity()
    })
    return all_countries_sorted
}

/**
 * Q8 - moreTopLevelDomains() : Tableau des pays ayant plusieurs
 * Top Level Domains Internet.
 * 
 * Permet d'avoir les pays avec plusieurs Top Level domain
 * @return un tableau ayant les pays avec plusieurs top level domais
 */

function moreTopLevelDomains() {
    let moreTopLevelDomains = {}

    // Parcourt des pays
    Object.values(all_countries).forEach(country => {
        if (country["domainExtension"] !== undefined) {
            if (country["domainExtension"].length > 1) {
                // Ajout de pays ayant plusieurs topLevelDomain
                moreTopLevelDomains[country.frenchName] = country["domainExtension"]
            }
        }
    })
    return moreTopLevelDomains
}
