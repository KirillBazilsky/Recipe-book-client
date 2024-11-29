<script setup lang="ts">
import { categoriesList } from "@/constants/appConstants.js";
import { filterSuggestions } from "@/lib/filterSuggestions.js";
import { ref, watch } from "vue";

interface IProps {
  modelValue: string;
  options: string[];
  placeholder: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);
const inputValue = ref<string>('');

const isDropdownOpen = ref<boolean>(false);
const filteredOptions  = ref<string[]>(props.options);

watch(() => props.modelValue, () => inputValue.value = props.modelValue);

const handleClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target) {
    emit("update:modelValue", target.value);
    inputValue.value = target.value
  }

  filteredOptions.value = filterSuggestions(target.value, props.options)
};

const handleSelect = (value: string) => {
  emit("update:modelValue", value);
  inputValue.value = value;
  isDropdownOpen.value = false;
};
</script>

<template>
  <div class="input-wrapper">
    <input
      v-model="inputValue"
      @input="handleInput"
      @click.prevent="handleClick"
      class="input"
      :placeholder="props.placeholder"
    />
    <ul class="dropdown" v-if="isDropdownOpen">
        <li class="option" @click="handleSelect('')">
            Unset
        </li>
      <li v-for="option in filteredOptions" @click="handleSelect(option)" :key="option" class="option">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="css">
.dropdown {
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

.option {
  cursor: pointer;
  padding: 8px;
}

.option:hover {
    background-color: #f0f0f0;
}
</style>
