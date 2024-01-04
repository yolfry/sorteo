import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences';
import Swiper from 'swiper';
import requirement from '@/config/requirement.json'
import { iRequirement } from '@/interfaces/iRequirement';
import config from '@/config/app.json'

export const useAppStore = defineStore('appStore', {
    state: () => {
        return {
            emailApp: "info@ypw.com.do",
            appName: "Sorteo",
            start: false,
            swiper: {} as Swiper,
            sorteo: {
                requirement: requirement as iRequirement[],
                name: '' as string,
                phone: '' as string,
                isParticipe: false as boolean
            },
            config: config as iConfig
        }
    },
    actions: {
        async saveDataApp(key: string, data: any) {
            try {
                Preferences.set({
                    key: key,
                    value: JSON.stringify(data)
                })
            } catch (error) {
                console.log(error)
            }
        },
        async getDataApp(key: string) {
            try {
                const dataApp: any = await Preferences.get({
                    key: key
                })
                return JSON.parse(dataApp.value)
            } catch (error) {
                console.log(error)
            }
        },
        async removeDataApp(key: string) {
            try {
                await Preferences.remove({
                    key: key
                })
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        // async chargeLanguaje(locale: string) {

        //     if (this.locales.includes(locale)) {
        //         const i18n = await useI18n()
        //         this.locale = locale
        //         i18n.locale.value = this.locale
        //     }

        // }
    }
})


