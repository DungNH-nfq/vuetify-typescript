<template>
  <v-container id="typography" fluid tag="section">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <base-material-card color="green">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              {{ title }}
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
                    v-model="data.name"
                    :counter="30"
                    :error-messages="errors"
                    label="Name"
                    required
                    data-cy="name"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="data.id"
                  :rules="{
                    required: true,
                  }"
                >
                  <v-text-field
                    v-model="data.id"
                    :error-messages="errors"
                    label="ID"
                    disabled
                    required
                    data-cy="id"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="type"
                  rules="required"
                >
                  <v-select
                    v-model="data.type"
                    :items="typeItems"
                    :error-messages="errors"
                    label="Type"
                    data-vv-name="type"
                    required
                    data-cy="type"
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
                    v-model="data.version"
                    :error-messages="errors"
                    label="Version"
                    required
                    data-cy="version"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="endpoint"
                  :rules="{
                    required: true,
                    regexCheckURL: regexToCheckValidUrl,
                  }"
                >
                  <v-text-field
                    v-model="data.endpoint"
                    :error-messages="errors"
                    label="Endpoint"
                    required
                    data-cy="endpoint"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="Script"
                  rules="required"
                >
                  <v-textarea
                    counter
                    v-model="data.scriptContent"
                    label="Script"
                    :error-messages="errors"
                    required
                    data-cy="script"
                  ></v-textarea>
                </validation-provider>

                <div class="my-4" />
                <v-btn
                  class="mr-4"
                  type="submit"
                  color="primary"
                  :disabled="invalid"
                  data-cy="submitBtn"
                >
                  submit
                </v-btn>
                <v-btn @click="clear" data-cy="clearBtn">
                  clear
                </v-btn>
                <v-btn @click="cancel">
                  Cancel
                </v-btn>
                <v-btn color="primary" @click.prevent="createrNewVersion">
                  Create new version
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

import ScriptModel from "@/models/script.model";
import { ScriptType } from "@/constants/script_type.constant";
import { regexToCheckValidUrl } from "@/constants/regex.constant";

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    item: { type: ScriptModel, default: null },
  },
})
export default class ScriptingEdit extends Vue {
  public $refs!: {
    observer: any;
  };

  // data
  protected title: string = "New Scripting";
  protected description: string = "sort description";
  protected data: ScriptModel = new ScriptModel();
  protected typeItems = [
    ScriptType.PROCESS_SERVICE,
    ScriptType.WEBHOOK,
    ScriptType.OTHER,
  ];

  get regexToCheckValidUrl() {
    return regexToCheckValidUrl;
  }

  protected created() {
    setInteractionMode("eager");
    this.initData();
    this.initCustomValidateRules();
  }

  protected async submit() {
    if (this.$refs.observer.validate()) {
      await this.$store.dispatch("scripting/addScript", this.data);
      this.$router.push({ name: "Scripting" });
    }
  }

  protected createrNewVersion() {
    this.data.generateNewVersion();
  }

  protected cancel() {
    this.$router.push({ name: "Scripting" });
  }

  protected clear() {
    this.data = new ScriptModel();
    this.$refs.observer.reset();
  }

  private initCustomValidateRules() {
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
    extend("regexCheckURL", {
      ...regex,
      message: "{_field_} value does not match URL",
    });
  }

  private initData() {
    const item: any = this.$route.params.item;

    if (item) {
      this.data = item as ScriptModel;
      this.title = `Edit scriptting name:${this.data.name}`;
    }
  }
}
</script>
