<template>
   <div :class="`grid grid-cols-1 md:grid-cols-${columns} gap-4`">
    <div
      v-for="(field, index) in formFields"
      :key="index"
      :class="field.type === 'textarea' ? `col-span-1 md:col-span-${columns}` : ''"
    >
      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">
          {{ field.label }}
          <span v-if="field.required" class="text-red-500">*</span>
        </label>

        <!-- Text, Email, Tel, Password Input -->
        <input
          v-if="['text', 'email', 'tel', 'password'].includes(field.type)"
          v-model="formData[field.key]"
          :type="field.type"
          :placeholder="field.placeholder"
          :required="field.required"
          
          class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all"
        />
        <!-- @blur="validateField(field)" -->
        <input
          v-else-if="field.type == 'number'"
          v-model="formData[field.key]"
           :type="field.type"
          :placeholder="field.placeholder"
          :required="field.required"
          
          class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all"
        />

        <!-- @blur="validateField(field)" -->

        <input
          v-else-if="field.type == 'checkbox'"
          v-model="formData[field.key]"
          type="checkbox"
          :true-value="true"
          :false-value="false"
          class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />


        <!-- Select Input -->
        <select
          v-else-if="field.type === 'select'"
          v-model="formData[field.key]"
          :required="field.required"
          @change="validateField(field)"
          class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all"
        >
          <option value="" disabled selected>
            {{ field.placeholder || "Select an option" }}
          </option>
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <!-- Textarea Input -->
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.key]"
          :placeholder="field.placeholder"
          :maxlength="field.maxLength"
          :required="field.required"
          @input="validateField(field)"
          rows="3"
          class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all"
        ></textarea>

        <!-- Error Message -->
        <p v-if="errors[field.key]" class="text-sm text-red-600">
          {{ errors[field.key] }}
        </p>

        <!-- Character Counter for textarea -->
        <div
          v-if="field.type === 'textarea'"
          class="text-xs text-gray-500 text-right"
        >
          {{ formData[field.key]?.length || 0 }}/{{ field.maxLength }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "DynamicForm",
  props: {
    formFields: {
      type: Array,
      required: true,
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
    columns: { type: Number, default: 1 } 
  },
  emits: ["update:formData", "validate"],
  setup(props, { emit }) {
    const formData = ref({});
    const errors = ref({});

    

    // Initialize form data
    const initializeFormData = () => {
      const data = {};
      props.formFields.forEach((field) => {
        data[field.key] = props.initialData[field.key] || "";
      });
      formData.value = data;
    };

    // Watch for initialData changes (edit mode)
    watch(
      () => props.initialData,
      (newData) => {
        if (newData && Object.keys(newData).length > 0) {
          props.formFields.forEach((field) => {
            if (newData[field.key] !== undefined) {
              formData.value[field.key] = newData[field.key];
            }
          });
        } else {
          initializeFormData();
        }
      },
      { immediate: true }
    );

    // Emit form data changes
    watch(
      formData,
      (newValue) => {
        emit("update:formData", newValue);
      },
      { deep: true }
    );

    // Field validation
    const validateField = (field) => {
      const value = formData.value[field.key];

      // Clear previous error
      delete errors.value[field.key];

      // Required check
      if (field.required && !value) {
        errors.value[field.key] = `${field.label} is required`;
        emit("validate", errors.value);
        return;
      }

      // Skip further validation if empty
      if (!value) {
        emit("validate", errors.value);
        return;
      }

      // Email validation
      if (field.type === "email" && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cleanValue = value.trim();
        if (!emailPattern.test(cleanValue)) {
          errors.value[field.key] = `${field.label} must be a valid email`;
        }
      }

      // Phone validation
      if (field.type === "tel" && value) {
        const phonePattern = /^[\d\s\-\+\(\)]{7,15}$/;
        if (!phonePattern.test(value)) {
          errors.value[field.key] = `${field.label} must be a valid phone number`;
        }
      }

      // Password validation
      if (field.type === "password" && value) {
        const passwordPattern =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordPattern.test(value)) {
          errors.value[field.key] =
            `${field.label} must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character`;
        }
      }

      emit("validate", errors.value);
    };

    const validateForm = () => {
      props.formFields.forEach((field) => {
        if (field.required) validateField(field);
      });
      return Object.keys(errors.value).length === 0;
    };

    return {
      formData,
      errors,
      validateField,
      validateForm,
    };
  },
};
</script>