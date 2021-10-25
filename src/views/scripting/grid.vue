<template>
  <v-container id="typography" fluid tag="section">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <base-material-card color="info">
          <template v-slot:heading>
            <div class="display-2 font-weight-light" data-cy = "header">
              List of scripting
            </div>

            <div class="subtitle-1 font-weight-light">
              demo sort description
            </div>
          </template>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="allScripts"
              sort-by="calories"
              data-cy="data-test"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>List of scripting</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" dark class="mb-2" @click="newItem">
                    New Item
                  </v-btn>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)" data-cy="edit">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)" data-cy="delete">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import ScriptModel from "@/models/script.model";

export default Vue.extend({
  name: "ScriptingEdit",
  data: () => {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Type", value: "type" },
        { text: "Latest Version", value: "version" },
        { text: "Last Edited", value: "modifyAt" },
        { text: "Actions", value: "actions", sortable: false },
      ] as any,
      edittedItem: null as any,
    };
  },

  computed: {
    ...mapGetters("scripting", {
      allScripts: "allScripts",
    }),
  },

  watch: {
    dialogDelete(val: boolean) {
      if (val === false) {
        this.closeDelete();
      }
    },
  },

  methods: {
    newItem() {
      this.$router.push({ name: "Scripting Detail" });
    },
    editItem(item: any) {
      this.$router.push({ name: "Scripting Detail", params: { item } });
    },
    deleteItem(item: ScriptModel) {
      this.edittedItem = item;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.$store.dispatch("scripting/removeScript", {
        item: this.edittedItem,
      });
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.edittedItem = null;
      });
    },
  },
});
</script>
