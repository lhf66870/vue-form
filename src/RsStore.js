import Vue from "vue";

class RsStore {
    constructor(options) {
        this.state = options.state;
        this.mutations = options.mutations;
        this.actions = options.actions;
        // 借助vue本身得数据相应机制
        // 将来任何值有变化，都将通知依赖者改变
        this.vm = new Vue({
            data: {
                state: this.state
            }
        });
    }
    commit(type, payload) {
        const mutation = this.mutations[type];
        mutation(this.state, payload);
    }

    dispatch(type, payload) {
        const action = this.actions[type];
        // 上下文
        const ctx = {
            commit: this.commit.bind(this),
            state: this.state,
            dispatch: this.actions.dispatch.bind(this)
        }
        return action(ctx, payload)
    }
}
export default new RsStore({
    state: {
        count: 1
    },
    mutations: {
        add(state) {
            state.count++
        }
    }
})