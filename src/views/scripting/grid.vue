<template>
  <v-container id="typography" fluid tag="section">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <base-material-card color="info">
          <template v-slot:heading>
            <div
              class="display-2 font-weight-light"
              v-text="$vuetify.lang.t('$vuetify.scripting.title_grid')"
            />
          </template>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="allScripts"
              sort-by="name"
              id="script_datatable"
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

                  <v-dialog
                    v-model="dialogExecute"
                    scrollable
                    max-width="800px"
                  >
                    <v-card>
                      <v-card-title
                        class="text-h5"
                        v-text="getTitleOfExecuteScript()"
                      />
                      <v-divider></v-divider>
                      <div class="my-2" />
                      <v-card-text>
                        <v-textarea
                          no-resize
                          :value="logExecuteScript"
                          rows="10"
                          label="'Log Excute Script'"
                        />
                      </v-card-text>
                      <v-card-text style="height: 300px;">
                        <v-textarea
                          outlined
                          disabled
                          dense
                          rows="10"
                          label="Response"
                          :value="resultExecutedScript"
                        />
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeExecuteScriptDialog"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click.prevent="uploadScript"
                          >Upload</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          :disabled="isNotReadyToExecuteScript"
                          @click.prevent="excuteScript"
                          >Run</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mx-2" @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
                <v-icon small @click="runScript(item)">
                  mdi-play-speed
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
import axios from "axios";

// Utilities
import { HelperFiles } from "@/helpers/files";
import { HelperUtils } from "@/helpers/utils";
// Model
import ScriptModel from "@/models/script.model";

const hostAPIDefault = "http://91cd-123-19-103-56.ngrok.io";
const endpointToUploadScript = `/upload`;
const endpointToGetScriptStatus = `/getfnbyid?`;
const endPointToExcuteScript = `?`;
const intervalTimeoutToCheckScriptStatus = 3000;
const scriptStatusIsReadyToExecute = "running";

export default Vue.extend({
  name: "ScriptingEdit",
  data: () => {
    return {
      dialogDelete: false,
      dialogExecute: false,
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
      resultExecutedScript: "",
      logExecuteScript: "",
      intervalIdToCheckScriptStatus: null as any,
      isNotReadyToExecuteScript: true,
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
    dialogExecute(val: boolean) {
      if (val === false) {
        this.closeExecuteScriptDialog();
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
    getTitleOfExecuteScript() {
      return `You are executing the script "${this.edittedItem?.name}"`;
    },
    runScript(item: ScriptModel) {
      this.edittedItem = item;
      this.dialogExecute = true;
    },
    closeExecuteScriptDialog() {
      this.dialogExecute = false;
      this.$nextTick(() => {
        this.edittedItem = null;
        this.resultExecutedScript = "";
      });
    },
    async uploadScript(): Promise<void> {
      const { scriptContent } = this.edittedItem;
      const fileToUpload = HelperFiles.generateFile(scriptContent);

      this.logExecuteScript = `========= ${new Date()} ========= \n`;
      this.logExecuteScript += `- Imported script to file name: ${fileToUpload?.name} \n`;
      this.logExecuteScript += `- Uploading script to server \n`;

      const functionId = await this.uploadScriptToCloud(fileToUpload);

      if (!functionId) {
        this.logExecuteScript += `- Upload script failed. Stopped excute this script\n`;
        return;
      }

      this.logExecuteScript += `- Uploaded script to server with function id is ${functionId} \n`;
      const isReadyToExecuteScript = await this.checkScriptIsReadyToExcute(
        functionId
      );

      this.isNotReadyToExecuteScript = isReadyToExecuteScript === false;

      if (isReadyToExecuteScript) {
        this.logExecuteScript += `- Excuting script with function id is ${functionId}\n`;
        return;
      }

      this.logExecuteScript += `- Build script have trouble. Stopped excute this script\n`;
    },
    async uploadScriptToCloud(
      fileAttachment: File | undefined
    ): Promise<string> {
      if (!fileAttachment) {
        return "";
      }

      const functionId = HelperUtils.uuidV4();
      const bodyFormData = new FormData();

      bodyFormData.append("fnid", functionId);
      bodyFormData.append("sampleFile", fileAttachment, "worker.js");

      const hostAPI = this.edittedItem.endpoint || hostAPIDefault;
      const url = `${hostAPI}${endpointToUploadScript}`;
      const headers = { "Content-Type": "multipart/form-data" };
      const method = "post";

      return axios({
        url,
        headers,
        method,
        data: bodyFormData,
      })
        .then((response) => {
          console.log({ response });
          return functionId;
        })
        .catch((error) => {
          console.log({ error });
          return "";
        });
    },
    async checkScriptIsReadyToExcute(functionId: string): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        this.intervalIdToCheckScriptStatus = setInterval(async () => {
          const hostAPI = this.edittedItem.endpoint || hostAPIDefault;
          const url = `${hostAPI}${endpointToGetScriptStatus}fnid=${functionId}`;

          try {
            const { container_status } = await axios.get<object, any>(url);

            if (container_status === scriptStatusIsReadyToExecute) {
              clearInterval(this.intervalIdToCheckScriptStatus);
              resolve(true);
            }
          } catch (error) {
            console.error(error);
            resolve(false);
          }
        }, intervalTimeoutToCheckScriptStatus);
      });
    },
    async excuteScript(functionId: string): Promise<void> {
      if (!functionId) {
        this.resultExecutedScript = "Not existing function id";
        return Promise.resolve();
      }

      try {
        const hostAPI = this.edittedItem.endpoint || hostAPIDefault;
        const url = `${hostAPI}${endPointToExcuteScript}${functionId}`;
        const response = await axios.get(url);

        this.resultExecutedScript = JSON.stringify(response);
        this.logExecuteScript += `- Excuted script with function id is ${functionId}\n`;
      } catch (error) {
        this.logExecuteScript += `- Excute script have trouble. Stopped excute this script\n`;
      }
    },
  },
});
</script>
