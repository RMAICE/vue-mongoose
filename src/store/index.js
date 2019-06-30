import Vue from "vue";
import Vuex from "vuex";

import api from "../api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    search: "",
    formState: false,
    members: {},
    companies: [],
    membersLoadingStatus: "notLoading",
    membersPerPage: 2
  },
  mutations: {
    SET_FORM_STATE(state, payload) {
      state.formState = payload;
    },
    SET_SEARCH(state, payload) {
      state.search = payload;
    },
    SET_MEMBERS(state, payload) {
      state.members = payload;
    },
    SET_NOT_PAGINATED_COMPANIES(state, payload) {
      state.companies = payload;
    },
    SET_MEMBERS_LOADING_STATUS(state, payload) {
      state.membersLoadingStatus = payload;
    }
  },
  actions: {
    setFormState({ commit }, payload) {
      commit("SET_FORM_STATE", payload);
    },
    changeSearchWord({ commit }, payload) {
      commit("SET_SEARCH", payload);
    },
    async fetchNotPaginatedCompanies({ commit }) {
      let companies = await api.fetchCompanies();

      commit("SET_NOT_PAGINATED_COMPANIES", companies);
    },
    async fetchMembers({ commit, state }, payload) {
      try {
        let query = {
          limit: state.membersPerPage,
          ...payload
        };
        let members;

        commit("SET_MEMBERS_LOADING_STATUS", "loading");
        members = await api.fetchMembers(query);
        commit("SET_MEMBERS", members);
        commit("SET_MEMBERS_LOADING_STATUS", "notLoading");
      } catch (e) {
        throw e;
      }
    }
  },
  getters: {
    getFormState(state) {
      return state.formState;
    },
    getSearchWord(state) {
      return state.search;
    },
    getMembers(state) {
      return state.members;
    },
    getNotPaginatedCompanies(state) {
      return state.companies;
    },
    getMembersStatus(state) {
      return state.membersLoadingStatus;
    }
  }
});

export default store;
