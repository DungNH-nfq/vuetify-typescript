import { Module } from "vuex";
import ScriptModel from "@/models/script.model";
import { RootState } from "../types";

const namespaced: boolean = true;

export const scripting: Module<any, RootState> = {
  namespaced,
  state: {
    scripting: Array<ScriptModel>(),
  },
  getters: {
    allScripts(state): ScriptModel[] {
      return state.scripting;
    },
  },
  mutations: {
    addScript(state, scripItem: ScriptModel) {
      const editItem: ScriptModel = state.scripting.find(
        (item: ScriptModel) => item.id === scripItem.id
      );

      if (editItem) {
        editItem.modifyAt = new Date();
        return;
      }

      state.scripting.push(scripItem);
    },
    removeScript(state, scripItem: ScriptModel) {
      const indexOfDeletingItem: number = state.scripting.indexOf(scripItem);

      if (indexOfDeletingItem >= 0) {
        state.scripting.splice(indexOfDeletingItem, 1);
      }
    },
  },
  actions: {
    addScript(context, scripItem: ScriptModel) {
      if (scripItem) {
        context.commit("addScript", scripItem);
      }
    },
    removeScript(context, { item }) {
      if (item) {
        context.commit("removeScript", item);
      }
    },
  },
};
