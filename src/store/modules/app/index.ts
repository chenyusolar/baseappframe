import { defineStore } from 'pinia'
interface UserInfo {
  uid: number,
  uname: string
}

export const useUserInfo = defineStore("userinfo",{
    state(){
        return {
            uid: 0,
            uname:''
        }
        },
    getters: {},
    actions: {
        setuid(uid:number) {
            this.uid = uid;
        },
        setuname(uname:string) {
            this.uname = uname;
        },
    },
    persist: {
        enabled: true,
    },
})

