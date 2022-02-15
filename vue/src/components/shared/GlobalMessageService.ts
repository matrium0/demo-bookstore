import type {Ref} from 'vue';
import {ref} from 'vue';

type MessageType = 'success' | 'info' | 'warning' | 'danger';

interface AlertMessage {
  type: MessageType;
  message: string;
  detail: string;
}

export const globalMessage: Ref<AlertMessage | null> = ref(null);
const timeout: Ref<number | null> = ref(null);


export function clearAlertMessage(): void {
  console.log("clearAlertMessage");
  globalMessage.value = null;
}

export function setGlobalMessage(type: MessageType, m: string): void {
  if (timeout.value) {
    clearTimeout(timeout.value);
  }

  const currentAlertMessage: AlertMessage = {type, message: m, detail: ""};
  const timeoutInMillis = type === 'danger' || type === 'warning' ? 8000 : 4000;
  timeout.value = window.setTimeout(() => clearAlertMessage(), timeoutInMillis);
  globalMessage.value = currentAlertMessage;
  console.log("creating message", currentAlertMessage);
}
