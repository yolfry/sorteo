// Lang I18n
import { createI18n } from 'vue-i18n'
import es from '@/locales/es.json'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'

const installI18n = async () => {

    const i18n = createI18n({
        locale: 'es',
        fallbackLocale: 'es',
        legacy: false, //Correcion de error Modo heredado
        allowComposition: true,
        messages: {
            en,
            es,
            fr,
        }
    })

    return await i18n

}


export default installI18n



