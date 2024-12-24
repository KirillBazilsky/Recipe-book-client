<script setup lang="ts">
import { paginationOptions, paginationSplitter } from "@/constants/common";
import { calcPages } from "@/lib/calcPages";
import { useRecipeStore } from "@/stores/recipes";
import { computed, ref, watchEffect } from "vue";
import MdiIcon from "./MdiIcon.vue";
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";
import { calcPanel } from "@/lib/calcPaginationPanel";
import { watch } from "vue";
import { useUsersStore } from "@/stores/users";

interface IProps {
  modelPageValue?: string;
  modelLimitValue?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(["update:modelPageValue", "update:modelLimitValue"]);

const recipeStore = useRecipeStore();
const count = computed(() => recipeStore.getCount);
const pages = ref<number[] | (string | number)[]>(
  calcPages(count.value, Number(props.modelLimitValue))
);
const isLastPage = ref<boolean>(false);
const isFirstPage = ref<boolean>(true);
const isPageOutOfRange = ref<boolean>(false);

watchEffect(() => {
  pages.value = calcPages(count.value, Number(props.modelLimitValue));
});

watchEffect(() => {
  if (!pages.value.length) {
    isLastPage.value = true;
    return;
  }
  isLastPage.value =
    Number(props.modelPageValue) === pages.value[pages.value.length - 1];
  isFirstPage.value = props.modelPageValue === "1";
});

watch(() => props.modelPageValue, (newValue, oldValue) => {
  if (oldValue && newValue) {
    if(Number(newValue) > Number(pages.value[pages.value.length - 1])) {
      return;
    }


    if(Number(oldValue) < Number(newValue)){
      pages.value = calcPanel(pages.value, (Number(newValue) +1).toString(), true);
    }
  }

  pages.value = calcPanel(pages.value, (Number(newValue) +1).toString(), false);

}
)

const handleSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target.value;
  emit("update:modelLimitValue", selectedValue);
  emit("update:modelPageValue", "1");
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const inputValue = target.value;

  isPageOutOfRange.value = inputValue > pages.value[pages.value.length-1] || Number(inputValue) < 1

  if (isPageOutOfRange.value) {
    return;
  }

  emit("update:modelPageValue", inputValue);
};

const handlePageSelect = (value: number | string) => {
  if (typeof value == "number") {
    emit("update:modelPageValue", value.toString());

    return;
  }

  if (
    value === paginationSplitter.center ||
    value === paginationSplitter.right
  ) {
    handlePageUp();

    return;
  }

  if (value === paginationSplitter.left) {
    handlePageDown();

    return;
  }
};

const handlePageDown = () => {
  if (isFirstPage.value) {
    return;
  }
  const page = (Number(props.modelPageValue) - 1).toString();
  emit("update:modelPageValue", page);

  pages.value = calcPanel(pages.value, props.modelPageValue ?? "", false);
};

const handlePageUp = () => {
  if (isLastPage.value) {
    return;
  }

  const page = (Number(props.modelPageValue) + 1).toString();
  emit("update:modelPageValue", page);

  pages.value = calcPanel(pages.value, props.modelPageValue ?? "", true);
};
</script>

<template>
  <div class="pagination-wrapper card">
    <div class="control-wrapper">
      <p class="control-label">Number of results:</p>
      <select @change="handleSelect" class="limit-select">
        <option
          v-for="option in paginationOptions"
          :value="option"
          :key="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <MdiIcon
      :icon="mdiArrowLeft"
      :size="16"
      color="#1c3d5a"
      @click="handlePageDown"
      class="link"
      :class="{ disabled: props.modelPageValue === '1' }"
    />

    <p
      v-for="page in pages"
      :key="page"
      class="page-link link"
      @click="() => handlePageSelect(page)"
      :class="{ selected: page.toString() === props.modelPageValue }"
    >
      {{ page }}
    </p>

    <MdiIcon
      :icon="mdiArrowRight"
      :size="16"
      color="#1c3d5a"
      @click="handlePageUp"
      class="link"
      :class="{ disabled: isLastPage }"
    />
    <div class="control-wrapper" :class="{'disabled': pages.length < 2}">
      <p class="control-label">Go to page:</p>
      <div class="tooltip" :class="{'visible': isPageOutOfRange}">Out of range</div>
      <input type="number" @change="handleChange" class="input" :max="pages[pages.length - 1]" min="1"></input>
    </div>
  </div>
</template>

<style lang="css" scoped>
.pagination-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-width: 96%;
  margin: var(--padding-size) auto 0;
  height: 30px;
  padding: 5px;
  border-radius: 12px 12px 0 0;
  position: sticky;
  top: 332px;
  z-index: 9;
  color: var(--main-color);
}

.limit-select {
  font-family: "Outfit", sans-serif;
  border: none;
  background-color: transparent;
  font-size: 16px;
}

.selected {
  background-color: var(--main-color);
  color: #fff;
}

.page-link {
  padding: 5px;
}

.link {
  cursor: pointer;
}

.link:hover {
  transform: scale(1.2);
}

.control-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 5px;
}

.input {
  width: 50px;
  height: 22px;
  padding-right: 8px;
}

.tooltip {
  top: -120%;
  left: 67%;
}

.tooltip.visible {
  opacity: 1;
  visibility: visible;
}


@media (max-width: 768px) {
  .pagination-wrapper {
    max-width: 100%;
    top: 80px;
  }

  .control-label {
    display: none;
  }
}

@media (min-width: 1362px) {
  .pagination-wrapper {
    top: 250px;
  }
}
</style>
