class Language {

    /**
     * Construteur de la classe Language
     * @param {code de la langue} languageCode 
     * @param {nom anglais de la langue} englishName 
     */
    constructor (languageCode, englishName) {
        this._languageCode = languageCode
        this._englishName = englishName
    }

    /**
     * Tableau statique contenant toutes les langues du fichier JSON
     */
    static all_languages = {}

    /**
     * Permet de retourner le code la langue
     * @returns languageCode
     */
    get languageCode(){
        return this._languageCode
    }

    /**
     * Permet de retourner le nom anglais de la langue
     * @return englishName
     */
    get englishName(){
        return this._englishName
    }

    /**
     * Permet d'afficher une langue de façon conforme
     * @returns Une chaine avec englishName, languageCode
     */
    toString() {
        return ` ${this.englishName} ( ${this.languageCode} ) `
    }
}

/**
 * Fonction permettant d'enregitrer toutes les langues dans le tableau de la classe Language
 */
function fill_languages() {
    // Parcourt du fichier JSON
    countries.forEach(country => {
        // Vérification si le pays possède une ou plusieurs langues
        if (country["languages"] !== undefined) {
            // Parcourt du tableau languages
            country.languages.forEach(language => {
                // Récupération du code la langue
                let languageCode = language["iso639_2"]
                // Récupération du nom de la langue
                let englishName = language["name"] || undefined 
                // Vérification si la langue n'éxiste pas déjà dans le tableau de la classe Language
                if (!Object.keys(Language.all_languages).includes(languageCode)) {
                    // Création de l'objet Language
                    let language = new Language(
                        languageCode, 
                        englishName
                    )
                    // Ajout dans le tableau de l'objet
                    Language.all_languages[languageCode] = language
                }
            })
        }
    })
}

// Appel de la fonction fill_languages permettant d'initialiser les langues
fill_languages()