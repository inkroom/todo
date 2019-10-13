
const state = {
    ready: [//待完成的任务
        {
            title: '测试标题',
            content: '',
            time: 333,//使用时间戳
        }
    ],
    compelte: [//已完成的任务

    ]
}

const mutations = {
    addTask(state, data) {
        data.id = Math.random();
        state.ready.push(data);
    },
    deleteReadyTask(state, id) {
        let index = state.ready.findIndex(v => v.id === id);
        state.ready.splice(index, 1);
    },
    compelteTask(state, id) {
        let index = state.ready.findIndex(v => v.id === id);
        state.compelte.push(state.ready[index])
        state.ready.splice(index, 1)
    }
}

const actions = {
    addTask({ commit }, data) {
        console.log('执行push')
        console.log('返回promise')
        commit('addTask', data)

        return Promise.resolve();

    },
    deleteReadyTask({ commit }, id) {
        commit('deleteReadyTask', id)
        console.log('返回promise')

        return Promise.resolve();
        // return new Promise((resolve, reject) => {
        //     commit('deleteReadyTask', index)
        //     console.log('返回promise')
        //     resolve()
        // })
    },
    compelteTask({ commit }, id) {
        commit('compelteTask', id)
        return Promise.resolve();
    }
}

export default {
    state,
    mutations,
    actions
}
