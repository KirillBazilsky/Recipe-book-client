<script setup lang="ts">
import 'cropperjs/dist/cropper.css';
import { PASSWORD_REQUIREMENTS } from '@/constants/messages/users';
import { Autocomplete } from '@/interfaces/user';
import Cropper from 'cropperjs';
import { nextTick, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { imageNameGenerate } from '@/lib/imageNameGenerate';


interface IProps {
    canDisabled?: boolean
    modelValue?: File
}
const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);

const imageSrc = ref<string | null>(null);
const imageElement = ref<HTMLImageElement | null>(null);
const cropperInstance = ref<Cropper | null>(null);
const imageFile = ref<File | null>(null);
const cropCount = ref<number>(0);

watch(()=> imageElement.value?.src, () => {

})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files[0]) {
        imageFile.value = target.files[0];
        imageSrc.value = URL.createObjectURL(imageFile.value);

        if (cropperInstance.value) {
            cropperInstance.value.destroy();
            cropperInstance.value = null;
        }

        emit("update:modelValue", imageFile.value)
}
};

const startCrop = () => {
    if (!cropperInstance.value) {
        if(!imageElement.value)  {
        return
    } 

    cropperInstance.value = new Cropper(imageElement.value, {
        aspectRatio: 1 / 1
    });
    }
};

const resetCrop = () => {
    cropperInstance.value?.clear().destroy();
    cropperInstance.value = null;
}

const saveCrop = () => {
    if(!cropperInstance.value)  {
        return;
    };

    const canvas = cropperInstance.value.getCroppedCanvas();

     canvas?.toBlob((blob) => {
       if(blob) {
        const blobUrl = URL.createObjectURL(blob);

            if(!imageElement.value) {
                return;
            }

            cropCount.value += 1;

            imageElement.value.src = blobUrl;

            imageFile.value = new File([blob], imageNameGenerate(cropCount.value, imageFile.value?.name), { type: blob.type });

            emit("update:modelValue", imageFile.value)
    }

    nextTick(() => {
        cropperInstance.value?.destroy();
        cropperInstance.value = null;
    }
    )

  })
};

</script>

<template>
    <div class="input-wrapper">
        <input
            :type=Autocomplete.file
            class="input"
            @change="handleInput"
        ></input>
        <p class="tips">{{ PASSWORD_REQUIREMENTS }}</p>
        <div v-if="imageSrc" class="preview">
            <img :src="imageSrc" alt="Uploaded preview" class="preview-image" ref="imageElement" />
        </div>
        <div class="button-wrapper">
            <button @click.prevent="startCrop" :class="{'disabled': cropperInstance}" v-if="imageElement">Crop</button>
            <button @click.prevent="resetCrop" v-if="cropperInstance">Reset</button>
            <button @click.prevent="saveCrop" v-if="cropperInstance">Save</button>
        </div>
        </div>
</template>

<style scoped>

.preview {
    width: 100%;
}
.preview-image {
    display: block;
    max-width: 100%;
}

.button-wrapper{
    width: 100%;
    height: min-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>