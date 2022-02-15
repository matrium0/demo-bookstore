<template>
  <div class="global-messages">
    <div v-if="globalMessage">
      <div role="alert" class="alert alert-info d-flex justify-content-between align-items-center">
        <div aria-live="polite">
          {{ globalMessage.message }}
          <div v-if="globalMessage.message.detail" class="small-message">
            {{ globalMessage.detail }}
          </div>
        </div>
        <font-awesome-icon @click="clearAlertMessage()" icon="times" size="lg" class="cursor-pointer ms-3"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {clearAlertMessage, globalMessage} from '@/components/shared/GlobalMessageService';</script>
<style scoped lang="scss">
.alert {
  margin-bottom: 0
}

.global-messages {
  font-size: 1.2rem;
  font-weight: bold;
  position: fixed;
  left: 5%;
  right: 5%;
  top: 70px;
  opacity: 0.9;
  z-index: 99999999;
  box-shadow: 0 3px 5px -1px #0003, 0 6px 10px #00000024, 0 1px 18px #0000001f;

  @media (min-width: 992px) {
    left: auto;
    right: 10%;
    max-width: 65%;
  }
  @media (min-width: 1200px) {
    max-width: 50%;
  }
}

.small-message {
  font-size: 1rem;
  font-weight: normal;
}

.global-messages .alert {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.alert {
  margin-bottom: 0;
}
</style>
