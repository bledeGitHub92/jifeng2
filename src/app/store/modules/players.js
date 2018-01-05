export default {
    namespaced: true,
    state: {
        // 选中玩家列表
        selectedPlayers: [],
    },
    getters: {},
    mutations: {
        // 添加玩家
        addPlayer(state, player) {
            // 避免重复添加
            if (!state.selectedPlayers.includes(player)) {
                state.selectedPlayers.push(player);
            }
        },
        // 删除玩家
        removePlayer(state, player) {
            var index = state.selectedPlayers.indexOf(player);

            index > -1 && state.selectedPlayers.splice(index, 1);
        },
        // 清空玩家列表
        clearPlayer(state) {
            state.selectedPlayers = [];
        },
    },
    actions: {
        // 清空玩家列表，添加玩家
        togglePlayer({ state, commit }, player) {
            var players = state.selectedPlayers,
                isSamePlayer = players.includes(player),
                isMultiple = players.length > 1;

            isSamePlayer ? commit('removePlayer', player) : commit('addPlayer', player);
        },
    },
}