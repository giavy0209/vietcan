export const LANGUAGE = 'LANGUAGE'

export const actionChangeLanguage = function (language : any) {
    return {
        type : LANGUAGE,
        payload : {language}
    }
}