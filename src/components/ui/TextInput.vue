<script setup lang="ts">
import { Autocomplete } from "@/interfaces/user.js";
import { useUsersStore } from "@/stores/users.js";
import { filterSuggestions } from "@/lib/filterSuggestions.js";
import { getSuggestions } from "@/lib/getSuggestions.js";
import { pushValueToSuggestions } from "@/lib/pushValueToSuggestions.js";
import { setLocalStorageItem } from "@/lib/setLocalStorageItem.js";
import { computed, ref, watch } from "vue";

interface IProps {
  modelValue: string;
  type: string;
  placeholder: string;
  canDisabled?: boolean
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const usersStore = useUsersStore();
const isAuthenticated = computed(() => usersStore.isUserAuthenticated);
const storageKey = `input-${props.placeholder}`;
const inputValue = ref(props.modelValue);
const suggestions = ref(getSuggestions(storageKey));
const filteredSuggestions = ref<string[]>([]);

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

watch(suggestions.value, (newSuggestions) => {
  if (!newSuggestions) {
    return;
  }
  setLocalStorageItem(storageKey, newSuggestions);
});

const selectSuggestion = (suggestion: string) => {
  emit("update:modelValue", suggestion);
  inputValue.value = suggestion;
  filteredSuggestions.value = [];
};

const handleBlur = () => {
  pushValueToSuggestions(inputValue.value, suggestions.value);
  filteredSuggestions.value = [];
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    inputValue.value = target.value;
    emit("update:modelValue", target.value);

    filteredSuggestions.value = filterSuggestions(
      target.value,
      suggestions.value
    );
  }
};
</script>

<template>
  <div class="input-wrapper">
    <input
      :type="props.type"
      :value="inputValue"
      @input="handleInput"
      :placeholder="props.placeholder"
      @keydown.enter="handleInput"
      @blur="handleBlur"
      :disabled="isAuthenticated && canDisabled"
      :class="{'disabled': isAuthenticated && canDisabled}"
      :autocomplete="props.type"
      class="input"
    />
    <ul v-if="filteredSuggestions.length" class="suggestions">
      <li
        v-for="option in filteredSuggestions"
        :key="option"
        @mousedown="selectSuggestion(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  padding: 0;
  margin: 0;
  list-style: none;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}
</style>
