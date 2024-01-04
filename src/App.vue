<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';


onMounted(async () => {
  console.log('Developers Yolfry Bautista and YPW S.T.L  ... Ready App ')
})

</script>