class Currency{
    /**
     * Constructeur de la classe
     * @param {le code de la monnaie} code 
     * @param {le nom de la monnaie} name 
     * @param {le symbole de la monnaie} symbol 
     */
    constructor(code, name, symbol){
        this._code = code
        this._name = name
        this._symbol = symbol
    }

    /**
     * Tableau statique contenant toutes les monnaies
     */
    static all_currencies = {}

    /**
     * Permet de récupérer le code de la monnaie
     * @returns code de l'objet Currency
     */
    get code(){
        return this._code
    }

    /**
     * Permet de récupérer le nom de la monnaie
     * @returns name de l'objet Currency
     */
    get name(){
        return this._name;
    }

    /**
     * Permet de récupérer le symbole de la monnaie
     * @returns symbol de l'objet Currency
     */
    get symbol(){
        return this._symbol;
    }

    /**
     * Permet de renvlyer une chaine avec les informations requises
     * @returns Une chaine avec code, name, symbol
     */
    toString(){
        return ` ${this.code}, ${this.name}, ${this.symbol} `
    }
}

/**
 * Permet d'initialiser toutes les monnaies existantes dans le fichier JSON en ne les mettant qu'une seule fois
 */
function fill_currencies(){
    countries.forEach(country => {
        // Vérification si une monnaie éxiste dans le pays
        if (country["currencies"] !== undefined) {
            // On parcourt le tableau de monnaies présent
            country.currencies.forEach(currency => {
                // Récupération des données pour créer l'objet Currency
                let code = currency["code"] || undefined
                let name = currency["name"] || undefined
                let symbol = currency["symbol"] || undefined
                //On regarde si le code de la monnaie n'existe pas déjà dans le tableau
                if (!Object.keys(Currency.all_currencies).includes(code)) {
                    // On crée l'object Currency avec les données précédemment initialisés
                    let currency = new Currency (
                        code, 
                        name, 
                        symbol
                    )
                    // On ajoute l'objet créé dans le tableau statique
                    Currency.all_currencies[code] = currency
                } 
            })
        }
    })
}

// Appel de la fonction permettant d'initialiser les monnaies
fill_currencies()