<template>
  <v-container id="typography" fluid tag="section">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <base-material-card color="green">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              New scripting
            </div>
            <div class="subtitle-1 font-weight-light">
              demo sort description
            </div>
          </template>
          <v-card-text>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required|max:30"
                >
                  <v-text-field
                    v-model="name"
                    :counter="30"
                    :error-messages="errors"
                    label="Name"
                    required
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="id"
                  :rules="{
                    required: true,
                    digits: 7,
                    regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$',
                  }"
                >
                  <v-text-field
                    v-model="id"
                    :counter="7"
                    :error-messages="errors"
                    label="ID"
                    required
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="type"
                  rules="required"
                >
                  <v-select
                    v-model="type"
                    :items="typeItems"
                    :error-messages="errors"
                    label="Type"
                    data-vv-name="type"
                    required
                  ></v-select>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="version"
                  :rules="{
                    required: true,
                  }"
                >
                  <v-text-field
                    v-model="version"
                    :error-messages="errors"
                    label="Version"
                    required
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="endpoint"
                  :rules="{
                    required: true,
                  }"
                >
                  <v-text-field
                    v-model="version"
                    :error-messages="errors"
                    label="Endpoint"
                    required
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="Script"
                  rules="required"
                >
                  <v-textarea
                    counter
                    v-model="script"
                    label="Script"
                    :error-messages="errors"
                    required
                  ></v-textarea>
                </validation-provider>

                <div class="my-4" />
                <v-btn
                  class="mr-4"
                  type="submit"
                  color="primary"
                  :disabled="invalid"
                >
                  submit
                </v-btn>
                <v-btn @click="clear">
                  clear
                </v-btn>
              </form>
            </validation-observer>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { required, digits, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class ScriptingEdit extends Vue {
  $refs!: {
    observer: any;
  };

  name = "";
  id = "";
  modifyAt = "";
  script = "";
  endpoint = "";
  version = "";
  type = "";
  typeItems = ["Process Service", "Webhook"];

  submit() {
    this.$refs.observer.validate();
  }
  clear() {
    this.name = "";
    this.id = "";
    this.type = "";
    this.version = "";
    this.modifyAt = "";
    this.script = "";
    this.endpoint = "";
    this.$refs.observer.reset();
  }
}
</script>
