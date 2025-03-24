/**
 * Récupération de l'ensemble des pays
 */
const all_countries = Country.all_countries

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
    Object.keys(all_countries).forEach(countryKey => {

        // Récupération de l'objet Country
        const country = all_countries[countryKey]

        // Récupération des pays voisins du pays
        const bordersOfCoutry = country.getBorders()

        //Si le tableau n'est pas défini on return
        if (bordersOfCoutry === undefined) {
            return undefined
        }

        // On parcourt le tableau des pays voisins
        bordersOfCoutry.forEach(border => {

            // On comparer chaque voisin et on le compare avec la region de l'object Country
            if (border["region"] !== country["region"]) {

                // On ajoute le pays dans le tableau bordersOutsideTheContinent
                bordersOutsideTheContinent.push(border)
            }
        })
    })
    return bordersOutsideTheContinent
}

console.table(outsideTheContinent())


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

    // Parcourts du tableau contenant les pays
    Object.keys(all_countries).forEach(countryKey => {
        
        // Initailisation d'un pays
        const country = all_countries[countryKey]

        // Initialisation des voisins de pays
        const borders = country["borders"]
        
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

// Appel de la fonction Affichage du pays + des ses voisins
console.log('Affichage des pays ayant le plus de voisin')
moreNeighbors().forEach(country => {
    console.log()
    console.log(`Les voisins de ${country["frenchName"]} sont ${country.traductionOfBorders}`)
})


/**
 * Q3 - neighborless() : Tableau des pays n’ayant aucun voisin
 * Permet d'afficher les pays n'ayant aucuns voisins
 * @return le tableau des pays n'ayant aucun voisin
 */
function neighborless() {
    // Tableau contenant les futurs pays avec le plus de voisins
    let neighborless = []

    // Parcourts du tableau contenant les pays
    Object.keys(all_countries).forEach(countryKey => {
        
        // Initailisation d'un pays
        const country = all_countries[countryKey]

        // Initialisation des voisins de pays
        const borders = country["borders"]
        
        if (borders === undefined) {
            neighborless.push(country)
        }
    })
    return neighborless
}

console.log('\nPays n\'ayant pas de voisins')
console.table(neighborless(),'_frenchName')


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
    Object.keys(all_countries).forEach(countryKey => {
        // Initialisation de l'objet Country
        const country = all_countries[countryKey]
        // Récupération des langues du pays
        const languagesOfCountry = country["languages"]
        if (languagesOfCountry !== undefined) {
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

// Appel de la fonction et affichage du pays et des langues parlées
console.log('Pays ou le plus de langues sont parlées')
moreLanguages().forEach(country => {
    console.log(country.toString())
    console.log(country.getLanguages.toString())
    console.log('\n')
})


/**
 * Q5 - withCommonLanguage() : Tableau des pays ayant au moins un voisin parlant l’une 
 * de ses langues. Affichez aussi les pays voisins (objets Country) et les langues en question (objets Language)
 * 
 * Permet de donner les pays ou un voisins parle une des langues du pays 
 * @returns tableau contenant les pays
 */

function withCommonLanguage() {
    let withCommonLanguage = {}

    Object.keys(all_countries).forEach(countryKey => {

        // Récupération de l'objet Country
        const country = all_countries[countryKey]

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
                    let language = Language.all_languages[languageCommon[0]]
                    
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

// Affichage du tableau avec un voisin parlant au moins une même langue commune avec le pays
console.log('\nAffichage des pays avec un voisins parlant la même langue qu\'un pays')
console.table(withCommonLanguage())