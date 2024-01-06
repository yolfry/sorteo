<script lang="ts" setup>

import { ref, watch, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonContent, IonPage, IonText, IonButton, IonRow, IonCol, IonIcon, IonInput } from '@ionic/vue';
import { Pagination } from "swiper/modules";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { linkOutline, checkmark, logoInstagram, logoFacebook, logoTiktok, logoTwitter, logoTwitch, logoPinterest, logoGoogle, logoAmazon, logoWhatsapp } from 'ionicons/icons';
import { useAppStore } from '@/store/app';
import 'animate.css'
import regExps from '@/ts/RegExps';
import { Ticon, iRequirement } from '@/interfaces/iRequirement';

const appStore = useAppStore()

const timeClick = ref(10000)


const getIcon = (icon: Ticon): string => {
    switch (icon) {
        case 'Amazon':
            return logoAmazon
            break;

        case 'Instagram':
            return logoInstagram
            break;

        case 'Whatsapp':
            return logoWhatsapp
            break;

        case 'Facebook':
            return logoFacebook
            break;

        case 'Tiktok':
            return logoTiktok
            break;

        case 'Twitter':
            return logoTwitter
            break;

        case 'Twitch':
            return logoTwitch
            break;

        case 'Pinterest':
            return logoPinterest
            break;

        case 'Google':
            return logoGoogle
            break;

        default:
            return linkOutline
            break;
    }
}

//Ado SetTime Out
const timeout = (timeout: () => any) => {
    setTimeout(timeout, timeClick.value)
}


//Validar requerimientos
watch(appStore.sorteo.requirement, async (inObject) => {
    if (await appStore.sorteo.requirement.filter(req => req.valid == true).length == appStore.sorteo.requirement.length) {
        appStore.sorteo.isParticipe = true
    }

    await appStore.saveDataApp('form.app.requirement', inObject);
    await appStore.saveDataApp('form.app.slide', 1);
})



//Validar datos del usuario
const isValidDataUser = () => {
    if (!regExps.name.test(appStore.sorteo.name)) {
        return false
    }
    if (!regExps.phone.test(appStore.sorteo.phone)) {
        return false
    }
    return true
}


const registerEnd = async () => {
    await appStore.saveDataApp('form.start', true);
    appStore.start = true

    window.open(`https://wa.me/${appStore.config.numberWhatsappApp}?text= ${appStore.config.nameWhatsappText} ${appStore.sorteo.name}, ${appStore.config.phoneWhatsappText} ${appStore.sorteo.phone}, Code: ${new Date().getTime()}`, '__blank')
}

onMounted(async () => {
    try {
        const sendForm = await useAppStore().getDataApp('form.start')
        if (sendForm) {
            appStore.start = sendForm
        }

    } catch (error) {
        console.log(error)
    }


    try {

        const requirement = await appStore.getDataApp('form.requirement') as iRequirement[];
        if (requirement) {
            appStore.sorteo.requirement.splice(0, appStore.sorteo.requirement.length)

            requirement.forEach(req => {
                //Agregar requerimientos sin romper el estado
                appStore.sorteo.requirement.push(req)
            })

        }

        const slide = await appStore.getDataApp('form.slide');

        if (slide) {
            appStore.swiper.slideTo(slide)
        }

    } catch (error) {

    }
})

</script>

<template>
    <ion-page>

        <IonContent v-if="appStore.start">
            <ion-row style="position: absolute;
    top: 0;
    bottom: 0;" class="background-default ion-padding ion-text-center">
                <ion-col style="margin-top: 40%;" size="12">
                    <ion-text color="light">
                        <h1>{{ $t('text.titleEnd') }}</h1>
                        <h4> {{ $t('text.textEnd') }}</h4>
                        <h5>{{ $t('text.addNumberTextEnd', {
                            number: appStore.config.numberWhatsappApp
                        }) }}</h5>
                    </ion-text>

                    <img class="logo" src="@/assets/logoPerobaCompany.svg">

                </ion-col>
            </ion-row>
        </IonContent>


        <ion-content v-else>

            <swiper @swiper="e => appStore.swiper = e" :navigation="true" :modules="[Pagination]" :grabCursor="true"
                :pagination="{
                    clickable: true,
                    dynamicBullets: true,
                }">

                <swiper-slide class="background-sorteo">


                    <ion-row>
                        <ion-col size="12">
                            <img class="box-top-sorteo animate__animated animate__bounce"
                                src="@/assets/box-top-sorteo.svg" />
                        </ion-col>
                        <ion-col size="12">
                            <ion-text color="light">
                                <span class="title-focus-1">{{ $t('text.titleInit') }}</span>
                            </ion-text>
                        </ion-col>
                        <ion-col>
                            <img class="logo" src="@/assets/logoPerobaCompany.svg">
                        </ion-col>
                        <ion-col size="12">
                            <img class="product" src="@/assets/products.webp" />
                        </ion-col>

                    </ion-row>

                    <ion-button @click="appStore.swiper.slideTo(1)" color="light" class="btn-start ion-text-uppercase"
                        size="large" shape="round" mode="ios">{{ $t('text.participate')
                        }}</ion-button>

                </swiper-slide>


                <swiper-slide class="background-default">


                    <ion-row>
                        <ion-col v-for="requirement in appStore.sorteo.requirement" size="12" class=" ion-padding-vertical">
                            <ion-text color="light">
                                <h1>{{ $t('text.passed', {
                                    number: requirement.passed
                                }) }}</h1>
                                <ion-button @click="() => {
                                    timeout(() => {
                                        requirement.valid = true
                                    })
                                }" :fill="requirement.valid ? `outline` : `default`" target="__blank"
                                    :href="requirement.href" color="light" size="default" shape="round" mode="ios"><ion-icon
                                        :icon="getIcon(requirement.icon)" />{{
                                            requirement.title
                                        }}<ion-icon v-if="requirement.valid" :icon="checkmark" /></ion-button>
                            </ion-text>
                        </ion-col>

                    </ion-row>

                    <ion-button v-if="appStore.sorteo.isParticipe" @click="appStore.swiper.slideTo(2)" color="light"
                        class="btn-start ion-text-uppercase" size="large" shape="round" mode="ios">{{ $t('text.participate')
                        }}</ion-button>

                </swiper-slide>


                <swiper-slide class="background-default">


                    <ion-row class=" ion-padding-horizontal">
                        <ion-col size="12">
                            <ion-input name="name" type="text" v-model="appStore.sorteo.name"
                                :placeholder="$t('account.placeholder.name')" />
                        </ion-col>

                        <ion-col size="12">
                            <ion-input name="phone" type="number" v-model="appStore.sorteo.phone"
                                :placeholder="$t('account.placeholder.phone')" />
                        </ion-col>

                        <ion-col v-if="appStore.sorteo.phone.length > 0 && !regExps.phone.exec(appStore.sorteo.phone)"
                            size="12">
                            <ion-text color="light">
                                ⚠️ {{ $t('account.phoneError') }}
                            </ion-text>
                        </ion-col>



                        <ion-col v-if="isValidDataUser() && !appStore.sorteo.isParticipe" size="12">
                            <ion-text color="light">
                                ⚠️ {{ $t('text.backFormRequirement') }}
                            </ion-text>
                        </ion-col>
                    </ion-row>

                    <ion-button @click="registerEnd()" v-if="appStore.sorteo.isParticipe && isValidDataUser()" color="light"
                        class="btn-start ion-text-uppercase" size="large" shape="round" mode="ios">{{ $t('text.participate')
                        }}</ion-button>


                </swiper-slide>

            </swiper>

        </ion-content>

    </ion-page>
</template>


<style scoped>
.swiper .swiper-slide ion-input {
    background: white;
    border-radius: 2rem;
    font-size: 1.3rem;
}

ion-icon {
    padding-left: 5px;
    padding-right: 5px;
}

.btn-start {
    display: block;
    width: 80%;
    bottom: 5%;
    position: absolute;
}

.swiper .swiper-slide .logo {
    display: block;
    position: relative;
    width: 50%;
    margin: auto;
}

.swiper .swiper-slide .product {
    margin: -10%;
}

.swiper .swiper-slide .box-top-sorteo {
    width: 100rem;
    top: -10%;
    display: block;
    margin: auto;
    position: fixed;
    animation: float 3s ease-in-out infinite;
}

.title-focus-1 {
    font-size: 2rem;
    font-weight: bold;
}



@keyframes float {
    0% {
        transform: translatey(0%);
    }

    50% {
        transform: translatey(-5%);
    }

    100% {
        transform: translatey(0%);
    }
}


.background-sorteo {
    background-image: url('@/assets/background-sorteo.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}


.swiper {
    width: 100%;
    height: 100%;
}
</style>
